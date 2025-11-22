# Backus-Naur Form (BNF)

If [Recursive Transition Networks](recursive_transition_networks.md) are the *visual* way to describe a grammar, then **Backus-Naur Form** (BNF) is the *textual* equivalent. Same idea, different notation—and one that's far easier to type into a computer.

BNF has been the go-to notation for defining programming language syntax since the late 1950s. When you see a language specification or parser documentation, chances are you're looking at some flavor of BNF.

## A Brief History

BNF was developed by **John Backus** and **Peter Naur** while working on the ALGOL 60 programming language. Backus created the initial notation; Naur refined and popularized it. The name is sometimes expanded as "Backus Normal Form," but "Backus-Naur Form" is more historically accurate (and gives Naur his due credit).

Fun fact: This was one of the first times anyone had formally specified a programming language's syntax. Before BNF, language definitions were often ambiguous prose that left implementers guessing.

## The Basic Syntax

BNF uses a simple set of symbols:

| Symbol | Meaning |
|:-------|:--------|
| `::=` | "is defined as" |
| `<name>` | A non-terminal (a rule that needs further expansion) |
| `\|` | "or" (alternative options) |
| Plain text | Terminals (literal characters or tokens) |

Let's see it in action.

## Example 1: Greetings (RTN vs BNF)

Remember our greeting RTN? Here's the same grammar in BNF:

```bnf
<greeting> ::= <salutation> | <salutation> <modifier>
<salutation> ::= Hello | Hi
<modifier> ::= there | friend | there friend
```

**Reading this:**

- A `<greeting>` is either just a `<salutation>`, OR a `<salutation>` followed by a `<modifier>`
- A `<salutation>` is either "Hello" or "Hi"
- A `<modifier>` is "there", "friend", or "there friend"

This generates all the same strings as our RTN: "Hello", "Hi", "Hello there", "Hi friend", "Hello there friend", etc.

??? tip "Comparing Notations"

    | RTN | BNF |
    |:----|:----|
    | Nodes and edges | Rules and alternatives |
    | Visual, good for understanding | Textual, good for implementation |
    | Can be unwieldy for complex grammars | Scales well, easy to edit |
    | Traces paths through a graph | Expands rules recursively |

## Example 2: Unsigned Integers

An unsigned integer is one or more digits. In BNF:

```bnf
<unsigned-integer> ::= <digit> | <digit> <unsigned-integer>
<digit> ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
```

**What's happening here:**

- An `<unsigned-integer>` is either a single `<digit>`, OR a `<digit>` followed by another `<unsigned-integer>`
- That self-reference is the recursion—it lets us match "7", "42", "1337", or any sequence of digits

This is the textual equivalent of the loop we drew in the RTN diagram.

## Example 3: Arithmetic Expressions

Here's where BNF really shines. Remember those three interconnected RTNs for arithmetic? In BNF:

```bnf
<expression> ::= <term> | <expression> + <term> | <expression> - <term>
<term> ::= <factor> | <term> * <factor> | <term> / <factor>
<factor> ::= <number> | ( <expression> )
<number> ::= <digit> | <digit> <number>
<digit> ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
```

Five lines of text capture the entire grammar! Let's trace through parsing `3 + 4 * 2`:

1. Start with `<expression>`
2. Try `<expression> + <term>` — looks promising!
3. The left `<expression>` becomes `<term>` → `<factor>` → `<number>` → `3`
4. The right `<term>` becomes `<term> * <factor>`
5. That `<term>` becomes `<factor>` → `<number>` → `4`
6. That `<factor>` becomes `<number>` → `2`

