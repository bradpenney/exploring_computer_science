---
title: Exploring Computer Science - CS Theory for Working Engineers
description: The CS theory behind the production code you write. Big-O, data structures, algorithms, and computational theory for back-end and platform engineers.
---

# Exploring Computer Science

**The CS theory behind the production code you write.**

<img src="images/exploring_computer_science.png" alt="Exploring Computer Science" class="img-responsive-right" width="300">

Welcome to a practical guide for working engineers who want to understand the computer science foundations underneath the code they ship every day.

## The Problem

Your PR got rejected because the reviewer said it's "O(n²)". You nodded, made some changes, but couldn't quite explain *why* the new version is faster. You've debugged stack traces without understanding why they're called "stacks." You use hash tables (Python dicts, JavaScript objects) constantly but couldn't explain how they achieve O(1) lookup.

**You know HOW to code. This site teaches you WHY things work.**

## The Solution

While [Exploring Linux](https://linux.bradpenney.io), [Exploring Python](https://python.bradpenney.io), and [Exploring Kubernetes](https://k8s.bradpenney.io) teach practical skills, this site teaches the *theory* that makes you a stronger engineer. Understand these concepts and you'll:

- Confidently discuss time/space complexity in code reviews
- Recognize when your algorithm won't scale
- Understand what's happening under the hood in your tools
- Answer theory questions in technical interviews
- Debug more effectively by understanding fundamentals

## How It's Organized

Content is structured by **practical value and depth**:

<div class="grid cards" markdown>

-   :material-package-variant: **Essentials**

    ---

    **The CS you need for interviews and understanding performance.** Can't call yourself a well-rounded engineer without these.

    - **[Big-O Notation](essentials/big_o_notation.md)** — Why your code is slow and how to talk about it
    - Core Data Structures: arrays, hash tables, stacks, queues, trees (coming soon)
    - Fundamental Algorithms: recursion, searching, sorting (coming soon)

-   :material-lightning-bolt: **Efficiency**

    ---

    **CS that makes you better at debugging and system design.** Deeper understanding that pays dividends.

    - Computational Thinking (coming soon)
    - Finite State Machines (coming soon)
    - Regular Expressions (coming soon)
    - How Parsers Work (coming soon)
    - Graphs & Graph Algorithms (coming soon)

-   :material-target: **Mastery**

    ---

    **Deep theory for understanding the limits of computation.** For when you want to go beyond practical and into foundational.

    - Formal Languages: BNF, grammars, RTNs (coming soon)
    - Computability: Turing machines, halting problem, P vs NP (coming soon)
    - Functional Programming: Scheme, higher-order functions (coming soon)

</div>

## Who This Is For

You're a **back-end engineer, platform engineer, or software developer** who:

- Writes production code daily (Python, Go, Java, JavaScript, etc.)
- Has real-world experience shipping features and debugging issues
- **Lacks formal CS training** and wants to fill that gap
- May be self-taught, bootcamp graduate, or career changer
- Wants to understand the "why" behind the tools you use

You already know how to code. **This site teaches the theory underneath.**

## Integration with Other Sites

This site is part of the [BradPenney.io](https://bradpenney.io) learning ecosystem:

- **[Exploring Linux](https://linux.bradpenney.io)** - Linux commands and system administration
- **[Exploring Kubernetes](https://k8s.bradpenney.io)** - Kubernetes for platform engineers
- **[Exploring Python](https://python.bradpenney.io)** - Python automation and scripting
- **[Exploring Software Development Tools](https://tools.bradpenney.io)** - Git, tmux, vim, and developer tooling

**How they connect:**

- CS site + Python site = Understanding why your code performs the way it does
- CS site + Tools site = Knowing the theory behind grep (regex), git (DAGs), parsers (compilers)
- CS site + K8s site = Understanding distributed systems concepts

---

**Ready to understand the theory?** Start with **[Big-O Notation](essentials/big_o_notation.md)** to understand why some code is fast and other code times out at scale.
