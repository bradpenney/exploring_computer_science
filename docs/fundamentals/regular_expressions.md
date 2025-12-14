# Regular Expressions

You've seen [Finite State Machines](finite_state_machines.md)—elegant diagrams showing states and transitions. You've seen [BNF](backus_naur_form.md)—formal grammar notation. But when you need to actually *use* pattern matching in your code, you reach for **regular expressions** (regex).

Regex is the practical face of formal language theory. It's the same mathematical power as FSMs, wrapped in a terse syntax that fits in a single line. Love them or hate them (often both), regular expressions are an essential tool.

## What is a Regular Expression?

A regular expression is a pattern that describes a set of strings. Instead of listing every valid string, you describe the *rules* for what makes a string valid.

```
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

That monstrosity? It matches email addresses. 😅 Let's learn to read (and write) these things.

## Basic Building Blocks

### Literal Characters

Most characters match themselves:

| Pattern | Matches |
|:--------|:--------|
| `cat` | "cat" |
| `hello` | "hello" |
| `123` | "123" |

### Metacharacters

Some characters have special meaning:

| Character | Meaning | Example | Matches |
|:----------|:--------|:--------|:--------|
| `.` | Any single character | `c.t` | "cat", "cot", "c9t" |
| `^` | Start of string | `^hello` | "hello world" (at start) |
| `$` | End of string | `world$` | "hello world" (at end) |
| `\` | Escape special char | `\.` | literal "." |

### Character Classes

Match one character from a set:

| Pattern | Meaning | Matches |
|:--------|:--------|:--------|
| `[aeiou]` | Any vowel | "a", "e", "i", "o", "u" |
| `[0-9]` | Any digit | "0" through "9" |
| `[a-zA-Z]` | Any letter | "a"-"z", "A"-"Z" |
| `[^0-9]` | NOT a digit | anything except "0"-"9" |

### Shorthand Classes

Common patterns have shortcuts:

| Shorthand | Equivalent | Meaning |
|:----------|:-----------|:--------|
| `\d` | `[0-9]` | Digit |
| `\D` | `[^0-9]` | Not a digit |
| `\w` | `[a-zA-Z0-9_]` | Word character |
| `\W` | `[^a-zA-Z0-9_]` | Not a word character |
| `\s` | `[ \t\n\r]` | Whitespace |
| `\S` | `[^ \t\n\r]` | Not whitespace |

## Quantifiers: How Many?

Quantifiers specify repetition:

| Quantifier | Meaning | Example | Matches |
|:-----------|:--------|:--------|:--------|
| `*` | Zero or more | `ab*c` | "ac", "abc", "abbc", "abbbc"... |
| `+` | One or more | `ab+c` | "abc", "abbc", "abbbc"... (not "ac") |
| `?` | Zero or one | `colou?r` | "color", "colour" |
| `{n}` | Exactly n | `a{3}` | "aaa" |
| `{n,}` | n or more | `a{2,}` | "aa", "aaa", "aaaa"... |
| `{n,m}` | Between n and m | `a{2,4}` | "aa", "aaa", "aaaa" |

### Greedy vs Lazy

By default, quantifiers are *greedy*—they match as much as possible.

```
Pattern: <.*>
String:  <div>hello</div>
Match:   <div>hello</div>  (the whole thing!)
```

Add `?` for *lazy* matching—match as little as possible:

```
Pattern: <.*?>
String:  <div>hello</div>
Match:   <div>  (just the first tag)
```

## Grouping and Alternatives

### Groups: `( )`

Parentheses group patterns together:

```
(ab)+     # One or more "ab": "ab", "abab", "ababab"
(cat|dog) # "cat" or "dog"
```

### Capturing Groups

Groups also *capture* what they match for later use:

```python title="Capturing Groups in Python" linenums="1"
import re

match = re.search(r'(\d{3})-(\d{4})', 'Call 555-1234')
print(match.group(1))  # "555"
print(match.group(2))  # "1234"
```

### Non-Capturing Groups: `(?: )`

When you need grouping but don't need to capture:

```
(?:ab)+   # Groups without capturing
```

### Backreferences

Refer to earlier captured groups:

```
(\w+)\s+\1   # Matches repeated words: "the the", "is is"
```

The `\1` means "whatever group 1 matched."

## Anchors and Boundaries

| Anchor | Meaning |
|:-------|:--------|
| `^` | Start of string (or line with multiline flag) |
| `$` | End of string (or line with multiline flag) |
| `\b` | Word boundary |
| `\B` | Not a word boundary |

**Word boundaries** are incredibly useful:

```
Pattern: \bcat\b
Matches: "the cat sat" ✓
Doesn't match: "category" ✗, "bobcat" ✗
```

## Lookahead and Lookbehind

These match a position without consuming characters:

| Syntax | Name | Meaning |
|:-------|:-----|:--------|
| `(?=...)` | Positive lookahead | Followed by ... |
| `(?!...)` | Negative lookahead | NOT followed by ... |
| `(?<=...)` | Positive lookbehind | Preceded by ... |
| `(?<!...)` | Negative lookbehind | NOT preceded by ... |

**Example: Password Validation**

Password must have a digit and a letter:

```
^(?=.*\d)(?=.*[a-zA-Z]).{8,}$
```

Breaking it down:

- `^` — start
- `(?=.*\d)` — somewhere ahead, there's a digit
- `(?=.*[a-zA-Z])` — somewhere ahead, there's a letter
- `.{8,}` — at least 8 characters total
- `$` — end

## Practical Examples

### Email Address (Simplified)

```
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

