# Processes and Threads

Right now, you probably have a browser, a music player, a code editor, and a terminal open. It feels like your computer is doing all of them at once.

Unless you have a 64-core supercomputer, this is mostly an illusion. The CPU switches between tasks so quickly (thousands of times per second) that it *looks* like they are simultaneous. This magic is managed by **Processes** and **Threads**.

## 1. The Process

A **Process** is a program in execution. 

When you double-click an icon, the OS creates a process. It gives that process:
-   **Memory Space:** A private chunk of RAM that no other process can touch.
-   **Resources:** Open files, network connections, etc.
-   **Security Context:** Which user owns this process?

**Key Feature:** Processes are **Isolated**. If one process crashes, it doesn't kill the others. If Chrome crashes, Spotify keeps playing.

## 2. The Thread

A **Thread** is a "lightweight process" that lives *inside* a process.

A single process can have multiple threads.
-   **Thread 1:** Render the User Interface.
-   **Thread 2:** Download a file in the background.
-   **Thread 3:** Save data to disk.

**Key Feature:** Threads **Share Memory**. All threads in a process can see the same variables. This makes communication fast, but dangerous (Race Conditions).

## Context Switching

How does the OS multitask? It uses **Context Switching**.

1.  **Stop:** The CPU pauses Process A.
2.  **Save:** It saves the "State" of Process A (Variable values, program counter) to RAM.
3.  **Load:** It loads the saved "State" of Process B.
4.  **Go:** The CPU starts running Process B.

This happens in microseconds. However, it isn't free. If you switch too often, the CPU spends more time switching than working (this is called "Thrashing").

## Concurrency vs. Parallelism

-   **Concurrency:** Dealing with multiple things at once. (e.g., A single chef chopping onions, then stirring the pot, then checking the oven).
-   **Parallelism:** Doing multiple things at the same time. (e.g., Three chefs in the kitchen, one chopping, one stirring, one checking).

-   **Single Core CPU:** Can do Concurrency (via Context Switching), but not true Parallelism.
-   **Multi-Core CPU:** Can do true Parallelism (Core 1 runs Chrome, Core 2 runs Spotify).

## Practice Problems

??? question "Practice Problem 1: Crash Impact"

    -   **Scenario A:** A Thread in your browser crashes.
    -   **Scenario B:** A Process (a tab) in your browser crashes.
    
    Which scenario is worse for the whole browser application?

    ??? tip "Solution"
        **Scenario A is usually worse.**
        
        Since threads share memory, a crash in one thread (like accessing bad memory) often corrupts the entire process, causing the whole browser to close.
        
        Modern browsers (like Chrome) actually use a **Multi-Process Architecture**, where every tab is a separate *Process*. If one tab crashes, the others survive.

??? question "Practice Problem 2: Resource Cost"

    Which is "cheaper" to create: a new Process or a new Thread?

    ??? tip "Solution"
        **A new Thread.**
        
        Creating a process requires allocating a whole new memory map and OS resources. Creating a thread just requires a small stack and registers within the existing memory.

## Key Takeaways

| Feature | Process | Thread |
| :--- | :--- | :--- |
| **Analogy** | A House. | The People living in the house. |
| **Memory** | Private / Isolated. | Shared (Risky). |
| **Creation Cost** | High (Heavyweight). | Low (Lightweight). |
| **Communication** | Slow (IPC). | Fast (Shared Variables). |

---

Processes give us stability and isolation. Threads give us speed and responsiveness. Modern software architecture is the art of balancing these two tools to create systems that are both robust and fast.
