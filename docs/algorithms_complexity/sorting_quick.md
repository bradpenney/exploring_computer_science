# Sorting: Quick Sort

Merge Sort is excellent, but it requires a lot of extra memory ($O(N)$) to stitch lists back together. Can we achieve the same $O(N \log N)$ speed without the memory cost?

Enter **Quick Sort**.

Quick Sort is another "Divide and Conquer" algorithm, but it flips the logic of Merge Sort. Instead of doing the hard work (merging) *after* the recursive calls, Quick Sort does the hard work (partitioning) *before* the recursive calls.

## The Strategy: Partitioning

The heart of Quick Sort is the **Partition** operation.

1.  **Pick a Pivot:** Choose one element from the list (e.g., the last item). This value becomes our reference point.
2.  **Reorder:** Shuffle the array so that:
    -   All numbers **smaller** than the Pivot move to its **Left**.
    -   All numbers **larger** than the Pivot move to its **Right**.
3.  **Place Pivot:** Put the Pivot in its final, correct position between the two groups.

At this point, the Pivot is "sorted." It will never move again.

### Visual Example: `[5, 2, 9, 1, 3]`

Let's pick the last element, **`3`**, as the **Pivot**.

1.  Compare `5` vs `3`: Bigger. Stay.
2.  Compare `2` vs `3`: Smaller. Swap to front. `[2, 5, 9, 1, 3]`
3.  Compare `9` vs `3`: Bigger. Stay.
4.  Compare `1` vs `3`: Smaller. Swap to front. `[2, 1, 9, 5, 3]`
5.  **Place Pivot:** Swap `3` into the middle (between small and big). `[2, 1, 3, 5, 9]`

Now `3` is in its final home. We recursively apply the same logic to the left sub-list `[2, 1]` and the right sub-list `[5, 9]`.

## Complexity Analysis

### Time Complexity
-   **Average Case: $O(N \log N)$**
    If the Pivot divides the list roughly in half every time, we get the same efficient tree structure as Merge Sort.
-   **Worst Case: $O(N^2)$**
    If you get unlucky and pick the **smallest** or **largest** item as the Pivot every single time (e.g., trying to sort a list that is already sorted), the "Divide" step doesn't divide anything. You just peel off one item at a time. This degrades to Bubble Sort performance.

### Space Complexity
-   **Space: $O(\log N)$**
    Quick Sort sorts **In-Place**. It doesn't need to create new arrays. However, it does use stack space for the recursion (about $\log N$ stack frames). This is significantly better than Merge Sort's $O(N)$ memory requirement.

## The Pivot Problem

Since the speed depends heavily on picking a "good" pivot (one that is near the median value), optimizations often focus on pivot selection:
-   **Random Pivot:** Pick a random index.
-   **Median-of-Three:** Look at the first, middle, and last item, and pick the median of those three.

## Quick Sort vs. Merge Sort

| Feature | Quick Sort | Merge Sort |
| :--- | :--- | :--- |
| **Speed** | Usually faster (better cache locality). | Consistent $O(N \log N)$. |
| **Memory** | Low ($O(\log N)$ stack). | High ($O(N)$ array). |
| **Worst Case** | $O(N^2)$ (Can be mitigated). | $O(N \log N)$ (Guaranteed). |
| **Stability** | **Unstable** (Swaps scramble order). | **Stable** (Preserves order). |

## Practice Problems

??? question "Practice Problem 1: The Partition"

    Given the list `[10, 80, 30, 90, 40, 50, 70]`, and choosing the last element (`70`) as the Pivot, which numbers will end up to the LEFT of 70 after the partition step?

    ??? tip "Solution"
        Any number **less than 70**.
        
        Left Side: `10, 30, 40, 50`
        Pivot: `70`
        Right Side: `80, 90`

??? question "Practice Problem 2: Worst Case Scenario"

    You implement a basic Quick Sort that always picks the **first element** as the pivot. You run it on the list `[1, 2, 3, 4, 5]`. What is the Time Complexity?

    ??? tip "Solution"
        **$O(N^2)$.**
        
        Because the list is already sorted, picking the first element (`1`) means everything else is "greater". You partition into an empty left side and a massive right side. Then you pick `2`, and do the same. You never divide the problem in half; you just reduce it by 1 each time.

## Key Takeaways

| Feature | Details |
| :--- | :--- |
| **Strategy** | Partition around a Pivot. |
| **Speed** | $O(N \log N)$ (Average). |
| **Memory** | Efficient (In-Place). |
| **Weakness** | Bad Pivots lead to $O(N^2)$ slowness. |

---

Quick Sort is the gambler of sorting algorithms. It takes a risk (picking a pivot) that usually pays off with incredible speed, but occasionally busts. Despite the risk, its low memory footprint and high performance on real hardware make it the industry standard for general-purpose sorting.
