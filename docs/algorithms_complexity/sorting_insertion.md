# Sorting: Insertion Sort

If you’ve ever been dealt a hand of playing cards and arranged them from lowest to highest, you’ve likely used **Insertion Sort** without knowing it.

You pick up one card at a time. You look at the cards already in your hand, find the correct spot for the new card, and slide it in. Everything to the right of that spot shifts over to make room. This simple, intuitive process is exactly how the algorithm works.

## The Mechanism

Insertion Sort divides the list into a **sorted** part (on the left) and an **unsorted** part (on the right). 

1.  Start with the second item in the list (the first item is "sorted" by itself).
2.  Compare this "current" item with the items to its left.
3.  Shift the sorted items to the right until you find the correct position for the current item.
4.  **Insert** the item.
5.  Repeat for the next unsorted item.

### Visual Example: `[5, 2, 4, 1]`

**Step 1:** `[5 | 2, 4, 1]` (5 is the sorted part)
-   Current item is `2`.
-   Is 2 < 5? Yes. Shift 5 to the right.
-   Insert 2: `[2, 5 | 4, 1]`

**Step 2:** `[2, 5 | 4, 1]`
-   Current item is `4`.
-   Is 4 < 5? Yes. Shift 5 to the right.
-   Is 4 < 2? No. 
-   Insert 4: `[2, 4, 5 | 1]`

**Step 3:** `[2, 4, 5 | 1]`
-   Current item is `1`.
-   Compare with 5, 4, and 2. Shift them all to the right.
-   Insert 1: `[1, 2, 4, 5]`
*(List is sorted)*

---

## Complexity Analysis

### Time Complexity
-   **Worst Case: $O(N^2)$** 
    If the list is in reverse order, every item has to be compared and shifted across the entire sorted part.
-   **Best Case: $O(N)$**
    If the list is **already sorted**, the algorithm only makes one comparison per item and never shifts anything. This makes it incredibly efficient for "nearly sorted" data.

### Space Complexity
-   **Auxiliary Space: $O(1)$**
    Like Bubble and Selection sort, it is an **In-Place** algorithm. It only needs one extra variable to hold the "current" item being moved.

---

## Insertion Sort vs. The Others

Why use Insertion Sort when we have Bubble or Selection sort?

1.  **Stability:** It is a **Stable** sort. If you have two items with the same value (e.g., two "7" cards), their relative order won't change. This is important when sorting complex objects (like sorting a list of students by grade, then by name).
2.  **Online Processing:** It can sort a list as it receives it. You can keep adding new items to a sorted list and Insertion Sort will efficiently place them.
3.  **Performance on Small Data:** For very small lists (typically 10-20 items), Insertion Sort is often faster than even the high-speed algorithms like Merge Sort because it has very low overhead.

## Practice Problems

??? question "Practice Problem 1: Insertion Sort Pass"

    Given the list `[8, 10, 3, 5]`, show the state of the list after the item `3` has been inserted into its correct position.

    ??? tip "Solution"
        1. Start: `[8, 10, 3, 5]`
        2. Sorted part is `[8, 10]`. Next item is `3`.
        3. 3 < 10 (Shift), 3 < 8 (Shift).
        4. Result: **`[3, 8, 10, 5]`**

??? question "Practice Problem 2: When to Choose Insertion Sort"

    You are receiving a stream of sensor data, one number every 5 seconds. You want to keep a running "Top 10" list of the highest values seen so far. Which sort is best for inserting the new value into the existing list?

    ??? tip "Solution"
        **Insertion Sort.**
        
        Since you are adding one item at a time to an already sorted list, Insertion Sort only takes a few comparisons to find the spot and shift the others. This is its "Best Case" ($O(N)$) scenario.

## Key Takeaways

| Feature | Details |
| :--- | :--- |
| **Logic** | Insert the next item into its correct spot in the sorted sub-list. |
| **Best Case** | $O(N)$ (Already sorted). |
| **Worst Case** | $O(N^2)$ (Reverse sorted). |
| **Space** | $O(1)$ (In-place). |
| **Use Case** | Small datasets or nearly sorted data. |

---

Insertion Sort is the bridge between human intuition and algorithmic efficiency. It’s the "practical" elementary sort—the one you'll actually see used in production inside more complex "Hybrid" sorting algorithms (like Timsort, which is used in Python and Java).
