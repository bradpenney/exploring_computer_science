# How Parsers Work

You've learned about [RTNs](recursive_transition_networks.md), [BNF](backus_naur_form.md), and [Finite State Machines](finite_state_machines.md). These are all ways to *describe* languages. But how do we actually *use* these descriptions to process text? How does Python know that `print("hello")` is valid but `print("hello` isn't?

The answer is **parsing**—the process of analyzing text according to a grammar. It's how compilers understand your code, how browsers render HTML, and how your JSON config files become usable data. 🎯

## Why Is Parsing Necessary?

Computers can't directly understand text—not even simple code like `x = 2 + 3`. Here's why parsing is essential:

**The Problem: Text is ambiguous and unstructured**

When you write `2 + 3 * 4`, you know multiplication happens first. But to a computer, it's just a string: `"2 + 3 * 4"`. How does it know:

- What's an operator vs. a number?
- Which operation happens first?
- Whether the syntax is valid?
- How to represent nested structures like `f(g(x))`?

**What Happens Without Parsing?**

Imagine trying to execute code directly from text:

- `"x = 2 + 3 * 4"` - Which `+` or `*` do you do first?
- `"if (x > 5) print(x)"` - Where does the condition end and the body begin?
- `"func(a, b)"` - How do you know `func` is a function call and `a, b` are arguments?

You'd need custom logic for every possible code pattern. It's chaos.

**The Solution: Structured Representation**

Parsing transforms unstructured text into a **tree structure** that:

1. ✓ Validates syntax ("Is this valid code?")
2. ✓ Captures meaning ("What operations are being done?")
3. ✓ Shows relationships ("Which operations happen first?")
4. ✓ Enables execution ("Now I can evaluate/compile this!")

Without parsing, you can't compile, execute, or even validate code. It's the bridge between human-readable text and computer-executable instructions.

## The Big Picture

When a compiler or interpreter processes your code, it goes through three stages:

**Step 1: Lexical Analysis**
```mermaid
flowchart LR
    A[("<b>Source Code</b>")]
    B["<b>Lexer</b>"]
    C[("<b>Tokens</b>")]

    A -->|input| B
    B -->|output| C

    style A fill:#666,stroke:#333,stroke-width:2px
    style B fill:#2E5C8A,stroke:#1a3a5c,stroke-width:3px
    style C fill:#D68910,stroke:#a86d0a,stroke-width:2px
```

**Step 2: Parsing**
```mermaid
flowchart LR
    A[("<b>Tokens</b>")]
    B["<b>Parser</b>"]
    C[("<b>Parse Tree / AST</b>")]

    A -->|input| B
    B -->|output| C

    style A fill:#D68910,stroke:#a86d0a,stroke-width:2px
    style B fill:#2E5C8A,stroke:#1a3a5c,stroke-width:3px
    style C fill:#D68910,stroke:#a86d0a,stroke-width:2px
```

**Step 3: Compilation/Interpretation**
```mermaid
flowchart LR
    A[("<b>Parse Tree / AST</b>")]
    B["<b>Compiler / Interpreter</b>"]
    C[("<b>Result</b>")]

    A -->|input| B
    B -->|output| C

    style A fill:#D68910,stroke:#a86d0a,stroke-width:2px
    style B fill:#2E5C8A,stroke:#1a3a5c,stroke-width:3px
    style C fill:#D68910,stroke:#a86d0a,stroke-width:2px
```

| Stage | Input | Output | What It Does |
|:------|:------|:-------|:-------------|
| **Lexer** | Source Code | Tokens | Breaks text into meaningful chunks<br/>Example: `"x = 42"` → `[ID:x, EQUALS, NUM:42]` |
| **Parser** | Tokens | Parse Tree / AST | Builds a tree structure from tokens<br/>Example: Tokens → Tree with assignment node |
| **Compiler/Interpreter** | Parse Tree / AST | Result | Executes or compiles the tree<br/>Example: Tree → machine code or output |

!!! info "What is AST?"

    **AST** stands for **Abstract Syntax Tree** - a simplified tree structure representing the code's meaning and structure, without unnecessary syntax details. More details below!

We'll focus on the first two stages: lexing and parsing.

## Stage 1: Lexical Analysis (Lexing)

The **lexer** (or tokenizer) breaks raw text into meaningful chunks called **tokens**. It's like turning a stream of characters into a stream of words.

