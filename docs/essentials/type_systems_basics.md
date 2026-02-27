---
title: "Type Systems: The Contract Behind Every Variable"
description: Understand type systems from a CS theory perspective — what types really are, how type notation works, and why every strongly-typed language enforces the same rules.
---

# Type Systems: The Contract Behind Every Variable

You've seen `TypeError: unsupported operand type(s) for +: 'int' and 'str'` in Python. You've fought with TypeScript refusing to compile because a `string` showed up where a `number` was expected. You've written Go code that wouldn't build because you passed the wrong type to a function. You've added type hints to a Python codebase and had a teammate ask "why bother?"

**The "why bother" answer is CS theory.** Types are not just documentation or editor niceties — they are formal contracts that define what values exist and what operations are valid on those values. Every type error you've ever seen is the language enforcing one of these contracts.

!!! info "Learning Objectives"

    By the end of this article, you'll be able to:

    - Explain what a type system is and what formal guarantees it provides
    - Read standard type notation: product types, sum types, and function types
    - Distinguish static vs. dynamic and strong vs. weak type systems — and why both axes matter
    - Connect `TypeError`, `mypy` errors, and TypeScript complaints to formal type theory
    - Explain why type systems exist beyond documentation and editor autocompletion

## Where You've Seen This

Type systems permeate every production codebase:

- **Python type hints** — `def process(items: list[str]) -> dict[str, int]` is a formal type contract; `mypy` and `pyright` enforce it statically
- **TypeScript** — the entire language is a type system layered on top of JavaScript; it exists precisely because untyped JS caused too many runtime errors at scale
- **Go** — compiled, strictly typed, no implicit conversions; the compiler rejects type mismatches before any code runs
- **Rust** — ownership and borrow rules are built into the type system; memory safety is enforced via types, not runtime checks
- **Java generics** — `List<User>` and `Map<String, Integer>` parameterize types to prevent mixing incompatible values
- **Database schemas** — every column has a type; the database enforces it on every insert and query
- **Function signatures** — every API you write documents its types implicitly (or explicitly), and callers form contracts around those signatures

## Why This Matters for Production Code

=== ":material-bug: Catching Errors Earlier"

    The earlier in the development cycle you catch a type error, the cheaper it is to fix. A typo that passes a `user_id: int` to a function expecting a `username: str` can silently produce wrong results in production — or crash loudly on specific inputs.

    Static type checking (TypeScript, Go, Rust, Java, `mypy` for Python) catches these errors at compile time or in your editor — before a single line of code runs. Runtime type checking (Python without type hints, JavaScript) catches them only when the bad code path executes.

    This is why teams add TypeScript to large JavaScript codebases despite the overhead: as a codebase grows, runtime type errors compound faster than manual testing can catch them.

=== ":material-api: API Contracts and Interfaces"

    Every function signature is a type contract. When you write:

    ```python title="Function as Type Contract" linenums="1"
    def send_notification(user_id: int, message: str) -> bool:
        ...
    ```

    You're declaring: "give me a whole number and a string; I'll return true or false." Any caller that violates this contract — passing a string for `user_id`, or expecting a `dict` back — has a bug.

    Type systems make these contracts machine-readable. Tools can verify them, IDEs can enforce them, and future engineers can understand them without reading the implementation.

=== ":material-cog-refresh: Refactoring Safely"

    Strong type systems are what make large-scale refactoring possible. When you rename a field, change a return type, or extract a new parameter, a type-aware toolchain can find every call site that needs to change.

    In dynamically typed languages without annotations, that same refactor requires manual search-and-review of the entire codebase — and you still won't catch everything until tests run.

    This is why Go, Rust, and TypeScript have become dominant in large engineering teams: the type system acts as a safety net for changes.

=== ":material-layers: Composite Types and Design"

    Understanding type theory reveals that complex types are built from simple ones. A `User` struct is a **product type** — it combines a name, an email, and an ID together. An HTTP status code is a **sum type** — it's either a success or an error, not both. A database query result is a **function type** — it maps a query (input) to a result set (output).

    Once you see types as structures — products, sums, functions — you can design cleaner data models. Rust's `enum` (sum types), TypeScript's discriminated unions, and Haskell's algebraic data types all express this directly.

