---
title: "Regular Expressions: The Complete Syntax Reference"
description: The complete practical reference for writing and reading regex in production code — character classes, quantifiers, groups, flags, and common pitfalls.
---
# Regular Expressions

You've copied regex from Stack Overflow. You've pasted `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` into a validator without reading it. You've used IDE find-and-replace in regex mode and wondered why `.` suddenly matches everything.

**This is the reference that makes those patterns readable.**

Regular expressions are a pattern language for matching, extracting, and transforming text. Every working engineer uses them; few have a complete mental model. This article closes that gap.

!!! info "Learning Objectives"

    By the end of this article, you'll be able to:

    - Read and write regex patterns using literals, metacharacters, quantifiers, and groups
    - Use capturing groups and backreferences to extract and transform text
    - Apply flags to modify matching behavior across Python, JavaScript, Go, and other languages
    - Recognize the common pitfalls: catastrophic backtracking, missing anchors, and escaped characters
    - Know when regex is the right tool and when to reach for a parser instead

## Where You've Seen This

Regex appears throughout a working engineer's day:

- **`grep` and command-line tools** — `grep -E 'ERROR|FATAL' app.log` is regex pattern matching
- **IDE find-and-replace** — VS Code and IntelliJ's regex mode uses this exact syntax
- **Input validation** — email, phone, zip code validators in every web form
- **Log parsing** — extracting timestamps, log levels, and messages from structured log output
- **URL routing** — Rails, Django, and Express route patterns use regex under the hood
- **`sed`, `awk`, `perl -pe`** — every time you've transformed text on the command line
- **Database queries** — `WHERE column REGEXP 'pattern'` in MySQL; `~` in PostgreSQL

## Why This Matters for Production Code

=== ":material-magnify: Log Analysis"

    Every production incident starts with log parsing. The pattern `grep -E '\[ERROR\].*request_id=abc123' app.log` replaces 50 lines of string splitting and loop logic. Log shipping pipelines like Logstash and Fluentd use regex-based pattern matching to extract structured fields from unstructured log lines.

=== ":material-shield-check: Input Validation"

    Email addresses, phone numbers, passwords, credit cards — every input your API accepts needs format validation. Regex encodes complex rules declaratively: `^(?=.*\d)(?=.*[a-zA-Z]).{8,}$` is a complete password policy in one pattern.

    Use regex for *format* validation (does this look like an email?), not *semantic* validation (is this email address real?). Send a confirmation email for that.

=== ":material-transfer: Data Transformation"

    ETL pipelines, data migrations, and API normalization involve transforming text. Capturing groups extract structured data from unstructured input — timestamps from log entries, reformatted phone numbers, normalized addresses from multiple source formats.

=== ":material-alert: ReDoS Vulnerabilities"

    Patterns with nested quantifiers like `(a+)+` can trigger catastrophic backtracking — exponential runtime against adversarial input. This caused real outages at Cloudflare, Stack Overflow, and others.

    The practical fix: avoid nested quantifiers. For the theory of *why* this happens — how regex engines compile to automata and where the explosion comes from — see [Regular Expressions: The Formal Model](../efficiency/regular_expressions.md).

## What is a Regular Expression?

A regular expression is a pattern that describes a set of strings. Instead of listing every valid string, you describe the *rules* for what makes a string valid.