??? note "Operator Precedence is Built In"

    Notice how `*` and `/` are in the `<term>` rule, while `+` and `-` are in `<expression>`?
    Since `<expression>` is defined in terms of `<term>`, multiplication and division are
    evaluated first (they're "deeper" in the parse tree). The grammar structure naturally
    encodes operator precedence!

## Extended BNF (EBNF)

Classic BNF can get verbose. **Extended BNF** adds some conveniences borrowed from regular expressions:

| EBNF Syntax | Meaning | Example |
|:------------|:--------|:--------|
| `{ x }` | Zero or more of x | `{ digit }` = any number of digits |
| `[ x ]` | Optional (zero or one) | `[ - ]` = optional minus sign |
| `( x \| y )` | Grouping | `( + \| - )` = plus or minus |

### Unsigned Integer in EBNF

```ebnf
unsigned-integer = digit { digit }
digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
```

Much cleaner! The `{ digit }` means "zero or more additional digits."

### Signed Integer in EBNF

```ebnf
signed-integer = [ "-" ] digit { digit }
```

The `[ "-" ]` means the minus sign is optional. Simple.

### Arithmetic Expressions in EBNF

```ebnf
expression = term { ( "+" | "-" ) term }
term = factor { ( "*" | "/" ) factor }
factor = number | "(" expression ")"
number = digit { digit }
digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
```

This is arguably more readable than the recursive BNF version—the repetition is explicit rather than implied through self-reference.

## Real-World BNF: A Taste of Python

Here's a simplified snippet from Python's actual grammar (which uses a variant of EBNF):

```ebnf
if_stmt = "if" expression ":" suite
          { "elif" expression ":" suite }
          [ "else" ":" suite ]

while_stmt = "while" expression ":" suite [ "else" ":" suite ]

for_stmt = "for" target_list "in" expression_list ":" suite
           [ "else" ":" suite ]
```

You can read this almost like English:

- An `if_stmt` is the keyword "if", followed by an expression, a colon, a suite (block of code), optionally followed by any number of "elif" clauses, optionally followed by an "else" clause
- Python's `else` on loops? Right there in the grammar!

??? tip "Finding Language Grammars"

    Most programming languages publish their formal grammar:

    - [Python Grammar](https://docs.python.org/3/reference/grammar.html)
    - [JSON Grammar](https://www.json.org/json-en.html) (beautifully simple)
    - [SQL Grammar](https://jakewheat.github.io/sql-overview/sql-2016-foundation-grammar.html) (terrifyingly complex)

    Reading these is a great way to deeply understand a language's syntax.

## From BNF to Code

One of BNF's superpowers is that it translates almost directly into parser code. Each rule becomes a function:

```python
def parse_expression():
    """<expression> ::= <term> { ('+' | '-') <term> }"""
    result = parse_term()
    while current_token() in ['+', '-']:
        operator = consume_token()
        right = parse_term()
        result = BinaryOp(result, operator, right)
    return result

def parse_term():
    """<term> ::= <factor> { ('*' | '/') <factor> }"""
    result = parse_factor()
    while current_token() in ['*', '/']:
        operator = consume_token()
        right = parse_factor()
        result = BinaryOp(result, operator, right)
    return result

def parse_factor():
    """<factor> ::= <number> | '(' <expression> ')'"""
    if current_token() == '(':
        consume_token()  # eat '('
        result = parse_expression()
        consume_token()  # eat ')'
        return result
    else:
        return parse_number()
```

This technique is called **recursive descent parsing**, and it's one of the most intuitive ways to build a parser. The grammar *is* the code structure.

## BNF Variants You'll Encounter

Different tools and specifications use slightly different BNF flavors:

| Variant | Used By | Notable Differences |
|:--------|:--------|:--------------------|
| **BNF** | Academic papers, older specs | `::=`, `<angle brackets>` |
| **EBNF** | ISO standards, formal specs | Adds `{ }`, `[ ]`, `( )` |
| **ABNF** | Internet RFCs (HTTP, SMTP, etc.) | Uses `=`, prose descriptions |
| **PEG** | Modern parser generators | Ordered choice, no ambiguity |
| **ANTLR** | ANTLR parser generator | Rich syntax, semantic actions |

Don't worry too much about the differences—once you understand one, the others are easy to pick up.

## Key Differences: RTN vs BNF

| Aspect | RTN | BNF |
|:-------|:----|:----|
| **Format** | Visual (graphs) | Textual (rules) |
| **Best for** | Learning, understanding | Implementation, documentation |
| **Recursion** | Call other networks | Rules reference other rules |
| **Tooling** | Draw by hand or diagramming tools | Text editors, parser generators |
| **Ambiguity** | Harder to spot | Easier to analyze |

Both describe the same thing—valid strings in a language. Choose based on your audience and purpose.

## Practice Problems

??? question "Challenge 1: Write BNF for Email Addresses"

    Define a grammar for simple email addresses like `user@domain.com`.

    Hint: You'll need rules for the local part (before @), domain, and top-level domain.

??? question "Challenge 2: Convert This RTN to BNF"

    Remember the natural language Sentence RTN? Convert the Noun Phrase portion to BNF:

    - A noun phrase has an optional article, zero or more adjectives, and a noun

    ```bnf
    <noun-phrase> ::= ???
    ```

??? question "Challenge 3: Add Exponentiation"

    Extend the arithmetic expression grammar to support `^` for exponentiation.
    Remember: exponentiation has higher precedence than multiplication and is right-associative
    (`2^3^4` = `2^(3^4)`, not `(2^3)^4`).

    Where does the new rule go?

## Key Takeaways

| Concept | What It Means |
|:--------|:--------------|
| **Terminal** | Literal text that appears in the language |
| **Non-terminal** | A rule name in angle brackets `<like-this>` |
| **Production** | A rule defining what a non-terminal expands to |
| **`::=`** | "is defined as" |
| **`\|`** | "or" (alternatives) |
| **EBNF** | Extended BNF with `{ }`, `[ ]` for repetition and optionality |
| **Recursive descent** | Parsing technique where grammar rules become functions |

## Further Reading

- [Recursive Transition Networks](recursive_transition_networks.md) — The visual equivalent
- **David Evans, Introduction to Computing** — Chapter 2 for more on language and grammars
- [BNF and EBNF on Wikipedia](https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form) — Deep dive into history and variants

---

BNF takes the visual intuition of RTNs and packages it into a format that's easy to write, share, and—most importantly—turn into working parsers. It's been describing programming languages for over 60 years, and it's not going anywhere. Once you can read BNF, you can read the source code of language design itself. 🎯