### What Tokens Look Like

For the expression `total = price * 2 + tax`:

| Token Type | Value |
|:-----------|:------|
| IDENTIFIER | "total" |
| EQUALS | "=" |
| IDENTIFIER | "price" |
| STAR | "*" |
| NUMBER | "2" |
| PLUS | "+" |
| IDENTIFIER | "tax" |

The lexer doesn't understand grammar—it just recognizes patterns. "Is this a number? A keyword? An operator?" That's all it asks. Simple creature, the lexer. 🔍

### Lexer Implementation

Lexers are typically implemented as [Finite State Machines](finite_state_machines.md) and use [Regular Expressions](regular_expressions.md) to define token patterns:

```mermaid
stateDiagram-v2
    direction LR
    [*] --> Start
    Start --> InNumber: digit
    InNumber --> InNumber: digit
    InNumber --> Start: whitespace [emit NUMBER]
    Start --> InIdent: letter
    InIdent --> InIdent: letter/digit
    InIdent --> Start: whitespace [emit IDENTIFIER]
    Start --> Start: whitespace [skip]
    Start --> Start: + [emit PLUS]
    Start --> Start: * [emit STAR]
    Start --> Start: = [emit EQUALS]
```

Here's a simple Python lexer:

```python title="Simple Lexer in Python" linenums="1"
import re

TOKEN_SPEC = [  # (1)!
    ('NUMBER',   r'\d+'),
    ('IDENT',    r'[a-zA-Z_][a-zA-Z0-9_]*'),
    ('PLUS',     r'\+'),
    ('MINUS',    r'-'),
    ('STAR',     r'\*'),
    ('SLASH',    r'/'),
    ('EQUALS',   r'='),
    ('LPAREN',   r'\('),
    ('RPAREN',   r'\)'),
    ('SKIP',     r'[ \t]+'),  # (2)!
]

def tokenize(text):
    tokens = []
    pos = 0  # (3)!
    while pos < len(text):
        for token_type, pattern in TOKEN_SPEC:  # (4)!
            regex = re.compile(pattern)
            match = regex.match(text, pos)  # (5)!
            if match:
                if token_type != 'SKIP':  # (6)!
                    tokens.append((token_type, match.group()))
                pos = match.end()  # (7)!
                break
        else:  # (8)!
            raise SyntaxError(f"Unknown character: {text[pos]}")
    return tokens

print(tokenize("x = 42 + y"))
```

1. Define all token types and their regex patterns as (name, pattern) tuples
2. SKIP tokens (whitespace) are recognized but not added to the output
3. Track current position in the input string
4. Try each token pattern in order until one matches
5. Try to match the pattern at the current position
6. Only add non-whitespace tokens to the result
7. Move position forward past the matched token
8. If no pattern matches, we have an invalid character

**Output:**
```python
[('IDENT', 'x'), ('EQUALS', '='), ('NUMBER', '42'),
 ('PLUS', '+'), ('IDENT', 'y')]
```

This produces a **list of tokens**, where each token is a tuple of `(TOKEN_TYPE, VALUE)`. The lexer has broken the input string into meaningful pieces that the parser can work with.

## Stage 2: Parsing

The **parser** takes tokens and builds a structured representation—usually a tree—according to the grammar rules.

### Why Trees?

A flat list of tokens doesn't capture the **structure** and **relationships** in code. Consider `2 + 3 * 4`:

- As tokens: `[NUM:2, PLUS, NUM:3, STAR, NUM:4]` - just a flat sequence
- As a tree: Shows that `3 * 4` happens first (nested deeper), then `2 +` the result

Trees naturally represent:

1. **Operator precedence**: Deeper operations execute first (`*` before `+`)
2. **Hierarchical structure**: Nested expressions, function calls, code blocks
3. **Grammar rules**: Each tree node represents a grammar rule being applied
4. **Evaluation order**: Walk the tree to know what to compute when

Without a tree, you'd need complex logic to figure out "which operation happens first?" The tree makes it obvious—start at the leaves, work up to the root.