``` title="Email Address Pattern" linenums="1"
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

That monstrosity matches email addresses. Let's learn to read (and write) these things.

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
| `[a-zA-Z]` | Any letter | "a"–"z", "A"–"Z" |
| `[^0-9]` | NOT a digit | anything except "0"–"9" |

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

??? warning "Unicode and `\w`"

    By default in many engines, `\w` matches only ASCII (a-z, A-Z, 0-9, _). It won't match accented letters ("é", "ñ"), non-Latin alphabets, or emoji.

    - **JavaScript**: Use the `u` flag: `/\w+/u`
    - **Python**: `re.UNICODE` is default in Python 3
    - **Or be explicit**: `[a-zA-ZÀ-ÿ]` for Latin with accents

## Quantifiers: How Many?

| Quantifier | Meaning | Example | Matches |
|:-----------|:--------|:--------|:--------|
| `*` | Zero or more | `ab*c` | "ac", "abc", "abbc"... |
| `+` | One or more | `ab+c` | "abc", "abbc"... (not "ac") |
| `?` | Zero or one | `colou?r` | "color", "colour" |
| `{n}` | Exactly n | `a{3}` | "aaa" |
| `{n,}` | n or more | `a{2,}` | "aa", "aaa"... |
| `{n,m}` | Between n and m | `a{2,4}` | "aa", "aaa", "aaaa" |

### Greedy vs Lazy

By default, quantifiers are *greedy* — they match as much as possible:

``` title="Greedy Matching" linenums="1"
Pattern: <.*>
String:  <div>hello</div>
Match:   <div>hello</div>  (the whole thing!)
```

Add `?` for *lazy* matching — match as little as possible:

``` title="Lazy Matching" linenums="1"
Pattern: <.*?>
String:  <div>hello</div>
Match:   <div>  (just the first tag)
```

## Grouping and Alternatives

### Groups: `( )`

Parentheses group patterns together:

``` title="Grouping Examples" linenums="1"
(ab)+     # One or more "ab": "ab", "abab", "ababab"
(cat|dog) # "cat" or "dog"
```

### Capturing Groups

Groups also *capture* what they match for later use:

```python title="Capturing Groups in Python" linenums="1"
import re

match = re.search(r'(\d{3})-(\d{4})', 'Call 555-1234')  # (1)!
print(match.group(0))  # "555-1234" (entire match)
print(match.group(1))  # "555" (first capture group)
print(match.group(2))  # "1234" (second capture group)
```

1. Two capturing groups: 3 digits, hyphen, 4 digits
2. Group 0 is always the entire matched string
3. Groups 1, 2, 3... correspond to left parentheses in order

**Practical use — reformatting phone numbers:**

```python title="Reformatting with Capture Groups" linenums="1"
import re

phone = "555-123-4567"
match = re.search(r'(\d{3})-(\d{3})-(\d{4})', phone)
formatted = f"({match.group(1)}) {match.group(2)}-{match.group(3)}"
print(formatted)  # (555) 123-4567
```

### Non-Capturing Groups: `(?: )`

When you need grouping but don't need to capture:

``` title="Non-Capturing Group" linenums="1"
(?:ab)+   # Groups "ab" for the quantifier without creating a capture
```

### Backreferences

Match *the same text again* that was captured by an earlier group:

``` title="Finding Duplicate Words" linenums="1"
(\w+)\s+\1   # Matches "the the", "is is", "error error"
```

`\1` matches exactly the text captured by Group 1. If Group 1 captured "the", then `\1` only matches "the" at that position — not any other word.

**Matching paired HTML tags:**

``` title="Matching Paired Tags" linenums="1"
<(\w+)>.*?</\1>   # Matches <div>content</div>, not <div>content</span>
```

??? tip "Backreferences and the Formal Model"

    Backreferences are powerful but technically step outside the regular language model. An FSM has no memory beyond its current state — it can't remember arbitrary captured text. This is why high-performance engines like `re2` don't support `\1`. For the full explanation, see [Regular Expressions: The Formal Model](../efficiency/regular_expressions.md#backreferences-break-the-model).

## Anchors and Boundaries

| Anchor | Meaning |
|:-------|:--------|
| `^` | Start of string (or line with multiline flag) |
| `$` | End of string (or line with multiline flag) |
| `\b` | Word boundary |
| `\B` | Not a word boundary |

**Word boundaries** prevent partial matches:

``` title="Word Boundary Example" linenums="1"
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

**Example — password must contain a digit and a letter:**

``` title="Password Validation with Lookaheads" linenums="1"
^(?=.*\d)(?=.*[a-zA-Z]).{8,}$
```

- `(?=.*\d)` — somewhere ahead, there's a digit
- `(?=.*[a-zA-Z])` — somewhere ahead, there's a letter
- `.{8,}` — at least 8 characters total

## Flags and Modifiers

Flags change how the engine interprets your pattern:

