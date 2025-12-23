# Big O: Time Complexity

If you have two different programs that solve the same problem, how do you know which one is better?

You might reach for a stopwatch. You run Program A, it takes 2 seconds. You run Program B, it takes 5 seconds. Case closed? Not quite. What if Program A was running on a $5,000 gaming rig and Program B was running on an old laptop? What if you give them 10 times more data—will they both stay at the same speed ratio?

In computer science, we don't measure performance in **seconds**. We measure it in **growth**. We ask: *"As the input size ($N$) increases, how does the number of operations grow?"*

This measurement is called **Big O Notation**.

## The Core Concept: Growth

Imagine you are looking for a specific name in a phone book of $N$ pages.

-   **Algorithm A (Linear Scan):** You check page 1, then page 2, then page 3...
-   **Algorithm B (Binary Search):** You open to the middle, see the name is in the first half, open to the middle of that half, and so on.

If the phone book has 10 pages, both are fast. But if the phone book has **1,000,000** pages:
-   Algorithm A might take 1,000,000 steps.
-   Algorithm B will take about 20 steps.

Big O doesn't care that the steps take 0.001 milliseconds. It cares about the **shape of the curve** as $N$ gets huge.

## Common Time Complexities

Here are the "Speeds" of algorithms, ranked from fastest to slowest:

### 1. $O(1)$ - Constant Time
The execution time stays the same regardless of how much data you have.
-   **Example:** Accessing an element in an array by its index (`arr[5]`).
-   **Vibe:** Instant.

### 2. $O(\log N)$ - Logarithmic Time
The number of steps increases slowly as the data grows. Every time you double the data, you only add one more step.
-   **Example:** Binary Search.
-   **Vibe:** Extremely fast, even for billions of items.

### 3. $O(N)$ - Linear Time
The number of steps grows exactly in proportion to the data. If you have 10x more data, it takes 10x more time.
-   **Example:** A simple `for` loop scanning a list.
-   **Vibe:** Fair. Good for small to medium data.

### 4. $O(N \log N)$ - Linearithmic Time
A bit slower than linear, but still efficient. This is the gold standard for sorting large datasets.
-   **Example:** Merge Sort or Quick Sort.
-   **Vibe:** The best we can usually do for complex tasks like sorting.

### 5. $O(N^2)$ - Quadratic Time
The steps grow by the square of the input. If you have 10x more data, it takes **100x** more time.
-   **Example:** Nested loops (a loop inside a loop).
-   **Vibe:** Dangerous. Fine for small lists, but will freeze your computer on large ones.

### 6. $O(2^N)$ - Exponential Time
The steps double with every single new item of data.
-   **Example:** Recursive solutions for the Traveling Salesperson Problem or the "naive" Fibonacci sequence.
-   **Vibe:** Terrifying. Even a small increase in $N$ can make the program take longer than the age of the universe.

## The Two Rules of Big O

When calculating Big O, we simplify the math using two rules:

### Rule 1: Drop the Constants
We don't care if an algorithm takes $2N$ steps or $5N$ steps. In the grand scheme of infinity, they are both just $O(N)$. We look for the "Class" of the algorithm, not the exact count.

### Rule 2: Keep the Highest Order Term
If an algorithm takes $N^2 + N$ steps, we just call it $O(N^2)$. As $N$ gets large (like a billion), the $N$ becomes so insignificant compared to $N^2$ that it's essentially rounding error.

## Why We Focus on the "Worst Case"

Usually, Big O refers to the **Worst Case Scenario** ($\Omega$ and $\Theta$ are used for best and average, but Big O is the industry standard).

Why? Because as engineers, we care about **guarantees**. If you are building an airplane's flight control system, you don't care how fast it works on a "lucky" day; you need to know it will finish its calculations even in the worst-case scenario before the plane hits the ground.

## Practice Problems

??? question "Practice Problem 1: Identify the Big O"

    What is the Big O of the following Python snippet?

    ```python
    def print_items(n):
        for i in range(n):
            print(i)
        
        for j in range(n):
            print(j)
    ```

    ??? tip "Solution"
        This is $O(N)$.
        
        The code does $N$ operations, then another $N$ operations. That is $2N$. According to Rule 1, we drop the constant. It remains **$O(N)$**.

??? question "Practice Problem 2: Nested Loops"

    What is the Big O of this snippet?

    ```python
    def print_pairs(items):
        for i in items:
            for j in items:
                print(f"{i}, {j}")
    ```

    ??? tip "Solution"
        This is **$O(N^2)$**.
        
        For every 1 item in the outer loop, we run the inner loop $N$ times. Since the outer loop also runs $N$ times, we have $N \times N = N^2$.

??? question "Practice Problem 3: The Constant Trap"

    What is the Big O of a function that prints the first 1,000 items of a list, regardless of whether the list has 1,000 or 1,000,000 items?

    ??? tip "Solution"
        This is **$O(1)$**.
        
        Even though 1,000 is a large number, it is a **constant**. It does not grow as the input size ($N$) grows. Whether the list has a million or a billion items, the function always does exactly 1,000 steps.

## Key Takeaways

| Notation | Name | Growth |
| :--- | :--- | :--- |
| **$O(1)$** | Constant | Flat |
| **$O(\log N)$** | Logarithmic | Very Slow |
| **$O(N)$** | Linear | Steady |
| **$O(N^2)$** | Quadratic | Fast |
| **$O(2^N)$** | Exponential | Explosive |

---

Big O is the language of efficiency. It allows us to talk about how a program will behave in the future, on hardware we haven't seen yet, with data volumes we haven't reached yet. It is the ultimate tool for scalable engineering.
