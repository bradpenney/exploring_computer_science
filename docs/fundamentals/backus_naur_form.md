# Backus-Naur Form (BNF)

If [Recursive Transition Networks](recursive_transition_networks.md) are the *visual* way to describe a grammar, then **Backus-Naur Form** (BNF) is the *textual* equivalent. Same idea, different notation—and one that's far easier to type into a computer.

BNF has been the go-to notation for defining programming language syntax since the late 1950s. When you see a language specification or parser documentation, chances are you're looking at some flavor of BNF.

## A Brief History

BNF was developed by **John Backus** and **Peter Naur** while working on the [ALGOL 60](https://www.masswerk.at/algol60/report.htm) programming language. Backus created the initial notation; Naur refined and popularized it. The name is sometimes expanded as "Backus Normal Form," but "Backus-Naur Form" is more historically accurate (and gives Naur his due credit).

Fun fact: This was one of the first times anyone had formally specified a programming language's syntax. Before BNF, language definitions were often ambiguous prose that left implementers guessing. 🤔 Good times.

## The Bigger Picture: Formal Languages

BNF is more than just a convenient notation; it's a gateway to the field of **formal language theory**. Specifically, BNF is used to define **context-free grammars (CFGs)**.

In the 1950s, linguist **Noam Chomsky** created a hierarchy to classify the complexity of formal languages. BNF-style grammars sit at **Type 2** of the Chomsky hierarchy:

| Type | Grammar | Recognizable By | Example |
|:-----|:--------|:----------------|:--------|
| Type-0 | Unrestricted | Turing Machine | Any computable language |
| Type-1 | Context-Sensitive | Linear-bounded Automaton | `a^n b^n c^n` |
| **Type-2** | **Context-Free** | **Pushdown Automaton** | **Most programming languages** |
| Type-3 | Regular | Finite State Automaton | Regular Expressions |

**What does "context-free" mean?** It means the rules are simple. A non-terminal like `<expression>` can be replaced by its definition *regardless of what surrounds it*. There's no rule that says, "you can only expand `<expression>` this way *if* it's inside a `for` loop." This simplicity is what makes them powerful and relatively easy to parse.

Most programming language syntax is designed to be context-free, which is why BNF and its variants are the perfect tools for the job.

## The Basic Syntax

BNF uses a simple set of symbols:

| Symbol | Meaning |
|:-------|:--------|
| `::=` | "is defined as" |
| `<name>` | A non-terminal (a rule that needs further expansion) |
| `|` | "or" (alternative options) |
| Plain text | Terminals (literal characters or tokens) |

Let's see it in action.

## Example 1: Greetings (RTN vs BNF)

Remember our [greeting RTN](recursive_transition_networks.md#a-simple-example-greetings)? Here's the same grammar in BNF:

```bnf title="Greeting Grammar in BNF" linenums="1"
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

An unsigned integer is one or more digits (see the [RTN version](recursive_transition_networks.md#recognizing-unsigned-integers)). In BNF:

```bnf title="Unsigned Integer Grammar in BNF" linenums="1"
<unsigned-integer> ::= <digit> | <digit> <unsigned-integer>
<digit> ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
```

**What's happening here:**

- An `<unsigned-integer>` is either a single `<digit>`, OR a `<digit>` followed by another `<unsigned-integer>`
- That self-reference is the recursion—it lets us match "7", "42", "1337", or any sequence of digits

This is the textual equivalent of the loop we drew in the RTN diagram.

## Example 3: Arithmetic Expressions

Here's where BNF really shines. Remember those [three interconnected RTNs for arithmetic](recursive_transition_networks.md#expression-rtn)? Three separate diagrams, jumping between them to understand the relationships. In BNF, the entire grammar fits on your screen at once:

```bnf title="Arithmetic Expression Grammar in BNF" linenums="1"
<expression> ::= <term> | <expression> + <term> | <expression> - <term>
<term> ::= <factor> | <term> * <factor> | <term> / <factor>
<factor> ::= <number> | ( <expression> )
<number> ::= <digit> | <digit> <number>
<digit> ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
```

Five lines of text. Everything visible simultaneously. The recursive relationships are explicit: `<expression>` calls `<term>`, `<term>` calls `<factor>`, and `<factor>` can call back to `<expression>`. This is the inflection point—for simple grammars, RTNs offer intuitive visual clarity; for complex grammars, BNF becomes far more practical and readable.

Let's trace how a parser using this grammar would evaluate `3 + 4 * 2`. This is a "bottom-up" view of the parse tree being built.

1. **Start with `<expression>`:** The parser wants to find an expression.
2. **Call `parse_expression()`:**
    - It must first find a `<term>`. It calls `parse_term()`.
    - `parse_term()` must find a `<factor>`. It calls `parse_factor()`.
    - `parse_factor()` finds the `<number>` `3`. This is our first result.
    - `parse_term()` gets `3` back. It looks ahead and sees a `+`. Since `+` is not `*` or `/`, the `parse_term()` function returns `3`.
    - `parse_expression()` gets `3` back. It sees the `+` token, consumes it, and now needs to parse another `<term>`. It calls `parse_term()` again.
3. **Second Call to `parse_term()`:**
    - It must find a `<factor>`. It calls `parse_factor()`.
    - `parse_factor()` finds the `<number>` `4`.
    - `parse_term()` gets `4` back. It looks ahead and sees a `*`.
    - Aha! The `*` is part of the `<term>` rule. The parser consumes the `*` and calls `parse_factor()` again to get the operand on the right.
    - `parse_factor()` finds the `<number>` `2`.
    - The `parse_term()` function now has everything it needs to compute `4 * 2`, resulting in `8`.
    - `parse_term()` returns `8`.
4. **Back in `parse_expression()`:**
    - It previously had the left-hand side (`3`) and the operator (`+`). It now receives the right-hand side (`8`).
    - It can now compute `3 + 8`, resulting in `11`.

The parse is complete. Notice how the grammar forced the parser to evaluate `4 * 2` before the addition. That's operator precedence in action.

??? tip "Operator Precedence is Built In"

    Notice how `*` and `/` are in the `<term>` rule, while `+` and `-` are in `<expression>`?
    Since an `<expression>` must first call down to a `<term>`, the grammar forces the parser to go "deeper" to find multiplications and divisions. As the parser returns from these deeper recursive calls, it evaluates the higher-precedence operators first. The grammar's structure *is* the operator precedence.

## Extended BNF (EBNF)

Classic BNF can get verbose. **Extended BNF** adds some conveniences borrowed from regular expressions:

| EBNF Syntax | Meaning | Example |
|:------------|:--------|:--------|
| `{ x }` | Zero or more of x | `{ digit }` = any number of digits |
| `[ x ]` | Optional (zero or one) | `[ - ]` = optional minus sign |
| `( x | y )` | Grouping | `( + | - )` = plus or minus |

### Unsigned Integer in EBNF

```ebnf title="Unsigned Integer in EBNF" linenums="1"
unsigned-integer = digit { digit }
digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
```

Much cleaner! The `digit { digit }` is a common and important idiom: it means "one digit, followed by zero or more additional digits." This ensures an integer has at least one digit.

### Signed Integer in EBNF

```ebnf title="Signed Integer in EBNF" linenums="1"
signed-integer = [ "-" ] digit { digit }
```

The `[ "-" ]` means the minus sign is optional. Simple.

### Arithmetic Expressions in EBNF

```ebnf title="Arithmetic Expressions in EBNF" linenums="1"
expression = term { ( "+" | "-" ) term }
term = factor { ( "*" | "/" ) factor }
factor = number | "(" expression ")"
number = digit { digit }
digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
```

This is arguably more readable than the recursive BNF version—the repetition is explicit rather than implied through self-reference.

## Real-World BNF: A Taste of Python

Here's a simplified snippet from Python's actual grammar (which uses a variant of EBNF):

```ebnf title="Python Control Flow Grammar (Simplified)" linenums="1"
if_stmt = "if" expression ":" suite
          { "elif" expression ":" suite }
          [ "else" ":" suite ]

while_stmt = "while" expression ":" suite [ "else" ":" suite ]

for_stmt = "for" target_list "in" expression_list ":" suite
           [ "else" ":" suite ]
```

(Where `suite` is an indented block of code, `expression` is our familiar rule, and `target_list` and `expression_list` are comma-separated lists of variables and values, respectively.)

You can read this almost like English:

- An `if_stmt` is the keyword "if", followed by an expression, a colon, a suite (block of code), optionally followed by any number of "elif" clauses, optionally followed by an "else" clause
- Python's `else` on loops? Right there in the grammar!

??? tip "Finding Language Grammars"

    Most programming languages publish their formal grammar:

    - [Python Grammar](https://docs.python.org/3/reference/grammar.html)
    - [JSON Grammar](https://www.json.org/json-en.html) (beautifully simple 💖)
    - [SQL Grammar](https://jakewheat.github.io/sql-overview/sql-2016-foundation-grammar.html) (terrifyingly complex 😱)

    Reading these is a great way to deeply understand a language's syntax.

## From BNF to Code

One of BNF's superpowers is that it translates almost directly into parser code. Each rule becomes a function:

```python title="Recursive Descent Parser from BNF" linenums="1"
def parse_expression():  # (1)!
    """<expression> ::= <term> { ('+' | '-') <term> }"""
    result = parse_term()  # (2)!
    while current_token() in ['+', '-']:  # (3)!
        operator = consume_token()
        right = parse_term()
        result = BinaryOp(result, operator, right)  # (4)!
    return result

def parse_term():  # (5)!
    """<term> ::= <factor> { ('*' | '/') <factor> }"""
    result = parse_factor()
    while current_token() in ['*', '/']:
        operator = consume_token()
        right = parse_factor()
        result = BinaryOp(result, operator, right)
    return result

def parse_factor():  # (6)!
    """<factor> ::= <number> | '(' <expression> ')'"""
    if current_token() == '(':
        consume_token()  # eat '('
        result = parse_expression()  # (7)!
        consume_token()  # eat ')'
        return result
    else:
        return parse_number()
```

1. Each BNF rule becomes a function - this one handles expressions (lowest precedence)
2. Start by parsing the higher-precedence term
3. Handle zero or more addition/subtraction operations
4. Build AST node combining left operand, operator, and right operand
5. Handles medium precedence operations (multiplication and division)
6. Handles highest precedence: numbers and parenthesized expressions
7. Recursively parse expressions inside parentheses - shows how BNF recursion becomes function recursion

This technique is called **recursive descent parsing**, and it's one of the most intuitive ways to build a parser. The grammar *is* the code structure. For a deeper dive into parsing strategies and implementation, see [How Parsers Work](how_parsers_work.md).

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

??? question "Practice Problem 1: Write BNF for Email Addresses"

    Define a grammar for simple email addresses like `user@domain.com`.

    Hint: You'll need rules for the local part (before @), domain, and top-level domain.

??? question "Practice Problem 2: Convert This RTN to BNF"

    Remember the natural language Sentence RTN? Convert the Noun Phrase portion to BNF:

    - A noun phrase has an optional article, zero or more adjectives, and a noun

    ```bnf
    <noun-phrase> ::= ???
    ```

??? question "Practice Problem 3: Add Exponentiation"

    Extend the arithmetic expression grammar to support `^` for exponentiation.
    Remember: exponentiation has higher precedence than multiplication and is right-associative
    (\(2^{3^4} = 2^{(3^4)}\), not \((2^3)^4\)).

    Where does the new rule go?

## Key Takeaways

| Concept | What It Means |
|:--------|:--------------|
| **Terminal** | Literal text that appears in the language |
| **Non-terminal** | A rule name in angle brackets `<like-this>` |
| **Production** | A rule defining what a non-terminal expands to |
| **`::=`** | "is defined as" |
| **`|`** | "or" (alternatives) |
| **EBNF** | Extended BNF with `{ }`, `[ ]` for repetition and optionality |
| **Recursive descent** | Parsing technique where grammar rules become functions |

## Further Reading

**Related Articles:**

- [Recursive Transition Networks](recursive_transition_networks.md) — The visual equivalent

**Books and Tutorials:**

- **[David Evans, Introduction to Computing](https://computingbook.org/)** — Chapter 2 for more on language and grammars
- **[Crafting Interpreters](https://craftinginterpreters.com/parsing-expressions.html)** by Bob Nystrom — Excellent free online book with hands-on parsing chapters

**Tools and Documentation:**

- **[ANTLR](https://www.antlr.org/)** — Powerful parser generator with excellent documentation
- [Python Grammar](https://docs.python.org/3/reference/grammar.html) — Python's complete formal grammar
- [JSON Grammar](https://www.json.org/json-en.html) — Beautifully simple example

**Historical and Reference:**

- **[ALGOL 60 Report](https://www.masswerk.at/algol60/report.htm)** — The original 1960 report where BNF was formalized

---

BNF takes the visual intuition of RTNs and packages it into a format that's easy to write, share, and—most importantly—turn into working parsers. It's been describing programming languages for over 60 years, and it's not going anywhere. Once you can read BNF, you can read the source code of language design itself. 🎯

## Video Summary

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/siCKbYi4vhg" title="Backus-Naur Form (BNF) Notation" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