| Flag | Name | What It Does |
|:-----|:-----|:-------------|
| `i` | Case insensitive | Match both uppercase and lowercase |
| `g` | Global | Find all matches (not just first) |
| `m` | Multiline | `^` and `$` match line starts/ends |
| `s` | Dotall | `.` matches newlines too |

=== ":material-language-python: Python"

    ```python title="Flags in Python" linenums="1"
    import re

    re.search(r'hello', text, re.IGNORECASE)                    # i
    re.findall(r'\d+', text)                                    # g (findall is global)
    re.search(r'^line', text, re.MULTILINE)                     # m
    re.search(r'Hello.World', text, re.DOTALL)                  # s
    re.search(r'hello', text, re.IGNORECASE | re.MULTILINE)     # combine with |
    ```

=== ":material-language-javascript: JavaScript"

    ```javascript title="Flags in JavaScript" linenums="1"
    /hello/i          // Case insensitive
    /\d+/g            // Global — find all matches
    /^line/m          // Multiline — ^ matches line starts
    /./s              // Dotall — . matches newlines
    /hello/gi         // Multiple flags
    ```

=== ":material-language-go: Go"

    ```go title="Flags in Go" linenums="1"
    import "regexp"

    // Go uses inline flags inside the pattern
    regexp.MatchString(`(?i)hello`, text)     // Case insensitive
    regexp.FindAllString(`\d+`, text, -1)     // Find all (-1 = no limit)
    regexp.MatchString(`(?m)^line`, text)     // Multiline
    regexp.MatchString(`(?s).`, text)         // Dotall
    regexp.MatchString(`(?im)hello`, text)    // Multiple flags
    ```

=== ":material-language-rust: Rust"

    ```rust title="Flags in Rust" linenums="1"
    use regex::Regex;

    // Rust uses inline flags inside the pattern
    let re = Regex::new(r"(?i)hello").unwrap();   // Case insensitive
    let re = Regex::new(r"(?m)^line").unwrap();   // Multiline
    let re = Regex::new(r"(?s).").unwrap();       // Dotall
    let re = Regex::new(r"(?im)hello").unwrap();  // Multiple flags
    ```

=== ":material-language-java: Java"

    ```java title="Flags in Java" linenums="1"
    import java.util.regex.*;

    Pattern.compile("hello", Pattern.CASE_INSENSITIVE);
    Pattern.compile("^line", Pattern.MULTILINE);
    Pattern.compile(".", Pattern.DOTALL);
    Pattern.compile("hello", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE);
    ```

=== ":material-language-cpp: C++"

    ```cpp title="Flags in C++" linenums="1"
    #include <regex>

    std::regex re("hello", std::regex::icase);
    std::regex re("^line", std::regex::multiline);
    // No dotall flag in C++ — use [\s\S] instead of .
    std::regex re("hello", std::regex::icase | std::regex::multiline);
    ```

## Practical Patterns

