---
date: "2026-07-26 09:00"
title: "What Actually Happens When Your Code Runs"
description: "The CPU doesn't run Python, or Go, or anything you wrote. It runs one thing: machine code, one instruction at a time. Here's the fetch-decode-execute cycle underneath every program you've ever shipped."
---

# What Actually Happens When Your Code Runs

!!! tip "Part of a Learning Path"
    This article is a step in the [How Modern Software Really Runs on a CPU](https://bradpenney.io/pathways/cpu-to-cluster) pathway on [bradpenney.io](https://bradpenney.io): a guided sequence through the topic. It also stands on its own.

Profiling a hot loop and watching a flame graph collapse into one function eating 80% of CPU time is routine work. "Instructions per cycle" shows up in a `perf` report and gets nodded along to, whether or not it's fully understood. `top` shows a process pinned at 100% CPU, and it's fair to know that *something* is running — without necessarily being able to say what "running" actually means at the level the hardware experiences it.

Here's the thing nobody tells you in a bootcamp or a framework tutorial: **your CPU has never executed a single line of Python, Go, JavaScript, or Rust.** Not once. It executes exactly one language, and it's not any language you'd recognize as one.

## Where You Might Have Seen This

This layer shows up more often than it gets credit for:

- **`perf` and flame graphs:** every sample is the CPU caught mid-instruction, and the "self time" you're optimizing is instructions, not code.
- **`objdump -d` or a debugger's disassembly view:** the wall of `mov`, `add`, `cmp`, `jmp` you've scrolled past is the actual program the CPU runs.
- **"Segmentation fault (core dumped)":** the CPU tried to execute or access something the hardware refused, and this is the layer where that refusal happens.
- **Cross-compiling for ARM vs x86-64** (Apple Silicon Macs, AWS Graviton instances): you're not translating your code, you're generating an entirely different set of machine instructions for a different hardware dialect.
- **"JIT warmup":** a **just-in-time (JIT) compiler** translates code to machine instructions while the program runs, rather than ahead of time. [Compilers vs. Interpreters](../efficiency/compilers_vs_interpreters.md#jit-compilation-the-best-of-both) covers it in depth, including the JVM/V8/PyPy examples.

## The Machine's Only Language

A CPU is a piece of silicon wired to do one thing on a loop, forever: read a number from memory, treat that number as an instruction, and act on it. That's the whole job. The "number" is called an **opcode**, and the full vocabulary of opcodes a given CPU understands is its **instruction set architecture (ISA)**: x86-64 on most servers and laptops, ARM64 on Apple Silicon and most phones, RISC-V showing up increasingly in embedded and cloud silicon. [x86, ARM, and RISC-V](../efficiency/systems/x86_arm_risc.md) covers why those three vocabularies are genuinely different, not just different names for the same thing.

Every one of these opcodes does something almost insultingly small:

| Instruction (x86-64, simplified) | What it does |
|---|---|
| `mov rax, 5` | Copy the value 5 into register `rax` |
| `add rax, rbx` | Add the value in `rbx` to `rax` |
| `cmp rax, rcx` | Compare `rax` and `rcx`, set flags |
| `jne 0x401020` | Jump to that address if the last comparison wasn't equal |
| `call 0x401200` | Push a return address, jump to a function |
| `ret` | Pop a return address, jump back |

No loops. No functions, in the sense you mean them: `call` and `ret` are the entire mechanism, and every language's function-call convention is built out of them. No variables with names, just numbered **registers**, a handful of tiny, extremely fast storage slots built directly into the CPU (typically 16 general-purpose ones on x86-64), plus addresses into RAM for everything that doesn't fit. `if`, `for`, and `while` are all, underneath, comparisons and jumps.

Everything you've ever written (a Django view, a React component, a Kubernetes controller) eventually reduces to a long sequence of instructions built from this tiny vocabulary. That reduction is what a compiler or interpreter does; **[Compilers vs. Interpreters](../efficiency/compilers_vs_interpreters.md)** covers exactly how. This article is about what happens *after* that reduction: what the CPU does with the result.

## The Fetch-Decode-Execute Cycle

The CPU runs a loop with three steps, over and over, billions of times a second:

```mermaid
graph LR
    A[Fetch] --> B[Decode]
    B --> C[Execute]
    C --> A
    style A fill:#2d3748,stroke:#cbd5e0,stroke-width:2px,color:#fff
    style B fill:#4a5568,stroke:#cbd5e0,stroke-width:2px,color:#fff
    style C fill:#326CE5,stroke:#cbd5e0,stroke-width:2px,color:#fff
```

1. **Fetch.** The CPU reads the instruction sitting at the address held in the **program counter (PC)**, a register that always points at "what runs next."
2. **Decode.** Circuitry figures out what that instruction actually means: which opcode, which registers or memory addresses it touches.
3. **Execute.** The CPU does it: an arithmetic unit adds two numbers, a comparison sets a flag, a jump overwrites the program counter with a new address.

Then the program counter advances (or gets overwritten by a jump), and the cycle repeats. That's the entire mechanism. Every abstraction you work in (objects, closures, `async`/`await`, list comprehensions) is a story your language tells you about a much longer sequence of this three-step loop.

### Seeing It Happen

Here's a function too small to hide anything, in each of the languages you're probably writing day to day. The goal is the same in every tab: get past the source code to what actually executes underneath it.

=== ":material-language-python: Python"

    ```python title="add.py" linenums="1"
    def add(a, b):
        return a + b
    ```

    CPython doesn't produce CPU machine code from this at all. It compiles to its own **bytecode**, instructions for the CPython virtual machine, not the hardware. See it directly:

    ```bash title="Disassemble Python Bytecode"
    python3 -m dis add.py
    ```

    ```text title="CPython Bytecode (3.11+)"
      1           RESUME                   0

      2           LOAD_FAST                0 (a)
                  LOAD_FAST                1 (b)
                  BINARY_OP                0 (+)
                  RETURN_VALUE
    ```

    That's a real layer of indirection C never pays: CPython's own C source is what actually executes on the CPU, and *it* interprets these bytecode instructions one at a time on your behalf. This is the same syscall-adjacent overhead theme covered in [Operating System Basics](../efficiency/systems/operating_system_basics.md), here applied to every line of Python written, not just I/O.

=== ":material-language-javascript: JavaScript"

    ```javascript title="add.js" linenums="1"
    function add(a, b) {
        return a + b;
    }
    ```

    Node's V8 engine compiles this to its own bytecode for the Ignition interpreter first, not native machine code:

    ```bash title="Dump V8 Bytecode"
    node --print-bytecode --print-bytecode-filter=add add.js
    ```

    ```text title="V8 Ignition Bytecode (illustrative — exact opcodes vary by V8 version)"
    [generating bytecode for function: add]
      Ldar a1
      Add a0, [0]
      Return
    ```

    If `add` runs often enough, V8's JIT compiler ([covered in depth here](../efficiency/compilers_vs_interpreters.md#jit-compilation-the-best-of-both)) compiles this bytecode to real machine code, skipping the interpreter entirely on later calls.

=== ":material-language-go: Go"

    ```go title="add.go" linenums="1"
    package main

    func add(a, b int) int {
        return a + b
    }
    ```

    Go compiles directly to native machine code, ahead of time. No bytecode, no interpreter, no runtime standing in between:

    ```bash title="Compile and Disassemble"
    go build -gcflags="-N -l" -o add add.go
    go tool objdump -s add add
    ```

    ```text title="Resulting x86-64 Machine Code (illustrative — exact offsets vary by Go version)"
    TEXT main.add(SB)
      MOVQ  AX, "".a+0(SP)
      MOVQ  "".a+0(SP), AX
      ADDQ  "".b+8(SP), AX
      MOVQ  AX, "".~r2+16(SP)
      RET
    ```

    Same destination as C, different toolchain: real x86-64 opcodes, generated by `go build` instead of `gcc`.

=== ":material-language-rust: Rust"

    ```rust title="add.rs" linenums="1"
    pub fn add(a: i32, b: i32) -> i32 {
        a + b
    }
    ```

    Also compiled ahead of time to native machine code, via LLVM:

    ```bash title="Compile and Disassemble"
    rustc -O --crate-type lib add.rs
    objdump -d libadd.so
    ```

    ```text title="Resulting x86-64 Machine Code"
    0000000000001120 <add>:
        1120: 8d 04 37     lea    (%rdi,%rsi,1),%eax
        1123: c3           ret
    ```

    Optimized Rust often compiles *smaller* than the unoptimized C++ in the last tab: `lea` computes the sum as a side effect of an address calculation, one instruction instead of several.

=== ":material-language-java: Java"

    ```java title="Add.java" linenums="1"
    public class Add {
        public static int add(int a, int b) {
            return a + b;
        }
    }
    ```

    Java compiles to JVM bytecode, a different, longer-lived VM target than Python's, designed from the start to be JIT-compiled by HotSpot at runtime:

    ```bash title="Compile and Disassemble"
    javac Add.java
    javap -c Add
    ```

    ```text title="JVM Bytecode"
    public static int add(int, int);
        Code:
           0: iload_0
           1: iload_1
           2: iadd
           3: ireturn
    ```

    `iadd` is a JVM instruction, not an x86-64 one. The JVM's own C++ implementation is what actually executes on the CPU, interpreting this bytecode until HotSpot's JIT decides `add` is hot enough to compile directly.

=== ":material-language-cpp: C++"

    ```cpp title="add.cpp" linenums="1"
    int add(int a, int b) {
        return a + b;
    }
    ```

    Compile it with debug info stripped and no optimization getting cute, then disassemble the result:

    ```bash title="Compile and Disassemble"
    g++ -O0 -c add.cpp -o add.o
    objdump -d add.o
    ```

    ```text title="Resulting x86-64 Machine Code"
    0000000000000000 <add(int, int)>:
       0:   55                      push   %rbp
       1:   48 89 e5                mov    %rsp,%rbp
       4:   89 7d fc                mov    %edi,-0x4(%rbp)
       7:   89 75 f8                mov    %esi,-0x8(%rbp)
       a:   8b 55 fc                mov    -0x4(%rbp),%edx
       d:   8b 45 f8                mov    -0x8(%rbp),%eax
      10:   01 d0                   add    %edx,%eax
      12:   5d                      pop    %rbp
      13:   c3                      ret
    ```

    Fourteen instructions to add two numbers and return. `a + b` in your source isn't one operation to the hardware. It's "load `a` into a register, load `b` into a register, add them, put the result somewhere the caller can find it." The hex bytes on the left (`55`, `48 89 e5`, ...) are the literal opcodes: the numbers the fetch step reads directly out of memory. `objdump` is just translating them into names a human can read; the CPU never sees `mov` or `add`, only `48 89 e5`.

Six languages, three real tiers underneath them: none of them skip the cycle from the previous section, some just pay for an extra layer of it. [Compilers vs. Interpreters](../efficiency/compilers_vs_interpreters.md#summary-table) covers exactly where that extra layer comes from and what it costs.

## Why This Matters for Production Code

- **"CPU-bound" has a literal meaning.** When a profiler says your service is CPU-bound, it means the fetch-decode-execute loop is the bottleneck, not I/O wait. Optimizing means reducing the *number of instructions* on the hot path, or making each one cheaper (better cache locality, fewer branches the CPU predicts wrong).
- **Interpreter overhead is real overhead.** A Python interpreter is a C program running its own fetch-decode-execute-shaped loop *on top of* the hardware's: for every bytecode instruction in your `.pyc`, it fetches, decodes, and executes a chunk of C that then does the real work. That's an extra layer of indirection your compiled Go service doesn't pay for, and it's the actual mechanism behind "Python is slower than Go," not a vague reputation.
- **"Compiled for the wrong architecture" is a same-day production incident.** A binary built for x86-64 contains x86-64 opcodes. An ARM64 CPU's decode stage doesn't recognize them. It's not slow, it's meaningless. This is why multi-arch container images exist, and why "works on my Intel Mac, crashes on the M-series build server" is a machine-code problem wearing a Docker costume.
- **Branch-heavy code has a real, measurable cost.** Modern CPUs guess which way an `if` will go before they know, so they can keep the pipeline full: a wrong guess means throwing away work. This is why "the fast path should be the common path" is engineering advice with a mechanism behind it, not superstition.

## Technical Interview Context

- **"Why is Python slower than C for CPU-bound work?":** the honest answer isn't "Python is interpreted" as a fact to recite; it's that CPython's bytecode interpreter is itself a compiled C program executing its own fetch-decode-execute loop for every one of your bytecode instructions, adding a full layer of indirection C code skipped entirely.
- **"What does 'undefined behavior' actually mean in C?":** often, it means the compiler generated a machine instruction sequence that assumed something about your program (like signed integer overflow never happening) that turned out to be false, and there's no fetch-decode-execute step that checks for it. The hardware does exactly what the instructions say, even when the instructions encode a mistake.

## Practice Problems

??? question "Practice Problem 1: The Missing Instruction"

    Looking at the C++ tab's disassembly, why are there instructions to save `%rbp` (`push %rbp` / `mov %rsp,%rbp`) that have nothing to do with adding two numbers?

    ??? tip "Solution"
        Those instructions set up a **stack frame**: bookkeeping so the function can find its own local variables and arguments, and so the caller's stack frame is preserved and restorable when this function returns. It's the machine-code reality behind every function call you've ever made; the calling convention has to be built out of the same `mov`/`push`/`call`/`ret` vocabulary as everything else. [The Stack, the Heap, and Virtual Memory](stack_heap_virtual_memory.md) covers what that stack actually is.

??? question "Practice Problem 2: Same Source, Different Machine Code"

    If you compiled `add.cpp` with optimizations on (`g++ -O2` instead of `-O0`), the resulting instructions would very likely be *fewer and different*, possibly the same single `lea` trick the Rust tab already shows, with no stack frame at all. Why does the source code staying identical not mean the machine code stays identical?

    ??? tip "Solution"
        The compiler isn't a translator that maps each line to a fixed instruction sequence. It's free to produce *any* instruction sequence that has the same observable behavior. `-O0` prioritizes fast, predictable compilation and easy debugging (each line maps close to 1:1 with generated code); `-O2` is allowed to eliminate the stack frame entirely, keep values in registers instead of memory, and inline the whole function at its call site. Same contract, wildly different machine code: exactly why disassembly, not source code, is the ground truth for "what will actually run."

## Key Takeaways

| Concept | What It Means |
|---|---|
| **Machine code** | The only language a CPU executes: a sequence of numeric opcodes, nothing more |
| **Instruction set architecture (ISA)** | The specific vocabulary of opcodes a CPU family understands: [x86-64, ARM64, and RISC-V](../efficiency/systems/x86_arm_risc.md) are genuinely different, not just different names |
| **Register** | A tiny, extremely fast storage slot built into the CPU itself: where active work happens |
| **Fetch-decode-execute** | The three-step loop, repeated billions of times a second, that is the entire mechanism of "running a program" |
| **Program counter** | The register that always points at the next instruction to fetch |
| **CPU-bound** | The fetch-decode-execute loop itself is the bottleneck, not waiting on I/O |

Everything you write eventually becomes this: a long list of opcodes and a CPU that has no idea, and no need to know, whether they came from Python, Rust, or a Makefile. The next layer up the stack, the operating system deciding *when* your instructions get to run at all, is where that indifference starts to matter operationally.

## What's Next

This article started from machine code and never explained how your source code actually became those instructions. That translation step (compiling or interpreting) is its own subject. **[Compilers vs. Interpreters](../efficiency/compilers_vs_interpreters.md)** covers it in full.

---

## Further Reading

### Related Reading

- **[Compilers vs. Interpreters](../efficiency/compilers_vs_interpreters.md):** how your code becomes the machine code covered here.
- **[The Stack, the Heap, and Virtual Memory](stack_heap_virtual_memory.md):** what the "memory" in `mov -0x4(%rbp)` actually refers to.
- **[Recursion](recursion.md):** the call stack, from the language's-eye view.

### External Resources

- [Compiler Explorer (Godbolt)](https://godbolt.org/): paste code in any of a dozen languages, see the real generated assembly, live, for free.
- [Agner Fog's Optimization Manuals](https://www.agner.org/optimize/): the canonical deep reference on what CPUs actually do with instructions, for when "why is this loop slow" needs a real answer.
