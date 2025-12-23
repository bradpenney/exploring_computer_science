# Queues and Deques

If a [Stack](abstract_data_types_and_stack.md) is a "Last-In, First-Out" (LIFO) structure (like a pile of plates), a **Queue** is the exact opposite.

A Queue is a **First-In, First-Out (FIFO)** data structure. Think of it like a line at a grocery store: the first person to get in line is the first person to be served.

## 1. The Queue (FIFO)

A Queue has two main operations:
1.  **Enqueue:** Add an item to the **Back** of the line.
2.  **Dequeue:** Remove an item from the **Front** of the line.

**Analogy:** A tunnel. You drive in one end and come out the other. You can't pass the cars in front of you.

### Real-World Use Cases:
-   **Print Queues:** The first document you send to the printer is the first one printed.
-   **Web Servers:** When thousands of people visit a site at once, the server puts them in a queue and processes requests one by one.
-   **Task Scheduling:** Your CPU uses a queue to decide which process to run next.

---

## 2. The Deque (Double-Ended Queue)

A **Deque** (pronounced "Deck") is a more flexible version of a queue. It stands for **D**ouble-**E**nded **Que**ue.

In a Deque, you can add or remove items from **both the front and the back**.

**Analogy:** A deck of cards. You can deal a card from the top or pull one from the bottom (if you're cheating!).

### Operations:
-   `addFront()` / `addBack()`
-   `removeFront()` / `removeBack()`

---

## Queue vs. Stack

| Feature | Queue | Stack |
| :--- | :--- | :--- |
| **Order** | FIFO (First-In, First-Out). | LIFO (Last-In, First-Out). |
| **Insert at** | Back. | Top. |
| **Remove from** | Front. | Top. |
| **Analogy** | Waiting Line. | Pile of Plates. |

## Practice Problems

??? question "Practice Problem 1: Operation Order"

    Starting with an empty Queue, perform these operations:
    1. Enqueue(A)
    2. Enqueue(B)
    3. Dequeue()
    4. Enqueue(C)
    
    What is the next item to be Dequeued?

    ??? tip "Solution"
        **B.**
        
        1. `[A]`
        2. `[A, B]`
        3. Dequeue `A` -> `[B]`
        4. `[B, C]`
        
        The next item at the front is **B**.

??? question "Practice Problem 2: Stack as Deque"

    Can you use a Deque as if it were a Stack? How?

    ??? tip "Solution"
        **Yes.** 
        
        A Stack only adds and removes from the same end. To use a Deque as a Stack, simply limit yourself to using only `addBack()` and `removeBack()`. A Deque is a "Super-set" of both Queues and Stacks.

## Key Takeaways

-   **Queues** ensure fairness by processing items in the order they arrived.
-   **Deques** provide maximum flexibility for adding/removing from either end.
-   Both structures are essential for managing **buffers** and **asynchronous tasks**.

---

The Queue is the guardian of order. It prevents chaos by ensuring that every task, every packet, and every user gets their turn in the sequence they arrived.
