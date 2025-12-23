# Linked Lists

Imagine you are on a scavenger hunt. You find a clue in the park. That clue doesn't contain the prize; it contains a piece of paper that says, "The next clue is in the bakery." You go to the bakery and find another clue pointing to the library.

This is exactly how a **Linked List** works. It is a collection of items that are not stored in a neat row (like an array), but are scattered across your computer's memory, connected by **Pointers**.

## 1. Anatomy: Nodes and Pointers

A Linked List consists of a series of **Nodes**. Each node has two parts:
1.  **Data:** The value you want to store (e.g., a number or a string).
2.  **Next Pointer:** A reference (the memory address) to the *next* node in the list.

The list starts at the **Head** and ends with a **Null** pointer (pointing to nothing).

## 2. Linked Lists vs. Arrays

Why not just use an array? 

### The Array Problem
An array is a contiguous block of memory. To add an item to the middle of an array, you have to move every single item after it over to make room. This is slow ($O(N)$).

### The Linked List Solution
In a Linked List, to add an item, you just change two pointers. You tell the new node to point to the next person, and the previous person to point to the new node. You don't have to move anything. This is very fast ($O(1)$).

| Feature | Array | Linked List |
| :--- | :--- | :--- |
| **Storage** | Contiguous (Fixed block). | Scattered (Nodes). |
| **Lookup** | $O(1)$ (Fast - jump to index). | $O(N)$ (Slow - walk the clues). |
| **Insert/Delete** | $O(N)$ (Slow - shifting). | $O(1)$ (Fast - pointers). |
| **Size** | Hard to change. | Dynamic (Grows/Shrinks). |

## 3. Types of Linked Lists

-   **Singly Linked:** Each node points only to the *next* one. (One-way street).
-   **Doubly Linked:** Each node points to both the *next* and the *previous* one. (Two-way street). This allows you to walk backwards.
-   **Circular Linked:** The last node points back to the head. (A loop).

## Real-World Use Case: Music Playlist

A music playlist is a perfect Linked List. 
-   You are listening to a song (**Node**).
-   When it ends, the player looks at the **Next Pointer** to find the next song.
-   If you want to add a song to the middle of the list, the computer doesn't need to re-index your whole library; it just changes where the "Next" buttons point.

## Practice Problems

??? question "Practice Problem 1: Searching"

    If you want to find the 100th item in a Linked List, do you have to look at items 1 through 99 first?

    ??? tip "Solution"
        **Yes.** 
        
        Unlike an array, where you can jump straight to `index[99]`, a Linked List requires you to start at the head and follow the pointers one by one. This is why lookups are $O(N)$.

??? question "Practice Problem 2: Memory Cost"

    Which uses more memory: an Array of 10 integers or a Linked List of 10 integers?

    ??? tip "Solution"
        **Linked List.**
        
        Each node in a Linked List must store the integer **plus** the memory address of the next node (the pointer). An array only stores the integers themselves.

## Key Takeaways

-   **Linked Lists** use pointers to connect nodes scattered in memory.
-   They are excellent for **dynamic data** that changes size frequently.
-   They are poor for **random access** (finding a specific index).

---

The Linked List is the ultimate example of how we use **Pointers** to manage memory. It frees us from the rigid boundaries of the array, allowing our data structures to grow and evolve as fluidly as the information they represent.
