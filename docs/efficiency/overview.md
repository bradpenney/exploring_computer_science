---
date: "2026-07-30 11:00"
title: "CS Efficiency: Parsers, Operating Systems & Web Protocols"
description: "Beyond the fundamentals: how parsers and compilers actually work, what the OS scheduler decides for you, and the protocols and cryptography behind every API call."
---
# Efficiency

!!! tip "Building on Essentials"
    Essentials gave you the vocabulary — Big-O, types, recursion, trees. Efficiency spends it: on the machinery that turns source code into a running process, the operating system deciding when that process actually gets the CPU, and the protocols and cryptography every network call depends on.

Where Essentials explained individual concepts, Efficiency follows a thread from one to the next — a parser needs a finite state machine before it needs a grammar; a scheduler decision only makes sense once you know what a process actually is. Read a group in order the first time through.

## Start Here: Computational Thinking

<div class="grid cards two-col" markdown>

-   :material-brain: **[Computational Thinking](computational_thinking.md)**

    ---

    The problem-solving pattern underneath every technique in this tier — decomposition, abstraction, and algorithmic thinking, made explicit instead of assumed.

</div>

## The Rest of Efficiency

<div class="grid cards two-col" markdown>

-   :material-file-tree-outline: **[Languages & Parsing](finite_state_machines.md)** — finite state machines, the formal model behind regex, how parsers work, and compilers vs. interpreters

-   :material-format-list-bulleted: **[Data Structures](lists_recursive_structure.md)** — why a linked list is really a recursive data type in disguise

-   :material-web: **[Web & APIs](web/client_server_request_response.md)** — the request/response lifecycle, why HTTP is stateless, anatomy of a request, and authentication vs. authorization

-   :material-lock: **[Security](security/public_key_cryptography.md)** — public-key cryptography, the math that lets two strangers share a secret over an open channel

-   :material-chip: **[Systems](systems/operating_system_basics.md)** — operating system basics, processes and threads, how the scheduler actually decides, and the CPU architectures underneath it all

</div>

---

## What You'll Take Away

By the end of Efficiency you'll be able to:

- Explain how a regex engine, a JSON parser, and a compiler all reduce to the same underlying theory
- Reason about why your process didn't get scheduled when you expected, and what "context switch" actually costs
- Explain what TLS and public-key cryptography are actually doing when a browser shows a padlock
- Read an HTTP request/response cycle and know exactly which layer a given bug lives in

---

## What's Next?

Start with **[Computational Thinking](computational_thinking.md)** — the pattern every other article in this tier assumes you already have.

The Mastery tier is still in development — information theory, formal languages, functional programming, and computability theory, for readers who want the field's full depth.