??? tip "Connection to BNF and RTN"

    Remember [BNF](backus_naur_form.md) and [RTN](recursive_transition_networks.md) from earlier? They're grammar notations that **describe** valid syntax. The parser uses these rules to **build** the tree:

    - **Each BNF rule becomes a tree node**: When the parser applies `<expression> ::= <term> "+" <term>`, it creates an expression node with two term children
    - **RTN paths trace tree construction**: Following an RTN from start to end corresponds to building a subtree
    - **Recursion in grammar = Recursion in tree**: Nested expressions in code become nested nodes in the tree

    The grammar is the blueprint; the tree is the structure built from that blueprint. The parser is the construction worker following the plans.

### Parse Trees vs Abstract Syntax Trees

**Parse Tree (Concrete Syntax Tree):** Shows every grammar rule applied.

**Abstract Syntax Tree (AST):** Simplified tree focusing on meaning, not syntax.

For `2 + 3 * 4`:

```text title="Concrete Syntax Tree"
         Expression
              |
    +---------+---------+
    |         |         |
  Term       '+'      Term
    |                   |
  Factor        +-------+-------+
    |           |       |       |
   '2'        Term     '*'   Factor
               |                 |
            Factor              '4'
               |
              '3'
```

```text title="Abstract Syntax Tree"
        +
       / \
      2   *
         / \
        3   4
```

The AST is what most compilers actually work with.

!!! info "Why ASTs Drop Punctuation"

    Notice how the AST doesn't include parentheses, commas, or semicolons? That's intentional. Once you've parsed the code and built the tree structure, punctuation has served its purpose—it told the parser how to group things.

    **What gets dropped:**
    - Parentheses `()` - the tree structure already shows grouping
    - Commas `,` - already represented as multiple children
    - Semicolons `;` - just statement separators, not meaningful after parsing
    - Keywords like `then`, `do` - the tree node type already captures the meaning

    **What gets kept:**
    - Operators `+`, `-`, `*` - needed to know which operation to perform
    - Literals `42`, `"hello"` - the actual values
    - Identifiers `x`, `foo` - variable and function names

    The AST keeps only what's needed for execution or compilation. This makes it smaller and easier to work with than the full parse tree.

??? tip "SQL Execution Plans: A Related Concept"

    If you've worked with databases, you might recognize tree structures from SQL execution plans. They're related but different:

    **Parse Tree/AST** (what parsers build):
    - Represents the **syntactic structure** of the code
    - Shows what the query *means* grammatically
    - Created during parsing (before execution)

    **Execution Plan** (what query optimizers build):
    - Represents the **execution strategy** for running the query
    - Shows *how* to efficiently execute the query (which indexes, join order, etc.)
    - Created after parsing, during query optimization

    The full pipeline is: `SQL text → Lexer → Parser → AST → Query Optimizer → Execution Plan → Results`

    When database administrators tune queries by examining execution plans, they're looking at a tree structure that comes *after* parsing—it's the optimized plan for executing the already-parsed query. Both are trees showing hierarchical operations, but the AST captures syntax while the execution plan captures runtime strategy.

## Grammar Ambiguity

Some grammars are **ambiguous**—they allow multiple valid parse trees for the same input. This is a problem because the program's meaning becomes unclear.

### The Classic Example: Dangling Else

Consider this grammar for if-statements:

```bnf title="Ambiguous If-Statement Grammar" linenums="1"
<statement> ::= <if-statement> | <other>
<if-statement> ::= "if" <condition> "then" <statement>
                 | "if" <condition> "then" <statement> "else" <statement>
```

Now parse this code:

```
if a then if b then x else y
```

**Two valid parse trees exist:**

**Interpretation 1:** The `else` belongs to the inner `if`:
```
if a then (if b then x else y)
```

**Interpretation 2:** The `else` belongs to the outer `if`:
```
if a then (if b then x) else y
```

Both are valid according to the grammar! This is the **Dangling Else** problem.

### How Languages Solve It

Most languages resolve this through **precedence rules**:

1. **Convention**: The `else` matches the nearest unmatched `if` (Interpretation 1)
2. **Require explicit delimiters**: Python uses indentation; C uses braces `{ }`
3. **Require `end` keywords**: Pascal and Ada make all blocks explicit

### Why Ambiguity Matters for Parsing

- **Parsers must make choices**: When faced with ambiguity, the parser picks one interpretation (usually via precedence rules)
- **Different parsers might choose differently**: Without explicit rules, two implementations could parse the same code differently
- **Grammar design is crucial**: Good language design avoids ambiguity through careful grammar construction

