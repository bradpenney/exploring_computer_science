# Searching: Linear vs. Binary

Whether you are looking for a specific email in your inbox, a name in a contact list, or a value in a database, you are performing a **search**. 

In computer science, searching is one of the most common tasks a computer performs. However, the way you organize your data determines whether that search takes a fraction of a second or several minutes.

## 1. Linear Search: The Simple Scan

**Linear Search** is the most basic search algorithm. It starts at the beginning of a collection and checks every single item, one by one, until it finds what it’s looking for or reaches the end.

### How it works:
1.  Start at the first item.
2.  Is this the item? 
    - If yes, stop.
    - If no, move to the next item.
3.  Repeat until found or list ends.

### The Complexity: $O(N)$
In the worst-case scenario (the item is at the very end or not there at all), you have to look at all $N$ items. If the list doubles in size, the search takes twice as long.

### When to use it:
-   When the data is **unsorted**.
-   When the list is very small.
-   When you don't care about performance.

---

## 2. Binary Search: Divide and Conquer

**Binary Search** is a much faster algorithm, but it comes with a strict requirement: **The data must be sorted.**

If you are looking for a name in a phone book, you don't start at page 1. You open to the middle. If the name you want comes "after" the middle page alphabetically, you know for a fact that the name is not in the first half. You just eliminated 500,000 pages in a single step.

### How it works:
1.  Find the **middle** element of the sorted list.
2.  Is this the item? If yes, stop.
3.  Is the item **smaller** than the middle?
    - If yes, throw away the right half and repeat the process on the left half.
4.  Is the item **larger** than the middle?
    - If yes, throw away the left half and repeat the process on the right half.

### The Complexity: $O(\log N)$
Every step cuts the remaining work in **half**. This is "Logarithmic" growth. 

### Why $\log N$ is a Superpower:
Look at how many steps it takes to find an item in a list of size $N$:

| $N$ (Items) | Linear Search (Max Steps) | Binary Search (Max Steps) |
| :--- | :--- | :--- |
| 10 | 10 | ~4 |
| 1,000 | 1,000 | ~10 |
| 1,000,000 | 1,000,000 | ~20 |
| 4,000,000,000 | 4,000,000,000 | **~32** |

Binary Search can find one specific person in the entire population of Earth in about 33 steps. Linear search would take years.

---

## The Trade-off: To Sort or Not to Sort?

If Binary Search is so much faster, why do we ever use Linear Search?

The answer is the **Cost of Sorting**. Sorting a list takes time (usually $O(N \log N)$). 

-   If you are only going to search a list **once**, it is faster to just do a Linear Search $O(N)$ than it is to Sort it $O(N \log N)$ and then Search it $O(\log N)$.
-   If you are going to search a list **many times**, it is much better to Sort it once and then perform lightning-fast Binary Searches forever.

## Practice Problems

??? question "Practice Problem 1: The Sorted Requirement"

    You have a list of unsorted IDs: `[45, 12, 89, 33, 27]`. You want to find `33`. Can you use Binary Search?

    ??? tip "Solution"
        **No.** Binary Search relies on the data being ordered. In this unsorted list, the "middle" element is 89. Since 33 is smaller than 89, Binary Search would throw away everything to the right of 89. But in an unsorted list, 33 could be anywhere! You would miss it.

??? question "Practice Problem 2: Steps in Binary Search"

    If you have a sorted list of 128 items, what is the maximum number of steps Binary Search will take to find an item?

    ??? tip "Solution"
        **7 steps.** 
        
        Binary search halves the list each time:
        128 -> 64 -> 32 -> 16 -> 8 -> 4 -> 2 -> 1.
        (Mathematically, $2^7 = 128$, so $\log_2(128) = 7$).

??? question "Practice Problem 3: Practical Choice"

    You are building a feature for a music app that lets a user search through their 50 favorite songs. The list is updated frequently. Which algorithm would you use?

    ??? tip "Solution"
        **Linear Search.**
        
        With only 50 items, the difference between $O(N)$ and $O(\log N)$ is measured in microseconds—humans won't notice. Since the list is updated frequently, sorting it every time it changes would likely be more "expensive" than just doing a quick linear scan when the user types.

## Key Takeaways

| Algorithm | Complexity | Requirement | Strategy |
| :--- | :--- | :--- | :--- |
| **Linear Search** | $O(N)$ | None | Check every item. |
| **Binary Search** | $O(\log N)$ | **Must be Sorted** | Divide and Conquer. |

---

Searching is the first place where we see how **Data Structures** (how we organize data) directly impact **Algorithms** (how we process data). By simply keeping a list sorted, we transform a task from "Impossible for large data" to "Instant."
