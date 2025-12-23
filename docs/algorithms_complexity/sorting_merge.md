# Sorting: Merge Sort

Elementary sorts like Bubble Sort work by comparing every item against every other item, leading to slow $O(N^2)$ performance. To sort millions of items, we need a smarter approach. We need to stop comparing and start dividing.

**Merge Sort** is a classic "Divide and Conquer" algorithm. It follows a simple philosophy: **It is easier to combine two small, sorted lists than it is to sort one giant, messy list.**

## The Concept

Merge Sort works in two phases:
1.  **Divide (Split):** Recursively cut the list in half until you have $N$ lists, each containing just **one** item. (A list of one item is, by definition, sorted!)
2.  **Conquer (Merge):** Take pairs of these small sorted lists and merge them together into larger sorted lists. Repeat until you have one giant sorted list.

## The Algorithm

### Phase 1: The Recursive Split
Imagine trying to sort `[38, 27, 43, 3]`.

1.  Split into `[38, 27]` and `[43, 3]`.
2.  Split again into `[38]`, `[27]`, `[43]`, `[3]`.
    -   Now we have 4 lists. Each has 1 item. Each is sorted.

### Phase 2: The Merge
Now we "zip" them back together.

1.  Merge `[38]` and `[27]`.
    -   Compare 38 vs 27. Take 27. Then take 38.
    -   Result: `[27, 38]`
2.  Merge `[43]` and `[3]`.
    -   Compare 43 vs 3. Take 3. Then take 43.
    -   Result: `[3, 43]`
3.  **Final Merge:** Merge `[27, 38]` and `[3, 43]`.
    -   Compare 27 vs 3. Take 3.
    -   Compare 27 vs 43. Take 27.
    -   Compare 38 vs 43. Take 38.
    -   Take 43.
    -   **Final Result:** `[3, 27, 38, 43]`

## Why Is It Faster? ($O(N \\\log N)$)

The speed comes from the structure of the recursion tree.

-   **Height of the Tree ($\\\log N$):** Because we divide the list in half every time, the number of "levels" is $\\\log_2 N$. (For 8 items, 3 levels. For 1,000,000 items, only 20 levels).
-   **Work per Level ($N$):** At each level, we iterate through all $N$ items to merge them.

So, the total work is: **Height ($\\\log N$) × Width ($N$) = $O(N \\\log N)$**.

This is massively faster than $O(N^2)$. For 1 million items:
-   **Bubble Sort:** $1,000,000^2 = 1,000,000,000,000$ operations.
-   **Merge Sort:** $1,000,000 \\times 20 = 20,000,000$ operations.
Merge Sort is 50,000 times faster.

## The Trade-off: Space Complexity

There is no free lunch. Merge Sort is fast, but it is **not In-Place**.

To merge two lists, you typically need to create a **temporary array** to hold the sorted result before copying it back. If you are sorting 1GB of data, Merge Sort needs another 1GB of RAM to hold these temporary arrays.

-   **Time Complexity:** $O(N \\\log N)$ (Always - Best, Average, and Worst).
-   **Space Complexity:** $O(N)$ (Auxiliary).

## Practice Problems

??? question "Practice Problem 1: The Split Depth"

    If you run Merge Sort on a list of 16 items, how many times will you split the list before you start merging?

    ??? tip "Solution"
        **4 times.**
        
        $16 \\rightarrow 8 \\rightarrow 4 \\rightarrow 2 \\rightarrow 1$.
        This corresponds to $\\\log_2(16) = 4$.

??? question "Practice Problem 2: Stability"

    Merge Sort is a **Stable** sort (it preserves the original order of equal elements). Why is this true during the merge step?

    ??? tip "Solution"
        When merging two sub-lists (Left and Right), if we encounter equal values (e.g., `5` in Left and `5` in Right), the algorithm is designed to pick the value from the **Left** list first. This ensures that the item that appeared earlier in the original list stays earlier in the sorted list.

## Key Takeaways

| Feature | Details |
| :--- | :--- |
| **Strategy** | Divide and Conquer. |
| **Speed** | $O(N \\\log N)$ (Very Fast). |
| **Consistency** | Performs reliably on all data (Worst Case is same as Best Case). |
| **Downside** | Requires $O(N)$ extra memory (Space). |

---

Merge Sort teaches us that structure matters. By organizing our data flow into a tree structure, we bypass the limitations of brute-force comparison. It is the workhorse algorithm for sorting Linked Lists and large external datasets that don't fit in RAM.