**Key insight:** Ambiguity is a property of the **grammar**, not the parser. A well-designed grammar eliminates ambiguity before parsing begins.

## Parsing Strategies

Not all grammars are equally easy to parse, and different approaches have different trade-offs. Think of parsing strategies like different tools in a toolbox—a hammer for some jobs, a screwdriver for others.

### Choosing Your Approach

**Why Different Strategies?**

Different parsing strategies exist because:

1. **Grammar constraints**: Some grammars are ambiguous or have features (like left-recursion) that break certain parsing approaches
2. **Implementation complexity**: Hand-written parsers need simplicity; generated parsers can be more complex
3. **Error handling**: Some strategies give better error messages than others
4. **Performance**: Different strategies have different speed and memory characteristics
5. **Parsing power**: Some strategies can handle more complex grammars than others

**Which Strategy Should You Use?**

| Situation | Recommended Strategy | Why? |
|:----------|:--------------------|:-----|
| **Writing by hand** | Top-down (Recursive Descent) | Easy to understand, maps directly to grammar, good error messages |
| **Using a parser generator** | Bottom-up (LR/LALR) | More powerful, handles more grammars, tools do the hard work |
| **Simple expressions** | Top-down | Quick to implement, sufficient for most expression grammars |
| **Complex language (C, Java)** | Bottom-up (via tool) | Handles complex grammar features, proven at scale |
| **Educational purposes** | Top-down | Easier to understand and trace execution |

For most projects: start with **recursive descent** (top-down) because it's intuitive. Only reach for more powerful strategies when you hit limitations.

### Top-Down Parsing (LL)

Start with the goal (e.g., "program") and work down to terminals.

**Recursive Descent** is the most intuitive top-down approach. Each grammar rule becomes a function:

Given this grammar:
```bnf title="Expression Grammar" linenums="1"
<expression> ::= <term> { ("+" | "-") <term> }
<term> ::= <factor> { ("*" | "/") <factor> }
<factor> ::= NUMBER | "(" <expression> ")"
```

!!! warning "Left Recursion: A Top-Down Parser Killer"

    Top-down parsers **cannot handle left-recursive grammars**. A rule like this will cause infinite recursion:

    ```bnf
    <expression> ::= <expression> "+" <term>   # ❌ Left-recursive!
    ```

    **Why it breaks:** When `parse_expression()` is called, the first thing it does is call `parse_expression()` again (to match `<expression>`), which calls `parse_expression()` again, forever. The parser never consumes a token!

    **The fix:** Rewrite left recursion as iteration (loops):

    ```bnf
    # Instead of:
    <expression> ::= <expression> "+" <term>

    # Use:
    <expression> ::= <term> { "+" <term> }
    ```

    The `{ }` notation means "zero or more," which translates to a `while` loop in code. This is why our grammar above uses `{ ... }` - it avoids left recursion.

    **Bottom-up parsers** (LR) handle left recursion naturally, which is one reason they're more powerful.

Here's a recursive descent parser:

```python title="Recursive Descent Parser" linenums="1"
class Parser:
    def __init__(self, tokens):
        self.tokens = tokens  # (1)!
        self.pos = 0  # (2)!

    def current_token(self):
        if self.pos < len(self.tokens):
            return self.tokens[self.pos]
        return None

    def consume(self, expected_type=None):  # (3)!
        token = self.current_token()
        if expected_type and token[0] != expected_type:
            raise SyntaxError(f"Expected {expected_type}, got {token}")
        self.pos += 1  # (4)!
        return token

    def parse_expression(self):  # (5)!
        """expression = term { ('+' | '-') term }"""
        left = self.parse_term()  # (6)!

        while self.current_token() and self.current_token()[0] in ('PLUS', 'MINUS'):
            op = self.consume()[1]
            right = self.parse_term()
            left = ('binop', op, left, right)  # (7)!

        return left

    def parse_term(self):  # (8)!
        """term = factor { ('*' | '/') factor }"""
        left = self.parse_factor()

        while self.current_token() and self.current_token()[0] in ('STAR', 'SLASH'):
            op = self.consume()[1]
            right = self.parse_factor()
            left = ('binop', op, left, right)

        return left

    def parse_factor(self):  # (9)!
        """factor = NUMBER | '(' expression ')'"""
        token = self.current_token()

        if token[0] == 'NUMBER':
            self.consume()
            return ('number', int(token[1]))

        elif token[0] == 'LPAREN':  # (10)!
            self.consume('LPAREN')
            expr = self.parse_expression()  # (11)!
            self.consume('RPAREN')
            return expr

        else:
            raise SyntaxError(f"Unexpected token: {token}")

# Usage
tokens = tokenize("2 + 3 * 4")
parser = Parser(tokens)
ast = parser.parse_expression()
print(ast)
```

