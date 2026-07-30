---
date: "2026-07-30 11:00"
title: "CS Essentials for Engineers: Big-O, Recursion & Types"
description: "The computer science foundations every working engineer should know cold — Big-O, type systems, recursion, trees, regex, and what actually happens when your code runs."
---
# Essentials

!!! tip "The Theory Behind the Job"
    Shipping production code every day doesn't require a CS degree — most of the time the frameworks handle it. Essentials is the layer where the fine print starts to matter: why one approach is $O(n^2)$ and another is $O(n \log n)$, why a type error only shows up at runtime, why a regex innocently approved in code review took down a service.

Each article starts from a real engineering scenario, then works backward to the theory that explains it. No academic throat-clearing, no proofs for their own sake — just the mental model that makes the tools you already use make sense.

## Start Here: The Core Ideas

The four concepts everything else builds on.

<div class="grid cards two-col" markdown>

-   :material-help-circle: **[What Is Computer Science?](what_is_computer_science.md)**

    ---

    The field itself, past the buzzword — what it actually studies and why any of it should matter to someone who already ships code.

-   :material-api: **[What an API Actually Is](what_is_an_api.md)**

    ---

    The formal contract every API is built on, and why breaking that contract is what breaks every caller downstream.

-   :material-speedometer: **[Big-O Notation](big_o_notation.md)**

    ---

    The language for talking about how code scales — and how to tell your reviewer exactly why that nested loop is a problem.

-   :material-shape: **[Type Systems Basics](type_systems_basics.md)**

    ---

    Why some bugs are impossible in one language and routine in another — the theory behind what a compiler will and won't catch.

</div>

## Language & Data

<div class="grid cards two-col" markdown>

-   :material-regex: **[Regular Expressions](regular_expressions.md)**

    ---

    The syntax you already use for validation, and the formal language theory that explains exactly what it can — and structurally cannot — match.

-   :material-arrow-u-left-top: **[Recursion](recursion.md)**

    ---

    Self-reference as a computational pattern: when it's the cleanest tool available, and when it silently blows the stack.

-   :material-file-tree: **[Trees](trees_basics.md)**

    ---

    Your file system, your JSON, your database indexes, your DOM — all the same structure underneath.

</div>

## Systems

<div class="grid cards two-col" markdown>

-   :material-cpu-64-bit: **[What Actually Happens When Your Code Runs](cpu_and_machine_code.md)**

    ---

    From source code to machine instructions — the translation a compiler or interpreter does on your behalf, every single time.

-   :material-memory: **[The Stack, the Heap, and Virtual Memory](stack_heap_virtual_memory.md)**

    ---

    Why a deep recursive call overflows the stack, and what an "out of memory" error is actually telling you.

</div>

---

## What You'll Take Away

By the end of Essentials you'll be able to:

- Explain why an algorithm is $O(n^2)$ instead of $O(n \log n)$, and predict where it falls over at scale
- Tell whether a bug is a type problem the compiler could have caught, or a genuinely runtime issue
- Recognize a tree or a recursive structure in code that never uses either word
- Explain what a stack overflow and an out-of-memory error actually *are*, not just that they happened

---

## What's Next?

Start with **[What Is Computer Science?](what_is_computer_science.md)** — the field itself, not the buzzword.

After Essentials, the Efficiency tier goes deeper: formal language theory, parsers and compilers, the operating system underneath every process, and the web protocols your APIs actually run on.
