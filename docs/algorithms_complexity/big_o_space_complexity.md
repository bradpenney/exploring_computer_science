# Big O: Space Complexity

If Time Complexity is about the **clock**, Space Complexity is about the **workbench**.

You might have a program that is incredibly fast (low Time Complexity), but if it requires 100GB of RAM to process a 1GB file, it’s going to crash on most computers. As engineers, we must balance how fast we run with how much "room" we take up in memory.

**Space Complexity** measures how the total memory usage of an algorithm scales as the input size ($N$) increases.

## Auxiliary vs. Total Space

When we talk about Space Complexity, we usually focus on **Auxiliary Space**.

-   **Input Space:** The memory taken up by the data you were given (the list, the string, the file). You can't control this.
-   **Auxiliary Space:** The *extra* or temporary space your algorithm creates to solve the problem.

**In most interviews and academic contexts, "Space Complexity" refers to Auxiliary Space.**

## Common Space Complexities

### 1. $O(1)$ - Constant Space
The algorithm uses the same amount of memory regardless of the input size.
-   **Example:** A loop that uses a single `i` variable to iterate.
-   **Mechanism:** You aren't creating new lists or data structures that grow with $N$.
-   **Vibe:** Efficient and "In-place."

### 2. $O(N)$ - Linear Space
The memory usage grows in direct proportion to the input size.
-   **Example:** Creating a copy of a list, or building a new list of the same size.
-   **Mechanism:** If you have 1,000 items and you create a new array to store a modified version of each, you've used $O(N)$ space.
-   **Vibe:** Common, but can be a bottleneck for massive datasets.

### 3. $O(N^2)$ - Quadratic Space
The memory usage grows by the square of the input.
-   **Example:** Creating a 2D grid (matrix) where both the rows and columns are the size of the input.
-   **Mechanism:** Often seen in graph algorithms that use an **Adjacency Matrix**.
-   **Vibe:** Very expensive. Avoid for large $N$.

## The Hidden Cost: The Call Stack

One of the most common ways to accidentally use $O(N)$ space is through **Recursion**.

Every time a function calls itself, the computer has to remember where it was. It "pushes" the current function's state onto the **Call Stack** (remember our article on [Stacks](../data_structures/abstract_data_types_and_stack.md)?).

```python
def sum_list(n):
    if n <= 0:
        return 0
    return n + sum_list(n - 1)
```

If you call `sum_list(1000)`, the computer creates 1,000 "frames" in memory, one for each call. This takes **$O(N)$ Space**, even though you didn't explicitly create a list. If $N$ is too large, you'll get a **Stack Overflow** error.

## The Space-Time Trade-off

In computer science, we often play a game of "Trading."

-   **Trading Space for Time:** You can make an algorithm faster by "caching" or "memoizing" previous results in a table (using more memory to avoid recalculating).
-   **Trading Time for Space:** You can save memory by calculating values on-the-fly every time you need them (using more CPU cycles to keep the memory footprint small).

There is rarely a "perfect" answer; the best choice depends on your environment. An embedded sensor has very little RAM (prioritize Space), while a cloud server might have terabytes of RAM but needs to serve millions of users per second (prioritize Time).

## Practice Problems

??? question "Practice Problem 1: Variable Counting"

    What is the Auxiliary Space Complexity of this function?

    ```python
    def find_max(numbers):
        max_val = numbers[0]
        for num in numbers:
            if num > max_val:
                max_val = num
        return max_val
    ```

    ??? tip "Solution"
        This is **$O(1)$**.
        
        Regardless of whether the `numbers` list has 10 or 10,000,000 items, we only create one variable (`max_val`). We are looking at the data, but we aren't storing anything new that scales with the size of the data.

??? question "Practice Problem 2: List Mapping"

    What is the Space Complexity of this function?

    ```python
    def double_list(numbers):
        new_list = []
        for num in numbers:
            new_list.append(num * 2)
        return new_list
    ```

    ??? tip "Solution"
        This is **$O(N)$**.
        
        We are creating a `new_list`. The size of this list is exactly the same as the input `numbers`. If `numbers` grows, `new_list` grows identically.

??? question "Practice Problem 3: Grid Creation"

    If you write an algorithm that takes a string of length $N$ and creates a 2D table to compare every character in the string against every other character (like in some DNA sequencing algorithms), what is the space complexity?

    ??? tip "Solution"
        This is **$O(N^2)$**.
        
        A table that is $N$ wide and $N$ high contains $N \times N$ cells.

## Key Takeaways

| Notation | Space Usage | Example |
| :--- | :--- | :--- |
| **$O(1)$** | Fixed | Simple variables, in-place swaps. |
| **$O(N)$** | Linear | Arrays, Lists, Recursion stacks. |
| **$O(N^2)$** | Quadratic | Matrices, 2D arrays. |

---

Space Complexity reminds us that code doesn't run in a vacuum. Every variable we declare and every function we call takes a bite out of our physical resources. Mastering space complexity is the difference between a program that runs on any machine and a program that only runs on yours.