## What a Type Actually Is

In CS theory, a **datatype** is precisely defined: it is a set of possible values together with the operations that can be applied to those values.

That's the whole definition. A type is a set of values. The `Boolean` type is the set `{true, false}`. The `Integer` type is the set `{..., -2, -1, 0, 1, 2, ...}`. A `String` is the set of all finite sequences of characters.

**Why sets matter:** If a type is a set, then a value "belongs to" a type, and the type system can check whether operations that require a certain type of value are receiving one. The type of a value determines what can be done with it.

### Primitive Types

Most languages share the same small set of primitive (atomic) types:

| Type | Values | Example Operations |
|:-----|:-------|:------------------|
| `Boolean` | `true`, `false` | `and`, `or`, `not`, conditionals |
| `Integer` | `..., -2, -1, 0, 1, 2, ...` | `+`, `-`, `*`, `/`, `%`, comparisons |
| `Float` | real number approximations | same as Integer, but imprecise |
| `String` | sequences of characters | concatenation, slicing, search |
| `Null` / `None` | a single "no value" value | usually just comparison |

Note that even `Null` is a type — it's the type that has exactly one value. Understanding this prevents a class of bugs: `None` has a type, and treating it as an `Integer` (because you expected a number from a function) is a type error.

### Function Types and Type Notation

This is where CS theory introduces notation you won't see in most programming textbooks but will immediately recognize once you've seen it:

A function (or procedure) has a type that describes its inputs and output. The notation is:

$$\text{InputType}_1 \times \text{InputType}_2 \to \text{OutputType}$$

The `×` symbol separates input types. The `→` arrow separates inputs from output.

Examples:

| Function | Type Notation | Plain English |
|:---------|:-------------|:-------------|
| `abs(n)` | `Integer → Integer` | Takes one integer, returns one integer |
| `max(a, b)` | `Integer × Integer → Integer` | Takes two integers, returns one integer |
| `is_even(n)` | `Integer → Boolean` | Takes an integer, returns a boolean |
| `greet(name)` | `String → String` | Takes a string, returns a string |
| `filter(f, lst)` | `(A → Boolean) × List<A> → List<A>` | Takes a predicate and a list, returns a filtered list |

You write informal versions of this every time you write a function signature. CS theory formalizes it with precise notation.

??? tip "Why the × symbol?"

    The `×` between input types comes from set theory. If a function takes two Boolean inputs, its input space is the **Cartesian product** `Boolean × Boolean`, which has `2 × 2 = 4` possible input combinations. The notation makes the size of the input space explicit. For `Integer × Integer`, that's an infinite number of input pairs — but the type still constrains which values are acceptable.

### Composite Types: Building Complex from Simple

Starting from primitive types, languages build composite types:

**Product types** combine multiple values that must all be present. A `struct`, `tuple`, or record is a product type:

```
Point = Integer × Integer
```

A `Point` is always a pair of two integers. You can't have a `Point` with only one coordinate, or with a string coordinate.

**Sum types** (also called union types or variant types) represent a value that can be *one of several* alternatives. A classic example: an HTTP response is either a success with data, or an error with a message — never both at once. Rust's `enum`, TypeScript's discriminated unions, and Haskell's `Either` are all sum types.

**Function types** describe functions themselves as values — this is what makes higher-order functions possible. The type of `filter` is `(A → Boolean) × List<A> → List<A>`: a function-taking-a-function.

## Reading Type Signatures

Once you recognize the notation, type signatures become compact documentation you can read at a glance.

=== ":material-language-python: Python"

    ```python title="Python Type Signatures" linenums="1"
    from typing import Callable

    # Integer → Integer
    def factorial(n: int) -> int:
        return 1 if n <= 0 else n * factorial(n - 1)

    # Integer × Integer → Integer
    def max_val(a: int, b: int) -> int:
        return a if a > b else b

    # Integer → Boolean
    def is_even(n: int) -> bool:
        return n % 2 == 0

    # (Integer → Boolean) × list[Integer] → list[Integer]
    def filter_list(predicate: Callable[[int], bool], items: list[int]) -> list[int]:
        return [x for x in items if predicate(x)]
    ```