| Part | Meaning |
|:-----|:--------|
| `^` | Start |
| `[a-zA-Z0-9._%+-]+` | Local part (one or more valid chars) |
| `@` | Literal @ |
| `[a-zA-Z0-9.-]+` | Domain name |
| `\.` | Literal dot |
| `[a-zA-Z]{2,}` | TLD (at least 2 letters) |
| `$` | End |

??? warning "Email Validation Reality"

    This regex is a simplification. The actual email spec (RFC 5322) is absurdly complex. 🤯
    In practice, just check for `@` and send a confirmation email.

### Phone Numbers

US phone number with optional formatting:

```
^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$
```

Matches:

- `5551234567`
- `555-123-4567`
- `(555) 123-4567`
- `555.123.4567`

### IP Address (IPv4)

```
^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$
```

??? note "This Isn't Perfect"

    This matches `999.999.999.999`, which isn't a valid IP.
    For true validation, you'd need `(?:25[0-5]|2[0-4]\d|[01]?\d\d?)` for each octet,
    or just parse the numbers and check in code.

### Log Parsing

Extract timestamp and message from log lines:

```
^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] \[(\w+)\] (.*)$
```

For: `[2024-03-15 14:30:45] [ERROR] Something went wrong`

- Group 1: `2024-03-15 14:30:45`
- Group 2: `ERROR`
- Group 3: `Something went wrong`

## Regex in Different Languages

Most languages use similar syntax, with minor variations:

### Python

```python title="Regular Expressions in Python" linenums="1"
import re

# Search for pattern
match = re.search(r'\d+', 'Order 12345')
print(match.group())  # "12345"

# Find all matches
matches = re.findall(r'\d+', 'Items: 5, 10, 15')
print(matches)  # ['5', '10', '15']

# Replace
result = re.sub(r'\d+', 'X', 'Order 123')
print(result)  # "Order X"
```

### JavaScript

```javascript title="Regular Expressions in JavaScript" linenums="1"
// Test if pattern matches
/\d+/.test('Order 12345')  // true

// Find match
'Order 12345'.match(/\d+/)  // ['12345']

// Replace
'Order 123'.replace(/\d+/, 'X')  // "Order X"
```

### Command Line (grep)

```bash title="Regular Expressions in grep" linenums="1"
# Find lines containing "error"
grep -E 'error' logfile.txt

# Find lines starting with a date
grep -E '^[0-9]{4}-[0-9]{2}-[0-9]{2}' logfile.txt
```

## The Connection to Theory

Remember how we said FSMs and regular expressions describe the same languages? Here's the connection:

| Regex | FSM Equivalent |
|:------|:---------------|
| `ab` | Sequence of states |
| `a\|b` | Branch (two paths from same state) |
| `a*` | Loop back to same state |
| `a+` | Transition + loop |
| `a?` | Optional path (epsilon transition) |

Every regex can be converted to an NFA, then to a DFA, then executed efficiently. That's what regex engines do under the hood.

```mermaid
stateDiagram-v2
    direction LR
    note left of S0: Regex: ab*c
    [*] --> S0
    S0 --> S1: a
    S1 --> S1: b
    S1 --> S2: c
    S2 --> [*]
```

This FSM is equivalent to the regex `ab*c`.

## Common Pitfalls

### Catastrophic Backtracking

Some patterns cause exponential backtracking:

```
(a+)+b
```

Against a string like `aaaaaaaaaaaaaaaaac`, the engine tries every possible way to divide the a's among the groups—and there are exponentially many. This can freeze your program. ❄️ Not fun.

**Solution:** Avoid nested quantifiers, or use atomic groups/possessive quantifiers if your engine supports them.

### Forgetting Anchors

```
\d{3}-\d{4}
```

This matches "555-1234" inside "call 555-1234 now". If you want exact matches, use anchors:

```
^\d{3}-\d{4}$
```

### Escaping Special Characters

To match literal special characters, escape them:

```
\.\*\+\?\[\]\(\)\{\}\^\$\|\\
```

Or use a character class where most specials are literal:

```
[.*+?]  # Matches literal ., *, +, or ?
```

## Practice Problems

??? question "Challenge 1: URL Validation"

    Write a regex that matches HTTP/HTTPS URLs like:

    - `https://example.com`
    - `http://sub.domain.org/path`
    - `https://site.io/page?id=123`

??? question "Challenge 2: Date Formats"

    Match dates in YYYY-MM-DD format where:

    - Year is 4 digits
    - Month is 01-12
    - Day is 01-31

    Bonus: Can you ensure month doesn't exceed 12?

??? question "Challenge 3: Find Duplicates"

    Write a regex that finds repeated consecutive words in text, like "the the" or "is is".

    Hint: Use backreferences.

## Key Takeaways

| Concept | Syntax | Example |
|:--------|:-------|:--------|
| Any character | `.` | `a.c` matches "abc", "a1c" |
| Character class | `[...]` | `[aeiou]` matches vowels |
| Negated class | `[^...]` | `[^0-9]` matches non-digits |
| Zero or more | `*` | `a*` matches "", "a", "aaa" |
| One or more | `+` | `a+` matches "a", "aaa" |
| Optional | `?` | `colou?r` matches both spellings |
| Alternation | `\|` | `cat\|dog` matches either |
| Group | `(...)` | `(ab)+` matches "ab", "abab" |
| Word boundary | `\b` | `\bword\b` matches whole word |

## Further Reading

- [Finite State Machines](finite_state_machines.md) — The theory behind regex
- [Regular Expressions 101](https://regex101.com/) — Interactive regex tester
- [Backus-Naur Form](backus_naur_form.md) — When regex isn't powerful enough

---

Regular expressions are a superpower with a steep learning curve. They look like line noise until suddenly they don't—and then you'll find yourself reaching for them constantly. The trick is to build them up piece by piece, test frequently, and resist the urge to write everything in one inscrutable line. Your future self will thank you. 🎯