1. Store the list of tokens from the lexer
2. Track current position in the token list
3. Consume one token and optionally validate its type
4. Move to the next token after consuming
5. Handles lowest precedence operators (+ and -)
6. Start by parsing the higher-precedence term
7. Build a binary operation node combining left and right operands
8. Handles medium precedence operators (* and /)
9. Handles highest precedence: numbers and parenthesized expressions
10. Handle parenthesized sub-expressions
11. Recursively parse the expression inside parentheses

**Output:**
```python
('binop', '+', ('number', 2), ('binop', '*', ('number', 3), ('number', 4)))
```

This is a **tree structure represented as nested tuples**—our AST! Each tuple is a node:

- `('binop', '+', left, right)` = a binary operation node with operator `+`
- `('number', 2)` = a leaf node containing the value `2`
- The nesting shows the tree structure: `2 + (3 * 4)`

Compare this to the lexer's flat list of tokens—the parser has transformed that flat list into a hierarchical tree that captures the meaning and precedence.

??? tip "Notice the Structure"

    The parser functions mirror the grammar exactly:

    - `parse_expression` handles `+` and `-`
    - `parse_term` handles `*` and `/`
    - `parse_factor` handles numbers and parentheses

    This is why BNF translates so directly into code!

#### How It Handles Operator Precedence

Our grammar naturally handles precedence! Here's why:

1. `expression` handles `+` and `-`
2. `term` handles `*` and `/`
3. `factor` handles numbers and parentheses

Since `term` is nested inside `expression`, multiplication happens "deeper" in the tree—which means it's evaluated first.

For `2 + 3 * 4`:

```
     +          (evaluated last)
    / \
   2   *        (evaluated first)
      / \
     3   4
```

Result: 2 + (3 * 4) = 14 ✓

#### Adding More Precedence Levels

Want to add exponentiation (`^`) with highest precedence?

```bnf title="Grammar with Exponentiation" linenums="1"
<expression> ::= <term> { ("+" | "-") <term> }
<term> ::= <power> { ("*" | "/") <power> }
<power> ::= <factor> [ "^" <power> ]
<factor> ::= NUMBER | "(" <expression> ")"
```

Notice `<power>` calls itself on the right side—this makes `^` right-associative: `2^3^4` = `2^(3^4)`.

### Bottom-Up Parsing (LR)