=== ":material-language-javascript: JavaScript"

    ```typescript title="TypeScript Type Signatures" linenums="1"
    // Integer → Integer
    function factorial(n: number): number {
        return n <= 0 ? 1 : n * factorial(n - 1);
    }

    // Integer × Integer → Integer
    function maxVal(a: number, b: number): number {
        return a > b ? a : b;
    }

    // Integer → Boolean
    function isEven(n: number): boolean {
        return n % 2 === 0;
    }

    // (Integer → Boolean) × number[] → number[]
    function filterList(predicate: (n: number) => boolean, items: number[]): number[] {
        return items.filter(predicate);
    }
    ```

=== ":material-language-go: Go"

    ```go title="Go Type Signatures" linenums="1"
    // int → int
    func factorial(n int) int {
        if n <= 0 {
            return 1
        }
        return n * factorial(n-1)
    }

    // int × int → int
    func maxVal(a, b int) int {
        if a > b {
            return a
        }
        return b
    }

    // int → bool
    func isEven(n int) bool {
        return n%2 == 0
    }

    // (int → bool) × []int → []int
    func filterList(predicate func(int) bool, items []int) []int {
        var result []int
        for _, v := range items {
            if predicate(v) {
                result = append(result, v)
            }
        }
        return result
    }
    ```

=== ":material-language-rust: Rust"

    ```rust title="Rust Type Signatures" linenums="1"
    // i64 → i64
    fn factorial(n: i64) -> i64 {
        if n <= 0 { 1 } else { n * factorial(n - 1) }
    }

    // i64 × i64 → i64
    fn max_val(a: i64, b: i64) -> i64 {
        if a > b { a } else { b }
    }

    // i64 → bool
    fn is_even(n: i64) -> bool {
        n % 2 == 0
    }

    // (i64 → bool) × Vec<i64> → Vec<i64>
    fn filter_list<F: Fn(i64) -> bool>(predicate: F, items: Vec<i64>) -> Vec<i64> {
        items.into_iter().filter(|&x| predicate(x)).collect()
    }
    ```

=== ":material-language-java: Java"

    ```java title="Java Type Signatures" linenums="1"
    import java.util.List;
    import java.util.function.Predicate;
    import java.util.stream.Collectors;

    // int → int
    static int factorial(int n) {
        return n <= 0 ? 1 : n * factorial(n - 1);
    }

    // int × int → int
    static int maxVal(int a, int b) {
        return a > b ? a : b;
    }

    // int → boolean
    static boolean isEven(int n) {
        return n % 2 == 0;
    }

    // (int → boolean) × List<Integer> → List<Integer>
    static List<Integer> filterList(Predicate<Integer> predicate, List<Integer> items) {
        return items.stream().filter(predicate).collect(Collectors.toList());
    }
    ```

=== ":material-language-cpp: C++"

    ```cpp title="C++ Type Signatures" linenums="1"
    #include <vector>
    #include <functional>

    // int → int
    int factorial(int n) {
        return n <= 0 ? 1 : n * factorial(n - 1);
    }

    // int × int → int
    int maxVal(int a, int b) {
        return a > b ? a : b;
    }

    // int → bool
    bool isEven(int n) {
        return n % 2 == 0;
    }

    // (int → bool) × vector<int> → vector<int>
    std::vector<int> filterList(
        std::function<bool(int)> predicate,
        std::vector<int> items
    ) {
        std::vector<int> result;
        for (int x : items) {
            if (predicate(x)) result.push_back(x);
        }
        return result;
    }
    ```

## Static vs. Dynamic Typing

A key axis in type system design is *when* types are checked:

**Static typing** — types are checked at compile time before any code runs. The compiler rejects programs with type errors. Go, Rust, Java, C++, TypeScript, and Haskell are statically typed.

**Dynamic typing** — types are checked at runtime when an operation is actually attempted. Python, JavaScript (without TypeScript), and Ruby are dynamically typed. Type errors only appear when the bad code path executes.

Neither is strictly better; they involve trade-offs:

| Dimension | Static Typing | Dynamic Typing |
|:----------|:--------------|:---------------|
| Error detection | At compile time | At runtime |
| Refactoring safety | High (compiler finds breaks) | Low (tests must cover it) |
| Prototype speed | Slower (types must be declared) | Faster (just write code) |
| Runtime overhead | Usually none (types erased) | Some (type checks at runtime) |
| Codebase scale | Scales well | Gets painful at large scale |

