# Sorting: Elementary Sorts

Sorting is one of the oldest and most fundamental problems in computer science. How do you take a chaotic list of numbers and arrange them perfectly from smallest to largest?

Before we get to the lightning-fast algorithms that power modern databases, we must look at the **Elementary Sorts**. These algorithms are intuitive and easy to write, but they are also slow ($O(N^2)$). They are the "learning wheels" of algorithm design.

## 1. Bubble Sort

Bubble Sort gets its name because larger elements "bubble" to the top (end) of the list with each pass.

### The Algorithm
1.  Compare the first item with the second item.
2.  If the first is greater than the second, **swap** them.
3.  Move to the next pair (2nd and 3rd) and repeat until the end of the list.
4.  At this point, the largest item is guaranteed to be at the very end.
5.  Repeat the process for the remaining unsorted items (ignoring the end).

### Visual Example: `[5, 1, 4, 2]`

**Pass 1:**
-   `[5, 1]`: Swap -> `[1, 5, 4, 2]`
-   `[5, 4]`: Swap -> `[1, 4, 5, 2]`
-   `[5, 2]`: Swap -> `[1, 4, 2, 5]`
*(Notice 5 has bubbled to the end)*

**Pass 2:**
-   `[1, 4]`: Correct -> `[1, 4, 2, 5]`
-   `[4, 2]`: Swap -> `[1, 2, 4, 5]`
*(Notice 4 is now in place)*

**Pass 3:**
-   `[1, 2]`: Correct -> `[1, 2, 4, 5]`
*(List is sorted)*

### The Complexity: $O(N^2)$
In the worst case (a reverse-ordered list), we have to make roughly $N^2$ comparisons. It's fine for 10 items, but terrible for 10,000.

---

## 2. Selection Sort

Selection Sort works by dividing the list into two parts: the **sorted part** at the beginning and the **unsorted part** at the end. It repeatedly selects the *smallest* remaining item and moves it to the sorted part.

### The Algorithm
1.  Scan the entire unsorted list to find the **minimum** value.
2.  **Swap** that minimum value with the first unsorted item.
3.  Advance the "sorted" boundary by one.
4.  Repeat.

### Visual Example: `[5, 1, 4, 2]`

**Pass 1:**
-   Sorted: `[]`, Unsorted: `[5, 1, 4, 2]`
-   Find Min in unsorted: `1`
-   Swap `1` with first item (`5`): `[1, 5, 4, 2]`

**Pass 2:**
-   Sorted: `[1]`, Unsorted: `[5, 4, 2]`
-   Find Min in unsorted: `2`
-   Swap `2` with first unsorted (`5`): `[1, 2, 4, 5]`

**Pass 3:**
-   Sorted: `[1, 2]`, Unsorted: `[4, 5]`
-   Find Min in unsorted: `4`
-   Swap `4` with itself (it's already first): `[1, 2, 4, 5]`

### The Complexity: $O(N^2)$
Even though Selection Sort usually performs fewer *swaps* than Bubble Sort, it still requires scanning the remaining list over and over again, resulting in $N^2$ comparisons.

---

## Why Learn These?

If these are slow, why bother?

1.  **Simplicity:** They are very easy to implement (3-5 lines of code).
2.  **Memory:** They are **In-Place** algorithms, meaning they require $O(1)$ Auxiliary Space. You don't need to create a second list.
3.  **Specific Cases:**
    -   **Bubble Sort** is actually very fast ($O(N)$) if the list is *already* almost sorted (it can detect this and stop early).
    -   **Selection Sort** minimizes the number of writes/swaps, which can be useful if writing to memory is expensive (like writing to Flash storage).

## Practice Problems

??? question "Practice Problem 1: Bubble Sort Steps"

    Perform the first full pass of Bubble Sort on this list: `[3, 2, 5, 1]`.

    ??? tip "Solution"
        1. Compare `3, 2`: Swap -> `[2, 3, 5, 1]`
        2. Compare `3, 5`: Keep -> `[2, 3, 5, 1]`
        3. Compare `5, 1`: Swap -> `[2, 3, 1, 5]`
        
        **Result:** `[2, 3, 1, 5]` (5 has bubbled to the end).

??? question "Practice Problem 2: Selection Sort Choice"

    You have a list of numbers where swapping items is extremely costly (takes a long time), but comparing them is fast. Would you prefer Bubble Sort or Selection Sort?

    ??? tip "Solution"
        **Selection Sort.**
        
        Selection Sort only swaps **once** per pass (after finding the minimum). Bubble Sort might swap many, many times per pass as items bubble up. Selection Sort minimizes the number of writes.

## Key Takeaways

| Algorithm | Best Case | Worst Case | Main Feature |
| :--- | :--- | :--- | :--- |
| **Bubble Sort** | $O(N)$ (Already sorted) | $O(N^2)$ | Bubbles largest to end. Simple. |
| **Selection Sort** | $O(N^2)$ | $O(N^2)$ | Selects smallest to start. Minimizes swaps. |

---

These elementary sorts teach us the basics of iteration and swapping. But for real-world data, we need something smarter—something that doesn't just scan, but divides. That leads us to **Efficient Sorts**.