Start with tokens and combine them into larger structures. More powerful but harder to write by hand. Tools like [YACC](https://en.wikipedia.org/wiki/Yacc) and [GNU Bison](https://www.gnu.org/software/bison/) generate bottom-up parsers.

### Understanding LL and LR

| Type | Reads | Builds Tree | Used By |
|:-----|:------|:------------|:--------|
| **LL(k)** | Left-to-right | Leftmost derivation (top-down) | Recursive descent, [ANTLR](https://www.antlr.org/) |
| **LR(k)** | Left-to-right | Rightmost derivation (bottom-up) | [YACC](https://en.wikipedia.org/wiki/Yacc), [GNU Bison](https://www.gnu.org/software/bison/) |

**What "Leftmost" and "Rightmost" Derivation Mean:**

These terms describe the order in which the parser builds the parse tree:

**Leftmost Derivation (LL - Top-Down):**

- Start with the goal (e.g., `<expression>`)
- Expand grammar rules from left to right, top to bottom
- Like reading: start with the big picture, fill in details left-to-right

```text
Example: 2 + 3
<expression>
  → <term> + <term>           (expand expression)
  → <number> + <term>          (expand leftmost term first)
  → 2 + <term>                 (substitute 2)
  → 2 + <number>               (expand remaining term)
  → 2 + 3                      (substitute 3)
```

**Rightmost Derivation (LR - Bottom-Up):**

- Start with the tokens (e.g., `2`, `+`, `3`)
- Combine them into larger structures, working right-to-left when choosing what to reduce
- Like building with blocks: start with pieces, assemble upward

```text
Example: 2 + 3
2 + 3
  → <number> + 3               (reduce rightmost number first)
  → <number> + <number>        (reduce left number)
  → <term> + <term>            (reduce to terms)
  → <expression>               (reduce to expression)
```

For practical purposes: **LL is top-down** (goal → tokens), **LR is bottom-up** (tokens → goal). The "leftmost/rightmost" distinction matters for formal theory but the key difference is the direction.

**Understanding Lookahead: The "(k)" Parameter**

The "(k)" means **how many tokens ahead the parser peeks** to decide which grammar rule to apply.

**LL(1) - One Token Lookahead:**

When parsing, you often need to decide between alternatives. With LL(1), you look at the **next token** to decide:

```python title="LL(1) Lookahead Example" linenums="1"
# Grammar rule with alternatives:
# <factor> ::= NUMBER | "(" <expression> ")"

def parse_factor(self):
    token = self.current_token()  # Look at next token

    if token[0] == 'NUMBER':      # Lookahead says: it's a number
        return self.parse_number()
    elif token[0] == 'LPAREN':    # Lookahead says: it's a parenthesized expr
        return self.parse_paren_expr()
```

One token is enough to decide which path to take.

**When You Need More Lookahead:**

Some grammars need LL(2) or LL(3):

```text
# Ambiguous with LL(1):
<statement> ::= "if" <expr> "then" <stmt>
              | "if" <expr> "then" <stmt> "else" <stmt>
```

After seeing `if`, both rules start the same way. You might need to look ahead 3-4 tokens to distinguish them.

**Why Lookahead Matters:**

- **LL(1)** is simplest and most efficient (what recursive descent typically uses)
- **LL(k)** for k>1 requires more complex logic
- **LR(1)** is more powerful than LL(1) - can handle more grammars with just 1 token lookahead
- More lookahead = more memory and complexity

Most hand-written parsers use LL(1) because it's simple. Parser generators can handle larger k values automatically.

## Working with Parse Trees

Once you have a parse tree or AST, you need to do something with it—evaluate it, compile it, or analyze it. This section covers common operations.

### Evaluating the AST

Once you have an AST, you can walk it to compute results:

```python title="AST Evaluator" linenums="1"
def evaluate(node):  # (1)!
    if node[0] == 'number':  # (2)!
        return node[1]

    elif node[0] == 'binop':  # (3)!
        op, left, right = node[1], node[2], node[3]  # (4)!
        left_val = evaluate(left)  # (5)!
        right_val = evaluate(right)

        if op == '+': return left_val + right_val  # (6)!
        if op == '-': return left_val - right_val
        if op == '*': return left_val * right_val
        if op == '/': return left_val / right_val

    raise ValueError(f"Unknown node type: {node[0]}")

# Using our earlier AST
ast = ('binop', '+', ('number', 2), ('binop', '*', ('number', 3), ('number', 4)))
print(evaluate(ast))  # 14
```

1. Recursively evaluate an AST node and return its computed value
2. Base case: if it's a number node, return its value
3. If it's a binary operation, evaluate both operands and apply the operator
4. Unpack the operator and operands from the tuple
5. Recursively evaluate left and right subtrees first
6. Apply the operator to the evaluated operands

This tree-walking interpreter is the simplest approach. Real interpreters might:

- Compile the AST to bytecode
- Optimize the tree before execution
- Generate machine code

### Error Handling

Good parsers give helpful error messages:

```python title="Error Handling in Parser" linenums="1"
def consume(self, expected_type):
    token = self.current_token()
    if token is None:  # (1)!
        raise SyntaxError(f"Unexpected end of input, expected {expected_type}")
    if token[0] != expected_type:  # (2)!
        raise SyntaxError(
            f"Line {self.line}, column {self.column}: "  # (3)!
            f"Expected {expected_type}, got {token[0]} ('{token[1]}')"
        )
    self.pos += 1
    return token
```

1. Check if we've run out of tokens unexpectedly
2. Validate that the token type matches what we expected
3. Provide location information (line and column) for better error messages

More sophisticated parsers can:

- **Recover** from errors and continue parsing
- **Suggest** corrections ("Did you mean...?")
- **Highlight** the exact location of the problem

## Parser Generators

Writing parsers by hand is educational, but for real projects, consider parser generators:

| Tool | Language | Grammar Style |
|:-----|:---------|:--------------|
| **[ANTLR](https://www.antlr.org/)** | Java, Python, etc. | EBNF-like |
| **[PLY](https://www.dabeaz.com/ply/)** | Python | YACC-like |
| **[Lark](https://github.com/lark-parser/lark)** | Python | EBNF |
| **[Peggy](https://peggyjs.org/)** (formerly PEG.js) | JavaScript | PEG |
| **[GNU Bison](https://www.gnu.org/software/bison/)** | C/C++ | YACC |

You write the grammar, the tool generates the parser code. ✨ Laziness is a virtue in programming.

**Example with Lark (Python):**

```python title="Parser Generator with Lark" linenums="1"
from lark import Lark

grammar = """  # (1)!
    start: expr  # (2)!
    expr: term (("+"|"-") term)*  # (3)!
    term: factor (("*"|"/") factor)*  # (4)!
    factor: NUMBER | "(" expr ")"  # (5)!
    NUMBER: /\d+/  # (6)!
    %ignore " "  # (7)!
"""

parser = Lark(grammar)  # (8)!
tree = parser.parse("2 + 3 * 4")
print(tree.pretty())
```

1. Define grammar using EBNF-like syntax as a multi-line string
2. Entry point of the grammar - must start with an expression
3. Expression handles lowest precedence: addition and subtraction
4. Term handles higher precedence: multiplication and division
5. Factor handles highest precedence: numbers and parenthesized expressions
6. Define what a NUMBER token looks like using regex
7. Ignore whitespace in the input
8. Create parser from grammar - Lark generates all parsing code automatically

## Real-World Parsing

### JSON Parser

JSON is simple enough to parse by hand:

```
value   = object | array | string | number | "true" | "false" | "null"
object  = "{" [ pair { "," pair } ] "}"
pair    = string ":" value
array   = "[" [ value { "," value } ] "]"
```

Most languages have built-in JSON parsers because it's so common.

### HTML Parser

HTML is messy—browsers handle malformed HTML gracefully. Real HTML parsers use complex error recovery:

```html title="Malformed HTML Example" linenums="1"
<p>This is <b>bold and <i>italic</b> text</i>
```

Technically invalid, but browsers render it anyway! 🤷 The web is wild.

### Programming Language Parsers

Modern language parsers are sophisticated:

- **Error recovery** for IDE features
- **Incremental parsing** for fast re-parsing on edits
- **Loose parsing** modes for incomplete code

## Practice Problems

??? question "Challenge 1: Add Unary Minus"

    Modify the expression grammar and parser to handle unary minus:

    - `-5`
    - `2 + -3`
    - `-(-4)`

    Where does the new rule go in the precedence hierarchy?

??? question "Challenge 2: Parse Variable Assignments"

    Extend the grammar to handle:

    ```
    x = 10
    y = x + 5
    ```

    You'll need to track variable names and store their values.

??? question "Challenge 3: Error Messages"

    Improve the parser to give line and column numbers in error messages.
    What information do you need to track during lexing?

## Key Takeaways

| Concept | What It Does |
|:--------|:-------------|
| **Lexer** | Breaks text into tokens |
| **Parser** | Builds tree from tokens |
| **Token** | Meaningful chunk (keyword, number, operator) |
| **AST** | Tree representing program structure |
| **Recursive Descent** | Each grammar rule = one function |
| **Precedence** | Handled by grammar structure (nesting depth) |

## Further Reading

- [Recursive Transition Networks](recursive_transition_networks.md) — Visual grammars
- [Backus-Naur Form](backus_naur_form.md) — Grammar notation
- [Finite State Machines](finite_state_machines.md) — Foundation for lexers
- [**Crafting Interpreters**](https://craftinginterpreters.com/) by Robert Nystrom — Free online book, excellent deep dive

---

Parsing bridges the gap between human-readable text and computer-manipulable structure. It's where theory meets practice—where BNF rules become working code. Once you understand parsing, you can build your own languages, transform code, and peek behind the curtain of every compiler and interpreter you use. That's real power. 🔧

## Video Summary

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/UXlUo_-aKA8" title="How Parsers Work" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