Python threads the needle with **optional static typing**: the language is dynamically typed, but type hints + `mypy` let you add static checking incrementally.

## Technical Interview Context

Type systems come up in interviews both as a direct topic ("what's the difference between static and dynamic typing?") and as background knowledge for explaining language choices and architectural decisions.

??? question "What's the difference between static and dynamic typing?"

    The distinction is when type checking happens: before the program runs (static) or during execution (dynamic). Go and Rust catch type errors at compile time; Python and JavaScript catch them at runtime, only when the bad code path actually executes.

??? question "What is type inference?"

    A static type system where the compiler deduces types from context rather than requiring explicit annotations. Go infers the type in `x := 42`; Rust infers types throughout an entire function from how values are used.

??? question "Why did your team add TypeScript to your JavaScript codebase?"

    Moving type errors from runtime to compile time. As a codebase grows, runtime type errors multiply faster than tests can catch them. TypeScript is the pragmatic answer to that scaling problem.

??? question "What's the difference between strong and weak typing?"

    Strong typing means the language refuses implicit coercions (`"1" + 1` is an error); weak typing performs them silently. Python and Go are strongly typed; JavaScript is weakly typed.

??? question "What is null safety?"

    Null safety prevents null pointer dereferences at compile time by requiring code to handle the absent case explicitly. Kotlin, Rust (`Option<T>`), and Swift make this a type-system feature; Java and Python leave it to runtime checks and defensive code.

## Practice Problems

??? question "Practice 1: Write the Type"

    Write the CS type notation for each of these functions. Use the `A × B → C` format.

    a. A function that takes two integers and returns a Boolean indicating which is larger.

    b. A function that takes a list of strings and returns the total number of characters.

    c. A function that takes a sorting key function and a list of items, and returns a sorted list.

    ??? tip "Answers"

        a. `Integer × Integer → Boolean`

        b. `List<String> → Integer`

        c. `(A → Key) × List<A> → List<A>` — this is a generic/parameterized type. The exact type of the key depends on what you're sorting by.

??? question "Practice 2: Type Error or Not?"

    For each scenario, identify whether it's a type error and explain why.

    a. Passing the integer `0` to a function that expects a `Boolean`.

    b. Calling `.upper()` on the result of a function typed as `String → Integer`.

    c. Using the result of `is_even(n)` (which returns Boolean) as the condition in an `if` statement.

    ??? tip "Answers"

        a. **Type error** — `Integer` and `Boolean` are different types. In Python this would work (0 is falsy) but it's semantically a type error. In Go or Java, this would be a compile error.

        b. **Type error** — the function returns `Integer`, and `.upper()` is a `String` operation. An integer doesn't have `.upper()`.

        c. **Not a type error** — `Boolean` is exactly the type expected by an `if` condition.

## Key Takeaways

| Concept | What to Remember |
|:--------|:----------------|
| A type is a set | Types define the set of possible values and valid operations |
| Type notation | `A × B → C` means "takes A and B, returns C" |
| Primitive types | `Boolean`, `Integer`, `Float`, `String`, `Null` — the building blocks |
| Product types | Structs/tuples: all fields must be present (`A × B`) |
| Sum types | Enums/unions: exactly one variant present (`A | B`) |
| Function types | Functions are values too; HOFs have function-type parameters |
| Static vs dynamic | When errors are caught — compile time vs runtime |

## Further Reading

**On This Site**

- [Big-O Notation](big_o_notation.md) — once you understand types, complexity notation uses the same formal style

**External**

- [*Introduction to Computing*](https://computingbook.org/) by David Evans, Chapter 5 — the Scheme-based treatment of types and data that inspired this article
- [TypeScript Handbook, "Everyday Types"](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — a practical modern introduction to a real type system

Understanding type systems doesn't just help you avoid `TypeError` crashes — it gives you a vocabulary for reasoning about software correctness. When you write a function signature, you're making a formal claim about what values are valid inputs and what the caller can expect in return. The more precisely you can state those claims, the more confidently you can build on top of them.