=== ":material-email: Email Address"

    ``` title="Email Pattern" linenums="1"
    ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
    ```

    | Part | Meaning |
    |:-----|:--------|
    | `[a-zA-Z0-9._%+-]+` | Local part |
    | `@` | Literal @ |
    | `[a-zA-Z0-9.-]+` | Domain name |
    | `\.[a-zA-Z]{2,}` | Dot + TLD (2+ letters) |

    ??? warning "Email Validation Reality"

        This is a simplification. The actual spec ([RFC 5322](https://www.rfc-editor.org/rfc/rfc5322.html)) is absurdly complex. In practice: check for `@` and send a confirmation email.

=== ":material-phone: Phone Numbers"

    ``` title="US Phone Number" linenums="1"
    ^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$
    ```

    Matches `5551234567`, `555-123-4567`, `(555) 123-4567`, `555.123.4567`.

    ??? warning "Mismatched Parentheses"

        This allows `(555-123-4567` (open paren, no close). Stricter version:

        ``` title="Strict Parentheses" linenums="1"
        ^(\(\d{3}\)|\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})$
        ```

=== ":material-ip-network: IP Address"

    ``` title="IPv4 Address" linenums="1"
    ^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$
    ```

    ??? warning "Not Fully Validated"

        This matches `999.999.999.999`. For true validation, parse the octets and check `0–255` in code.

=== ":material-file-document: Log Parsing"

    ``` title="Structured Log Pattern" linenums="1"
    ^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] \[(\w+)\] (.*)$
    ```

    For `[2024-03-15 14:30:45] [ERROR] Something went wrong`:

    - Group 1: `2024-03-15 14:30:45`
    - Group 2: `ERROR`
    - Group 3: `Something went wrong`

## Regex in Your Language

=== ":material-language-python: Python"

    ```python title="Regex in Python" linenums="1"
    import re

    match = re.search(r'\d+', 'Order 12345')        # First match
    print(match.group())                             # "12345"

    matches = re.findall(r'\d+', 'Items: 5, 10, 15') # All matches
    print(matches)                                   # ['5', '10', '15']

    result = re.sub(r'\d+', 'X', 'Order 123')       # Replace
    print(result)                                    # "Order X"
    ```

=== ":material-language-javascript: JavaScript"

    ```javascript title="Regex in JavaScript" linenums="1"
    /\d+/.test('Order 12345')           // true (boolean test)
    'Order 12345'.match(/\d+/)          // ['12345'] (first match)
    'Order 12345'.match(/\d+/g)         // ['12345'] (all, with /g)
    'Order 123'.replace(/\d+/g, 'X')    // "Order X"
    ```

=== ":material-language-go: Go"

    ```go title="Regex in Go" linenums="1"
    package main

    import (
        "fmt"
        "regexp"
    )

    func main() {
        re := regexp.MustCompile(`\d+`)
        fmt.Println(re.FindString("Order 12345"))          // "12345"
        fmt.Println(re.FindAllString("5, 10, 15", -1))    // [5 10 15]
        fmt.Println(re.ReplaceAllString("Order 123", "X")) // "Order X"
    }
    ```

=== ":material-language-rust: Rust"

    ```rust title="Regex in Rust" linenums="1"
    use regex::Regex;  // Requires `regex` crate in Cargo.toml

    let re = Regex::new(r"\d+").unwrap();

    if let Some(m) = re.find("Order 12345") {
        println!("{}", m.as_str());  // "12345"
    }

    let all: Vec<&str> = re.find_iter("5, 10, 15").map(|m| m.as_str()).collect();
    println!("{:?}", all);  // ["5", "10", "15"]

    println!("{}", re.replace_all("Order 123", "X"));  // "Order X"
    ```

=== ":material-console: Command Line"

    ```bash title="Regex with grep" linenums="1"
    # Lines containing "error"
    grep -E 'error' logfile.txt

    # Lines starting with a date
    grep -E '^[0-9]{4}-[0-9]{2}-[0-9]{2}' logfile.txt

    # Extract matches only (not whole lines)
    grep -oE '\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}' logfile.txt
    ```

## Common Pitfalls

### Catastrophic Backtracking

Patterns with nested quantifiers can cause exponential runtime against crafted input:

``` title="Dangerous Pattern" linenums="1"
(a+)+b    # Against "aaaaaaaaac", the engine tries every way to split the a's
```

This has caused real outages (Cloudflare 2019, Stack Overflow). The fix: flatten to a single quantifier.

``` title="Safe Rewrite" linenums="1"
a+b   # One quantifier — no choice points to backtrack through
```

For the theory of why this happens, see [Regular Expressions: The Formal Model](../efficiency/regular_expressions.md).

### Forgetting Anchors

`\d{3}-\d{4}` matches "555-1234" anywhere in a string, including inside longer text. Add anchors when you need a full-string match:

``` title="With Anchors" linenums="1"
^\d{3}-\d{4}$
```

### Escaping Special Characters

To match literal special characters, escape them with `\`:

``` title="Escaping" linenums="1"
\.  \*  \+  \?  \[  \]  \(  \)  \{  \}  \^  \$  \|  \\
```

Inside a character class, most special characters are literal: `[.*+?]` matches `.`, `*`, `+`, or `?`.

## Technical Interview Context

Regex problems appear in interviews either as direct tasks ("write a pattern to extract all URLs") or as discussion topics in code review and security scenarios.

??? question "Write a regex to validate a phone number / extract all URLs from this text"

    You'll be expected to know `\d`, `\w`, `\s`, quantifiers (`+`, `*`, `?`, `{n,m}`), anchors (`^`, `$`), and groups `()`. The key technique: read a pattern aloud — "one or more digits, then a hyphen, then more digits" maps directly to `\d+-\d+`.

??? question "What's the difference between greedy and lazy matching?"

    Greedy (`.*`) matches as much as possible; lazy (`.*?`) matches as little as possible. On `<a>foo</b>`, `<.+>` matches the whole string; `<.+?>` matches just `<a>` and `</b>` separately.

??? question "Why shouldn't you parse HTML with regex?"

    HTML allows arbitrary nesting, which requires counting and memory beyond what finite automata provide. Any regex that looks like it handles nesting will fail on edge cases — malformed input, deeply nested tags, or attributes with angle brackets. Use a proper HTML parser.

??? question "What is catastrophic backtracking / ReDoS?"

    Certain patterns like `(a+)+` create exponential backtracking on adversarial input — 30 characters can trigger billions of match attempts. Nested quantifiers on overlapping character classes are the warning sign.

## Practice Problems

??? question "Practice Problem 1: URL Validation"

    Write a regex that matches HTTP/HTTPS URLs:

    - `https://example.com`
    - `http://sub.domain.org/path`
    - `https://site.io/page?id=123`

    ??? tip "Solution"

        **Pattern**: `^https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(/[^\s]*)?$`

        - `^https?` — "http" or "https" (`s` is optional)
        - `://` — literal
        - `[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}` — domain and TLD
        - `(/[^\s]*)?` — optional path (any non-whitespace after `/`)
        - `$` — end of string

??? question "Practice Problem 2: Date Validation"

    Match dates in YYYY-MM-DD format where month is 01–12 and day is 01–31.

    ??? tip "Solution"

        **Pattern**: `^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$`

        - `\d{4}` — four-digit year
        - `(0[1-9]|1[0-2])` — month 01–09 or 10–12
        - `(0[1-9]|[12]\d|3[01])` — day 01–09, 10–29, or 30–31

        Note: This rejects month 13 but accepts February 31. For calendar-valid dates, parse the numbers and validate in code.

??? question "Practice Problem 3: Find Duplicate Words"

    Write a regex that finds repeated consecutive words like "the the" or "is is".

    ??? tip "Solution"

        **Pattern**: `\b(\w+)\s+\1\b`

        - `\b` — word boundary (prevents matching partial words)
        - `(\w+)` — capture one or more word characters as Group 1
        - `\s+` — one or more whitespace characters
        - `\1` — backreference: must match the exact text captured by Group 1
        - `\b` — closing word boundary

        Note: This uses a backreference, which technically steps outside the regular language model — FSMs can't remember arbitrary captured text. See [Regular Expressions: The Formal Model](../efficiency/regular_expressions.md#backreferences-break-the-model) for why.

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
| Capture group | `(...)` | `(\d{3})` captures three digits |
| Non-capturing | `(?:...)` | `(?:ab)+` groups without capturing |
| Backreference | `\1` | `(\w+)\s+\1` finds repeated words |
| Word boundary | `\b` | `\bword\b` matches whole word |
| Lookahead | `(?=...)` | `(?=.*\d)` requires digit ahead |

## Further Reading

**On This Site**

- [Regular Expressions: The Formal Model](../efficiency/regular_expressions.md) — How regex engines compile patterns to automata, why backtracking causes ReDoS, and what regex fundamentally cannot match
- [Finite State Machines](../efficiency/finite_state_machines.md) — The automaton theory underlying regex engines
- [How Parsers Work](../efficiency/how_parsers_work.md) — When regex isn't powerful enough

**External**

- [Regex101](https://regex101.com/) — Interactive regex tester with explanation, NFA visualizer, and step debugger
- [RFC 5322](https://www.rfc-editor.org/rfc/rfc5322.html) — The full email address specification (a useful reminder of when not to use regex)

---

Regular expressions look like line noise until suddenly they don't — and then you'll reach for them constantly. Build patterns piece by piece, test at [Regex101](https://regex101.com/), and resist the urge to write everything in one inscrutable expression. Understanding the syntax is the first step; understanding the engine is what separates regex that works from regex that causes incidents.
