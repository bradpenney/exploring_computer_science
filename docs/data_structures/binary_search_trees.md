# Binary Search Trees (BST)

We know that [Binary Search](../algorithms_complexity/searching_linear_vs_binary.md) is incredibly fast ($O(\log N)$), but it requires a sorted list. What if you need to frequently add or remove items? Sorting a whole list every time you add one number is slow ($O(N)$).

A **Binary Search Tree** is a data structure that keeps itself sorted while allowing for fast additions, removals, and lookups.

## The Rule

A Binary Search Tree is a [Binary Tree](../building_blocks/binary_trees_and_representation.md) that follows one strict rule for every node:

1.  All values in the **Left Subtree** must be **Smaller** than the node's value.
2.  All values in the **Right Subtree** must be **Larger** than the node's value.

### Example:
If the root is **50**:
-   The left child could be **30**.
-   The right child could be **70**.
-   The left child of 30 could be **20** (smaller than 30 and 50).
-   The right child of 30 could be **40** (larger than 30, but still smaller than 50).

## Operations

### 1. Searching: $O(\log N)$
Searching a BST is just like playing "High-Low."
-   Looking for **40**? 
-   Compare to Root (50). 40 < 50, go **Left**.
-   Compare to 30. 40 > 30, go **Right**.
-   Found it!

Because we eliminate half the tree with every step, we find our target in logarithmic time.

### 2. Insertion: $O(\log N)$
To add a new number, you simply "search" for it. When you hit a blank spot (a null leaf), that’s where the new number belongs!

## The Weakness: Unbalanced Trees

The speed of a BST depends entirely on the **height** of the tree.

-   If you add numbers in a random order, the tree stays "bushy" and balanced. Height is $\log N$.
-   **The Problem:** If you add numbers in order (e.g., `10, 20, 30, 40`), the tree grows in a straight line to the right. 

This is called a **Degenerate Tree** (or a "Stick"). It effectively becomes a [Linked List](linked_lists.md), and your performance crashes from $O(\log N)$ to $O(N)$.

To fix this, computer scientists use "Self-Balancing Trees" (like AVL trees or Red-Black trees) that automatically shuffle themselves to stay bushy.

## Practice Problems

??? question "Practice Problem 1: Validating a BST"

    Is this a valid Binary Search Tree?
    Root: 10
    Left: 5
    Right: 15
    Left child of 15: 8

    ??? tip "Solution"
        **No.**
        
        While 8 is smaller than 15 (valid for the Right subtree's local rule), 8 is **not** larger than the root (10). In a BST, every node in the right subtree must be larger than the root. The value 8 belongs in the left subtree of 10.

??? question "Practice Problem 2: Lookup Speed"

    If a balanced BST has 1,000 items, roughly how many comparisons are needed to find a specific item?

    ??? tip "Solution"
        **About 10 comparisons.**
        
        $\log_2(1000) \approx 10$. This is the power of the tree structure.

## Key Takeaways

| Feature | Details |
| :--- | :--- |
| **Logic** | Left < Parent < Right. |
| **Search Speed** | $O(\log N)$ (Average). |
| **Insert Speed** | $O(\log N)$ (Average). |
| **Risk** | Can become $O(N)$ if unbalanced. |

---

The Binary Search Tree is the most common way to implement a **Dictionary** or **Set** in many programming languages. It combines the speed of binary search with the flexibility of dynamic memory, making it one of the most versatile tools in your kit.
