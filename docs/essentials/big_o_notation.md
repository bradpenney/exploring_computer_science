---
title: Big-O Notation - Understanding Algorithmic Efficiency
description: Understand Big-O notation for software engineers. Learn how to identify O(n²), O(n log n), O(n) complexities and optimize your code for production.
---

# Big-O Notation: Why Your Code Is Slow

Your PR got rejected. The reviewer said it's "$O(n^2)$" and suggested a "more efficient approach." You nodded, made some changes, and it got approved. But you couldn't quite explain *why* the new version was faster—or predict when your code might become a problem next time.

**This is the theory you were missing.**

Big-O notation isn't academic gatekeeping. It's the language engineers use to discuss performance, predict scaling issues, and make informed decisions about trade-offs. Once you understand it, you'll start seeing it everywhere—in code reviews, in architecture discussions, and in every `.sort()` call you've ever made without thinking twice.

!!! info "Learning Objectives"

    By the end of this article, you'll be able to:

    - Read and write Big-O notation to express the time and space cost of code
    - Identify $O(1)$, $O(n)$, $O(n^2)$, $O(n \log n)$, and $O(2^n)$ by inspecting code structure
    - Apply the two simplification rules (drop constants, drop lower-order terms) to derive Big-O
    - Predict how an algorithm's performance will change as data grows to production scale
    - Make informed trade-offs between time complexity and space complexity

## Where You've Seen This

You've already been doing Big-O thinking, even if you didn't have the vocabulary for it:

- **Database queries:** That query that's "fine with 1,000 rows but times out with 1 million"? That's an $O(n)$ full table scan where n grew to a painful size. Adding an index changed it to $O(\log n)$—that's why your DBA keeps asking about missing indexes.
- **Code review feedback:** When a reviewer says "this nested loop will be slow at scale," they're telling you you've written $O(n^2)$ code. They've seen where this ends up in production.
- **Production incidents:** "Response times spiked when we hit 100k users" means an algorithm that was acceptable at n=1,000 became intolerable at n=100,000. The code didn't change—the input size did.
- **Interview questions:** "What's the time complexity of your solution?" is the interviewer asking you to think in Big-O. "$O(n)$" or "$O(n \log n)$" is the vocabulary they're looking for.

Every time someone talks about code "not scaling," they're describing a Big-O problem.

## What Big-O Actually Measures

Big-O notation describes how an algorithm's resource usage **grows** as input size grows. That word—*grows*—is doing all the work here.

Big-O doesn't tell you how fast your code is in absolute terms. It tells you how performance changes as your data gets bigger. The key question to ask is: **"If I double my input, what happens to the time?"**

- $O(1)$: Double the input → same time
- $O(n)$: Double the input → double the time
- $O(n^2)$: Double the input → four times the time
- $O(\log n)$: Double the input → one extra step

That framing cuts through a lot of confusion. A function that takes 10ms with 1,000 items and 10,000ms with 10,000 items is obviously not $O(n)$. The input grew 10x, but the time grew 1,000x. That's $O(n^2)$ behavior, and the chart below will show you why.

<canvas id="big-o-chart" role="img" aria-label="Line chart showing growth curves for six complexity classes. O(1) is flat, O(log n) grows slowly, O(n) grows linearly, O(n log n) slightly faster, while O(n²) and O(2ⁿ) curve sharply upward. Values above 300 are capped for readability."></canvas>

<p style="text-align: center; font-size: 0.85em; color: #718096; margin-top: -0.5em;">O(n²) and O(2ⁿ) values above 300 are capped — they continue climbing far off the chart.</p>

### The Simplification Rules

When you analyze real code, you'll end up with expressions like $O(2n + 5)$ or $O(n^2 + n)$. Big-O simplifies these with two rules:

1. **Drop constants.** $O(2n)$ becomes $O(n)$. $O(500)$ is still $O(1)$. Why? Because constants don't change the *shape* of growth. Whether your algorithm does 2 operations per element or 200, doubling the input still doubles the time. The constant shifts the curve up—it doesn't change how it grows. At production scale, the shape is what kills you.

2. **Drop lower-order terms.** $O(n^2 + n)$ becomes $O(n^2)$. At large $n$, the $n^2$ term so completely dominates the $n$ term that $n$ is noise. When $n = 1,000$: $n^2 = 1,000,000$ and $n = 1,000$. The $n$ term is 0.1% of the total—irrelevant.

This is why Big-O feels intentionally imprecise at first. It captures growth behavior, not exact performance. And growth rate is what determines whether your code survives production.

### The Numbers That Matter

| Big-O | n=10 | n=100 | n=1,000 | n=1,000,000 |
|:------|-----:|------:|--------:|------------:|
| $O(1)$ | 1 | 1 | 1 | 1 |
| $O(\log n)$ | 3 | 7 | 10 | 20 |
| $O(n)$ | 10 | 100 | 1,000 | 1,000,000 |
| $O(n \log n)$ | 33 | 664 | 9,966 | 19,931,569 |
| $O(n^2)$ | 100 | 10,000 | 1,000,000 | 1,000,000,000,000 |
| $O(2^n)$ | 1,024 | $1.27 \times 10^{30}$ | $\infty$ | $\infty$ |

That $O(n^2)$ algorithm that runs in 1 second with 1,000 items? With 1 million items, it takes **11.5 days**. The code didn't change. The data did.

## Analyzing Your Code

=== "O(1) — Constant Time"

    An $O(1)$ operation takes the same amount of time regardless of input size. Ten items or ten million—same cost.

    The mental model: **the size of the collection is irrelevant.** When you do `users["alice"]`, Python doesn't scan through all the users looking for Alice. It runs Alice's key through a hash function that produces a number, uses that number to jump directly to the right memory location, and returns the value. One operation, regardless of how many users exist.

    Array indexing works the same way. `items[42]` isn't a search—it's arithmetic. The runtime calculates `base_address + (42 × element_size)` and jumps straight there. Whether the array has 100 elements or 100 million, the calculation is identical.

    This is why hash tables (Python `dict`, JavaScript `Map`, Go `map`) are such a foundational tool. They give you $O(1)$ lookups that scale to any size.

    === ":material-language-python: Python"

        ```python title="O(1) Examples" linenums="1"
        def get_first(items):
            return items[0]  # (1)!

        def lookup_user(users_dict, user_id):
            return users_dict.get(user_id)  # (2)!

        def check_flag(config):
            return config.get("feature_enabled", False)  # (3)!
        ```

        1. Array index access is $O(1)$ — directly calculated from memory address
        2. Dictionary lookup is $O(1)$ average — hash tables are powerful
        3. Doesn't matter if config has 5 keys or 500

    === ":material-language-javascript: JavaScript"

        ```javascript title="O(1) Examples" linenums="1"
        function getFirst(items) {
            return items[0];  // Array index access
        }

        function lookupUser(usersMap, userId) {
            return usersMap.get(userId);  // Map lookup is O(1)
        }

        function checkFlag(config) {
            return config.featureEnabled ?? false;  // Object property access
        }
        ```

    === ":material-language-go: Go"

        ```go title="O(1) Examples" linenums="1"
        func getFirst(items []string) string {
            return items[0]  // Slice index access
        }

        func lookupUser(users map[string]User, userID string) (User, bool) {
            user, ok := users[userID]  // Map lookup is O(1) average
            return user, ok
        }

        func checkFlag(config map[string]bool) bool {
            return config["featureEnabled"]  // Map access
        }
        ```

    === ":material-language-rust: Rust"

        ```rust title="O(1) Examples" linenums="1"
        fn get_first(items: &[i32]) -> Option<&i32> {
            items.first()  // Slice index access
        }

        fn lookup_user(users: &HashMap<String, User>, user_id: &str) -> Option<&User> {
            users.get(user_id)  // HashMap lookup is O(1) average
        }

        fn check_flag(config: &HashMap<String, bool>) -> bool {
            *config.get("feature_enabled").unwrap_or(&false)
        }
        ```

    === ":material-language-java: Java"

        ```java title="O(1) Examples" linenums="1"
        public String getFirst(List<String> items) {
            return items.get(0);  // ArrayList index access is O(1)
        }

        public User lookupUser(Map<String, User> users, String userId) {
            return users.get(userId);  // HashMap lookup is O(1) average
        }

        public boolean checkFlag(Map<String, Boolean> config) {
            return config.getOrDefault("featureEnabled", false);
        }
        ```

    === ":material-language-cpp: C++"

        ```cpp title="O(1) Examples" linenums="1"
        std::string getFirst(const std::vector<std::string>& items) {
            return items[0];  // Vector index access
        }

        User lookupUser(const std::unordered_map<std::string, User>& users,
                        const std::string& userId) {
            auto it = users.find(userId);  // unordered_map lookup is O(1) average
            return it != users.end() ? it->second : User{};
        }

        bool checkFlag(const std::unordered_map<std::string, bool>& config) {
            auto it = config.find("featureEnabled");
            return it != config.end() ? it->second : false;
        }
        ```

    **Where you see $O(1)$:** Hash table lookups (dicts, maps, sets), array indexing by position, stack `push`/`pop`, queue `enqueue`/`dequeue`, checking `len()` on most collections. If you're not iterating, you're likely $O(1)$.

=== "O(n) — Linear Time"

    An $O(n)$ operation touches each element once. Double the input, double the time—it scales proportionally.

    Here's something important to internalize: **$O(n)$ is often the best you can do.** If you need to find the maximum value in an unsorted list, you *must* look at every element. There's no shortcut. There's no clever trick. An $O(n)$ solution to that problem isn't slow—it's *optimal*.

    The tell in your code is a single loop that runs from start to end of your input. One pass = $O(n)$. The contents of the loop don't change this, as long as those contents are themselves $O(1)$. Comparisons, arithmetic, hash lookups, assignments inside the loop—all $O(1)$. The loop is the $O(n)$ part.

    Every time you call `.map()`, `.filter()`, `.forEach()`, `reduce()`, or write a `for` loop over a list, you're doing $O(n)$ work. That's completely normal and expected.

    === ":material-language-python: Python"

        ```python title="O(n) Examples" linenums="1"
        def find_max(items):
            max_val = items[0]
            for item in items:  # (1)!
                if item > max_val:
                    max_val = item
            return max_val

        def contains(items, target):
            for item in items:  # (2)!
                if item == target:
                    return True
            return False

        def sum_all(numbers):
            total = 0
            for num in numbers:  # (3)!
                total += num
            return total
        ```

        1. One pass through all items — no way around it for unsorted data
        2. Worst case: target is last or not present — we look at everything
        3. Must touch every element to compute sum — can't skip any

    === ":material-language-javascript: JavaScript"

        ```javascript title="O(n) Examples" linenums="1"
        function findMax(items) {
            let maxVal = items[0];
            for (const item of items) {
                if (item > maxVal) {
                    maxVal = item;
                }
            }
            return maxVal;
        }

        function contains(items, target) {
            for (const item of items) {
                if (item === target) {
                    return true;
                }
            }
            return false;
        }

        function sumAll(numbers) {
            return numbers.reduce((total, num) => total + num, 0);
        }
        ```

    === ":material-language-go: Go"

        ```go title="O(n) Examples" linenums="1"
        func findMax(items []int) int {
            maxVal := items[0]
            for _, item := range items {
                if item > maxVal {
                    maxVal = item
                }
            }
            return maxVal
        }

        func contains(items []string, target string) bool {
            for _, item := range items {
                if item == target {
                    return true
                }
            }
            return false
        }

        func sumAll(numbers []int) int {
            total := 0
            for _, num := range numbers {
                total += num
            }
            return total
        }
        ```

    === ":material-language-rust: Rust"

        ```rust title="O(n) Examples" linenums="1"
        fn find_max(items: &[i32]) -> i32 {
            *items.iter().max().unwrap()
        }

        fn contains(items: &[String], target: &str) -> bool {
            items.iter().any(|item| item == target)
        }

        fn sum_all(numbers: &[i32]) -> i32 {
            numbers.iter().sum()
        }
        ```

    === ":material-language-java: Java"

        ```java title="O(n) Examples" linenums="1"
        public int findMax(int[] items) {
            int maxVal = items[0];
            for (int item : items) {
                if (item > maxVal) {
                    maxVal = item;
                }
            }
            return maxVal;
        }

        public boolean contains(String[] items, String target) {
            for (String item : items) {
                if (item.equals(target)) {
                    return true;
                }
            }
            return false;
        }

        public int sumAll(int[] numbers) {
            int total = 0;
            for (int num : numbers) {
                total += num;
            }
            return total;
        }
        ```

    === ":material-language-cpp: C++"

        ```cpp title="O(n) Examples" linenums="1"
        int findMax(const std::vector<int>& items) {
            return *std::max_element(items.begin(), items.end());
        }

        bool contains(const std::vector<std::string>& items,
                      const std::string& target) {
            return std::find(items.begin(), items.end(), target) != items.end();
        }

        int sumAll(const std::vector<int>& numbers) {
            return std::accumulate(numbers.begin(), numbers.end(), 0);
        }
        ```

    **Where you see $O(n)$:** Linear search, iterating through arrays/lists, `map()`, `filter()`, `reduce()`, counting occurrences, finding min/max in unsorted data. Essentially anything with a single `for` loop over your input.

=== "O(n²) — Quadratic Time"

    $O(n^2)$ typically means a loop inside a loop, and both loops iterate over your input. The intuition to burn into your memory: **for every item in your collection, you look at every other item.** With 1,000 items, that's roughly 1,000,000 operations. With 10,000 items, it's 100,000,000.

    This is almost always what code reviewers are flagging. $O(n^2)$ functions are deceptively fine in development—your test data has 50 items and it runs in milliseconds. Promote that code to production against 500,000 records and you're looking at a timeout, a page full of alerts, and a very unpleasant post-mortem.

    The tell: a `for` loop inside a `for` loop, where both loops depend on the same input size. The critical question to ask yourself: *does the work inside the inner loop grow with the size of my data?* If yes, you're at $O(n^2)$ or worse.

    The fix is almost always the same move: **trade memory for time.** Replace the inner loop with an $O(1)$ hash table lookup. You spend $O(n)$ extra memory to build the lookup structure, and you eliminate the quadratic behavior entirely.

    === ":material-language-python: Python"

        ```python title="O(n²) — The Problem and the Fix" linenums="1"
        def find_duplicates_slow(items):
            """O(n²) - comparing every pair"""
            duplicates = []
            for i in range(len(items)):  # (1)!
                for j in range(i + 1, len(items)):  # (2)!
                    if items[i] == items[j]:
                        duplicates.append(items[i])
            return duplicates

        def find_duplicates_fast(items):
            """O(n) - using a set"""
            seen = set()
            duplicates = []
            for item in items:  # (3)!
                if item in seen:  # (4)!
                    duplicates.append(item)
                seen.add(item)
            return duplicates
        ```

        1. Outer loop: n iterations
        2. Inner loop: up to n iterations for each outer iteration = n × n = n²
        3. Single pass through items — one loop, not two
        4. Set lookup is $O(1)$ — the inner loop is gone entirely

    === ":material-language-javascript: JavaScript"

        ```javascript title="O(n²) — The Problem and the Fix" linenums="1"
        function findDuplicatesSlow(items) {
            // O(n²) - comparing every pair
            const duplicates = [];
            for (let i = 0; i < items.length; i++) {
                for (let j = i + 1; j < items.length; j++) {
                    if (items[i] === items[j]) {
                        duplicates.push(items[i]);
                    }
                }
            }
            return duplicates;
        }

        function findDuplicatesFast(items) {
            // O(n) - using a Set
            const seen = new Set();
            const duplicates = [];
            for (const item of items) {
                if (seen.has(item)) {
                    duplicates.push(item);
                }
                seen.add(item);
            }
            return duplicates;
        }
        ```

    === ":material-language-go: Go"

        ```go title="O(n²) — The Problem and the Fix" linenums="1"
        func findDuplicatesSlow(items []string) []string {
            // O(n²) - comparing every pair
            var duplicates []string
            for i := 0; i < len(items); i++ {
                for j := i + 1; j < len(items); j++ {
                    if items[i] == items[j] {
                        duplicates = append(duplicates, items[i])
                    }
                }
            }
            return duplicates
        }

        func findDuplicatesFast(items []string) []string {
            // O(n) - using a map
            seen := make(map[string]bool)
            var duplicates []string
            for _, item := range items {
                if seen[item] {
                    duplicates = append(duplicates, item)
                }
                seen[item] = true
            }
            return duplicates
        }
        ```

    === ":material-language-rust: Rust"

        ```rust title="O(n²) — The Problem and the Fix" linenums="1"
        fn find_duplicates_slow(items: &[String]) -> Vec<String> {
            // O(n²) - comparing every pair
            let mut duplicates = Vec::new();
            for i in 0..items.len() {
                for j in (i + 1)..items.len() {
                    if items[i] == items[j] {
                        duplicates.push(items[i].clone());
                    }
                }
            }
            duplicates
        }

        fn find_duplicates_fast(items: &[String]) -> Vec<String> {
            // O(n) - using a HashSet
            let mut seen = std::collections::HashSet::new();
            let mut duplicates = Vec::new();
            for item in items {
                if !seen.insert(item) {
                    duplicates.push(item.clone());
                }
            }
            duplicates
        }
        ```

    === ":material-language-java: Java"

        ```java title="O(n²) — The Problem and the Fix" linenums="1"
        public List<String> findDuplicatesSlow(String[] items) {
            // O(n²) - comparing every pair
            List<String> duplicates = new ArrayList<>();
            for (int i = 0; i < items.length; i++) {
                for (int j = i + 1; j < items.length; j++) {
                    if (items[i].equals(items[j])) {
                        duplicates.add(items[i]);
                    }
                }
            }
            return duplicates;
        }

        public List<String> findDuplicatesFast(String[] items) {
            // O(n) - using a HashSet
            Set<String> seen = new HashSet<>();
            List<String> duplicates = new ArrayList<>();
            for (String item : items) {
                if (!seen.add(item)) {
                    duplicates.add(item);
                }
            }
            return duplicates;
        }
        ```

    === ":material-language-cpp: C++"

        ```cpp title="O(n²) — The Problem and the Fix" linenums="1"
        std::vector<std::string> findDuplicatesSlow(
                const std::vector<std::string>& items) {
            // O(n²) - comparing every pair
            std::vector<std::string> duplicates;
            for (size_t i = 0; i < items.size(); i++) {
                for (size_t j = i + 1; j < items.size(); j++) {
                    if (items[i] == items[j]) {
                        duplicates.push_back(items[i]);
                    }
                }
            }
            return duplicates;
        }

        std::vector<std::string> findDuplicatesFast(
                const std::vector<std::string>& items) {
            // O(n) - using unordered_set
            std::unordered_set<std::string> seen;
            std::vector<std::string> duplicates;
            for (const auto& item : items) {
                if (!seen.insert(item).second) {
                    duplicates.push_back(item);
                }
            }
            return duplicates;
        }
        ```

    **The pattern to recognize:** Nested loops both iterating over your input is your signal. Ask "can I use a hash table to eliminate the inner loop?" The answer is usually yes, and the fix is almost always the same: build a set or map in one pass, then use $O(1)$ lookups instead of re-scanning.

=== "O(log n) — Logarithmic Time"

    Logarithmic time is remarkable—and the intuition is simpler than the notation suggests.

    Imagine you're playing the "guess the number" game. Someone is thinking of a number between 1 and 1,000. Instead of guessing randomly, you ask: "Higher or lower than 500?" They say "higher." You ask: "Higher or lower than 750?" And so on. Every question cuts the remaining possibilities in half.

    How many questions do you need to find any number between 1 and 1,000? About 10. Between 1 and 1,000,000? About 20. Between 1 and 1,000,000,000? About 30. You added three zeros to the input size, and you only needed 10 more questions.

    **That's $O(\log n)$.** Every step cuts the problem in half, which means the number of steps grows incredibly slowly as the input grows. Doubling your input adds exactly one step. Adding a zero to your input adds about three steps.

    This is how binary search works, and it's why database indexes are fast. A B-tree index on your `users.email` column lets the database play that same halving game. Instead of checking every row ($O(n)$), it finds any email in about 20–30 comparisons even with millions of rows ($O(\log n)$).

    The catch: **you need sorted data or a [tree structure](trees_basics.md).** You can't discard half the remaining elements if you don't know which half contains your target. Binary search only works on sorted arrays. B-tree indexes work because the database maintains the tree structure itself, sorted, on your behalf.

    === ":material-language-python: Python"

        ```python title="O(log n) — Binary Search" linenums="1"
        def binary_search(sorted_items, target):
            """O(log n) - halving the search space each step"""
            left, right = 0, len(sorted_items) - 1

            while left <= right:
                mid = (left + right) // 2  # (1)!

                if sorted_items[mid] == target:
                    return mid
                elif sorted_items[mid] < target:
                    left = mid + 1  # (2)!
                else:
                    right = mid - 1  # (3)!

            return -1  # Not found
        ```

        1. Check the middle element — is this the target?
        2. Target is larger — discard the entire left half
        3. Target is smaller — discard the entire right half

    === ":material-language-javascript: JavaScript"

        ```javascript title="O(log n) — Binary Search" linenums="1"
        function binarySearch(sortedItems, target) {
            let left = 0;
            let right = sortedItems.length - 1;

            while (left <= right) {
                const mid = Math.floor((left + right) / 2);

                if (sortedItems[mid] === target) {
                    return mid;
                } else if (sortedItems[mid] < target) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }

            return -1;
        }
        ```

    === ":material-language-go: Go"

        ```go title="O(log n) — Binary Search" linenums="1"
        func binarySearch(sortedItems []int, target int) int {
            left, right := 0, len(sortedItems)-1

            for left <= right {
                mid := (left + right) / 2

                if sortedItems[mid] == target {
                    return mid
                } else if sortedItems[mid] < target {
                    left = mid + 1
                } else {
                    right = mid - 1
                }
            }

            return -1
        }
        ```

    === ":material-language-rust: Rust"

        ```rust title="O(log n) — Binary Search" linenums="1"
        fn binary_search(sorted_items: &[i32], target: i32) -> Option<usize> {
            let mut left = 0;
            let mut right = sorted_items.len();

            while left < right {
                let mid = left + (right - left) / 2;

                match sorted_items[mid].cmp(&target) {
                    std::cmp::Ordering::Equal => return Some(mid),
                    std::cmp::Ordering::Less => left = mid + 1,
                    std::cmp::Ordering::Greater => right = mid,
                }
            }

            None
        }
        ```

    === ":material-language-java: Java"

        ```java title="O(log n) — Binary Search" linenums="1"
        public int binarySearch(int[] sortedItems, int target) {
            int left = 0;
            int right = sortedItems.length - 1;

            while (left <= right) {
                int mid = left + (right - left) / 2;

                if (sortedItems[mid] == target) {
                    return mid;
                } else if (sortedItems[mid] < target) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }

            return -1;
        }
        ```

    === ":material-language-cpp: C++"

        ```cpp title="O(log n) — Binary Search" linenums="1"
        int binarySearch(const std::vector<int>& sortedItems, int target) {
            int left = 0;
            int right = sortedItems.size() - 1;

            while (left <= right) {
                int mid = left + (right - left) / 2;

                if (sortedItems[mid] == target) {
                    return mid;
                } else if (sortedItems[mid] < target) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }

            return -1;
        }
        ```

    **Where you see $O(\log n)$:** Binary search, balanced [tree operations](trees_basics.md) (insert, lookup, delete), database B-tree index lookups. Any algorithm that repeatedly halves its remaining work.

=== "O(n log n) — Linearithmic Time"

    $O(n \log n)$ sits between linear and quadratic. It's "slightly worse than linear"—but dramatically better than $O(n^2)$. In practice, this is the complexity class of **efficient sorting algorithms**, and it comes up every time you call `.sort()`.

    Why does sorting land here? Think about it this way: to sort n items using comparisons, each element needs to find its correct position. With a clever algorithm like merge sort, each element participates in approximately log n comparisons as data is repeatedly split in half and merged back together in order. n elements, each doing log n work = $O(n \log n)$.

    In fact, $O(n \log n)$ is the *theoretical lower bound* for comparison-based sorting. No algorithm that determines order purely by comparing elements can be faster than this for general data—it's been mathematically proven. When you call `.sort()` in Python, JavaScript's `Array.prototype.sort()`, or Java's `Arrays.sort()`, this is what's running (Python uses Timsort, modern JavaScript engines typically use Timsort too—both $O(n \log n)$ average and worst case).

    The practical implication: if your algorithm sorts data as a step and then does one linear pass, your total complexity is $O(n \log n)$ + $O(n)$. Since $O(n \log n)$ dominates, you're $O(n \log n)$ overall. The sort controls your ceiling.

    === ":material-language-python: Python"

        ```python title="O(n log n) — Merge Sort" linenums="1"
        def merge_sort(items):
            if len(items) <= 1:  # (1)!
                return items

            mid = len(items) // 2  # (2)!
            left = merge_sort(items[:mid])
            right = merge_sort(items[mid:])

            return merge(left, right)

        def merge(left, right):
            result = []
            i = j = 0
            while i < len(left) and j < len(right):  # (3)!
                if left[i] <= right[j]:
                    result.append(left[i])
                    i += 1
                else:
                    result.append(right[j])
                    j += 1
            result.extend(left[i:])
            result.extend(right[j:])
            return result
        ```

        1. Base case — a list of 0 or 1 items is already sorted
        2. Split in half — this is where the log n comes from (log n levels of splitting)
        3. Merge two sorted halves — O(n) work at each level, log n levels = O(n log n) total

    === ":material-language-javascript: JavaScript"

        ```javascript title="O(n log n) — Merge Sort" linenums="1"
        function mergeSort(items) {
            if (items.length <= 1) {
                return items;
            }

            const mid = Math.floor(items.length / 2);
            const left = mergeSort(items.slice(0, mid));
            const right = mergeSort(items.slice(mid));

            return merge(left, right);
        }

        function merge(left, right) {
            const result = [];
            let i = 0, j = 0;
            while (i < left.length && j < right.length) {
                if (left[i] <= right[j]) {
                    result.push(left[i++]);
                } else {
                    result.push(right[j++]);
                }
            }
            return result.concat(left.slice(i)).concat(right.slice(j));
        }
        ```

    === ":material-language-go: Go"

        ```go title="O(n log n) — Merge Sort" linenums="1"
        func mergeSort(items []int) []int {
            if len(items) <= 1 {
                return items
            }

            mid := len(items) / 2
            left := mergeSort(items[:mid])
            right := mergeSort(items[mid:])

            return merge(left, right)
        }

        func merge(left, right []int) []int {
            result := make([]int, 0, len(left)+len(right))
            i, j := 0, 0
            for i < len(left) && j < len(right) {
                if left[i] <= right[j] {
                    result = append(result, left[i])
                    i++
                } else {
                    result = append(result, right[j])
                    j++
                }
            }
            result = append(result, left[i:]...)
            result = append(result, right[j:]...)
            return result
        }
        ```

    === ":material-language-rust: Rust"

        ```rust title="O(n log n) — Merge Sort" linenums="1"
        fn merge_sort(items: &[i32]) -> Vec<i32> {
            if items.len() <= 1 {
                return items.to_vec();
            }

            let mid = items.len() / 2;
            let left = merge_sort(&items[..mid]);
            let right = merge_sort(&items[mid..]);

            merge(&left, &right)
        }

        fn merge(left: &[i32], right: &[i32]) -> Vec<i32> {
            let mut result = Vec::with_capacity(left.len() + right.len());
            let (mut i, mut j) = (0, 0);
            while i < left.len() && j < right.len() {
                if left[i] <= right[j] {
                    result.push(left[i]);
                    i += 1;
                } else {
                    result.push(right[j]);
                    j += 1;
                }
            }
            result.extend_from_slice(&left[i..]);
            result.extend_from_slice(&right[j..]);
            result
        }
        ```

    === ":material-language-java: Java"

        ```java title="O(n log n) — Merge Sort" linenums="1"
        public int[] mergeSort(int[] items) {
            if (items.length <= 1) {
                return items;
            }

            int mid = items.length / 2;
            int[] left = mergeSort(Arrays.copyOfRange(items, 0, mid));
            int[] right = mergeSort(Arrays.copyOfRange(items, mid, items.length));

            return merge(left, right);
        }

        private int[] merge(int[] left, int[] right) {
            int[] result = new int[left.length + right.length];
            int i = 0, j = 0, k = 0;
            while (i < left.length && j < right.length) {
                if (left[i] <= right[j]) {
                    result[k++] = left[i++];
                } else {
                    result[k++] = right[j++];
                }
            }
            while (i < left.length) result[k++] = left[i++];
            while (j < right.length) result[k++] = right[j++];
            return result;
        }
        ```

    === ":material-language-cpp: C++"

        ```cpp title="O(n log n) — Merge Sort" linenums="1"
        std::vector<int> mergeSort(std::vector<int> items) {
            if (items.size() <= 1) {
                return items;
            }

            size_t mid = items.size() / 2;
            auto left = mergeSort(std::vector<int>(items.begin(), items.begin() + mid));
            auto right = mergeSort(std::vector<int>(items.begin() + mid, items.end()));

            return merge(left, right);
        }

        std::vector<int> merge(const std::vector<int>& left,
                               const std::vector<int>& right) {
            std::vector<int> result;
            result.reserve(left.size() + right.size());
            size_t i = 0, j = 0;
            while (i < left.size() && j < right.size()) {
                if (left[i] <= right[j]) {
                    result.push_back(left[i++]);
                } else {
                    result.push_back(right[j++]);
                }
            }
            result.insert(result.end(), left.begin() + i, left.end());
            result.insert(result.end(), right.begin() + j, right.end());
            return result;
        }
        ```

    **Where you see $O(n \log n)$:** Every call to `.sort()`, merge sort, quicksort (average case), heapsort. Any algorithm where you sort first and query later.

=== "O(2^n) — Exponential Time"

    $O(2^n)$ is the complexity class you want to avoid entirely. The table showed you the numbers: at $n=100$, you're beyond $10^{30}$ operations—more than the number of atoms in the observable universe, regardless of hardware.

    The intuition: **every new input doubles the work.** A recursive function that calls itself twice per input, without caching results, is the archetype. `fibonacci(5)` calls `fibonacci(4)` and `fibonacci(3)`. `fibonacci(4)` then calls `fibonacci(3)` again, and `fibonacci(2)`. The same subproblems are solved over and over, and the call tree doubles in size at each level.

    The fix is almost always **memoization**—cache results you've already computed. What was $O(2^n)$ becomes $O(n)$: one computation per unique subproblem. This is the foundational insight of dynamic programming.

    === ":material-language-python: Python"

        ```python title="O(2^n) — and the memoized fix" linenums="1"
        import functools

        def fibonacci_slow(n):
            # O(2^n) — call tree doubles at every level
            if n <= 1:
                return n
            return fibonacci_slow(n - 1) + fibonacci_slow(n - 2)  # (1)!

        @functools.lru_cache(maxsize=None)  # (2)!
        def fibonacci_fast(n):
            # O(n) — each value computed exactly once
            if n <= 1:
                return n
            return fibonacci_fast(n - 1) + fibonacci_fast(n - 2)
        ```

        1. Both recursive calls re-solve overlapping subproblems. `fibonacci_slow(40)` makes over a billion calls.
        2. `@lru_cache` memoizes automatically — subsequent calls return the cached result instantly instead of recursing.

    === ":material-language-javascript: JavaScript"

        ```javascript title="O(2^n) — and the memoized fix" linenums="1"
        function fibonacciSlow(n) {
            // O(2^n) — call tree doubles at every level
            if (n <= 1) return n;
            return fibonacciSlow(n - 1) + fibonacciSlow(n - 2);
        }

        function fibonacciFast(n, memo = new Map()) {
            // O(n) — each value computed exactly once
            if (memo.has(n)) return memo.get(n);
            if (n <= 1) return n;
            const result = fibonacciFast(n - 1, memo) + fibonacciFast(n - 2, memo);
            memo.set(n, result);
            return result;
        }
        ```

    === ":material-language-go: Go"

        ```go title="O(2^n) — and the memoized fix" linenums="1"
        func fibonacciSlow(n int) int {
            // O(2^n) — call tree doubles at every level
            if n <= 1 {
                return n
            }
            return fibonacciSlow(n-1) + fibonacciSlow(n-2)
        }

        func fibonacciFast(n int, memo map[int]int) int {
            // O(n) — each value computed exactly once
            if val, ok := memo[n]; ok {
                return val
            }
            if n <= 1 {
                return n
            }
            result := fibonacciFast(n-1, memo) + fibonacciFast(n-2, memo)
            memo[n] = result
            return result
        }
        ```

    === ":material-language-rust: Rust"

        ```rust title="O(2^n) — and the memoized fix" linenums="1"
        fn fibonacci_slow(n: u64) -> u64 {
            // O(2^n) — call tree doubles at every level
            if n <= 1 {
                return n;
            }
            fibonacci_slow(n - 1) + fibonacci_slow(n - 2)
        }

        fn fibonacci_fast(n: u64, memo: &mut std::collections::HashMap<u64, u64>) -> u64 {
            // O(n) — each value computed exactly once
            if let Some(&val) = memo.get(&n) {
                return val;
            }
            if n <= 1 {
                return n;
            }
            let result = fibonacci_fast(n - 1, memo) + fibonacci_fast(n - 2, memo);
            memo.insert(n, result);
            result
        }
        ```

    === ":material-language-java: Java"

        ```java title="O(2^n) — and the memoized fix" linenums="1"
        public long fibonacciSlow(int n) {
            // O(2^n) — call tree doubles at every level
            if (n <= 1) return n;
            return fibonacciSlow(n - 1) + fibonacciSlow(n - 2);
        }

        public long fibonacciFast(int n, Map<Integer, Long> memo) {
            // O(n) — each value computed exactly once
            if (memo.containsKey(n)) return memo.get(n);
            if (n <= 1) return n;
            long result = fibonacciFast(n - 1, memo) + fibonacciFast(n - 2, memo);
            memo.put(n, result);
            return result;
        }
        ```

    === ":material-language-cpp: C++"

        ```cpp title="O(2^n) — and the memoized fix" linenums="1"
        long long fibonacciSlow(int n) {
            // O(2^n) — call tree doubles at every level
            if (n <= 1) return n;
            return fibonacciSlow(n - 1) + fibonacciSlow(n - 2);
        }

        long long fibonacciFast(int n, std::unordered_map<int, long long>& memo) {
            // O(n) — each value computed exactly once
            auto it = memo.find(n);
            if (it != memo.end()) return it->second;
            if (n <= 1) return n;
            long long result = fibonacciFast(n - 1, memo) + fibonacciFast(n - 2, memo);
            memo[n] = result;
            return result;
        }
        ```

    **Where you see $O(2^n)$:** Naive recursive solutions without memoization, brute-force combinatorics (generating all subsets of a set), some backtracking algorithms. Any function with `return f(n-1) + f(n-2)` and no cache is a red flag. The fix is almost always memoization or dynamic programming.

## Why This Matters for Production Code

=== ":material-database: Database Queries"

    ```sql title="Same query — completely different behavior" linenums="1"
    -- O(n): full table scan — the database checks every single row
    SELECT * FROM users WHERE email = 'alice@example.com';

    -- O(log n): with a B-tree index on email — same query, completely different behavior
    ```

    When your users table has 100 rows, both queries are fast. At 10 million rows, the unindexed version reads every row—potentially thousands of disk I/O operations. The indexed version traverses a B-tree in about 24 comparisons and returns.

    That's the entire reason indexes exist. It's not magic—it's the database maintaining a sorted, tree-structured copy of that column, so it can binary-search instead of scan. When your DBA says "you need an index on that column," they're telling you your query is $O(n)$ and they want to make it $O(\log n)$.

=== ":material-alert-circle: Works in Dev, Dies in Production"

    Here's a scenario that plays out constantly. You have an API endpoint that loads users and checks their role against a list of allowed roles.

    With 100 users, 5 roles each, checked against 10 allowed roles: 100 × 5 × 10 = 5,000 operations. Instant in dev.

    With 50,000 users, 20 roles each, against 500 allowed roles: 50,000 × 20 × 500 = **500 million operations**. Your server is down.

    The fix is one line—convert `allowed_roles` to a set for $O(1)$ lookups:

    === ":material-language-python: Python"

        ```python title="A hidden O(n²) problem — and the fix" linenums="1"
        def get_authorized_users(users, allowed_roles):
            authorized = []
            for user in users:                  # O(n) — loop over users
                for role in user.roles:         # O(r) — loop over user's roles
                    if role in allowed_roles:   # O(a) — linear scan of a list!
                        authorized.append(user)
                        break
            return authorized

        # Fix: one line converts list to set — O(1) lookups instead of O(a)
        allowed_roles = set(allowed_roles)  # Build once: O(a)
        ```

    === ":material-language-javascript: JavaScript"

        ```javascript title="A hidden O(n²) problem — and the fix" linenums="1"
        function getAuthorizedUsers(users, allowedRoles) {
            const authorized = [];
            for (const user of users) {                // O(n) — loop over users
                for (const role of user.roles) {       // O(r) — loop over user's roles
                    if (allowedRoles.includes(role)) { // O(a) — array scan!
                        authorized.push(user);
                        break;
                    }
                }
            }
            return authorized;
        }

        // Fix: convert to Set for O(1) lookups
        const allowedRolesSet = new Set(allowedRoles);  // Build once: O(a)
        // Now: allowedRolesSet.has(role) is O(1)
        ```

    === ":material-language-go: Go"

        ```go title="A hidden O(n²) problem — and the fix" linenums="1"
        func getAuthorizedUsers(users []User, allowedRoles []string) []User {
            authorized := []User{}
            for _, user := range users {                   // O(n) — loop over users
                for _, role := range user.Roles {          // O(r) — loop over user's roles
                    for _, allowed := range allowedRoles { // O(a) — slice scan!
                        if role == allowed {
                            authorized = append(authorized, user)
                            break
                        }
                    }
                }
            }
            return authorized
        }

        // Fix: build a map once for O(1) lookups
        allowedSet := make(map[string]bool, len(allowedRoles))
        for _, r := range allowedRoles {
            allowedSet[r] = true  // Build once: O(a)
        }
        // Now: allowedSet[role] is O(1)
        ```

    === ":material-language-rust: Rust"

        ```rust title="A hidden O(n²) problem — and the fix" linenums="1"
        fn get_authorized_users<'a>(users: &'a [User], allowed_roles: &[String]) -> Vec<&'a User> {
            let mut authorized = Vec::new();
            'outer: for user in users {
                for role in &user.roles {
                    if allowed_roles.contains(role) {  // O(a) — linear scan!
                        authorized.push(user);
                        continue 'outer;
                    }
                }
            }
            authorized
        }

        // Fix: build a HashSet once for O(1) lookups
        use std::collections::HashSet;
        let allowed_set: HashSet<&String> = allowed_roles.iter().collect();  // Build once: O(a)
        // Now: allowed_set.contains(role) is O(1)
        ```

    === ":material-language-java: Java"

        ```java title="A hidden O(n²) problem — and the fix" linenums="1"
        public List<User> getAuthorizedUsers(List<User> users, List<String> allowedRoles) {
            List<User> authorized = new ArrayList<>();
            for (User user : users) {                  // O(n) — loop over users
                for (String role : user.getRoles()) {  // O(r) — loop over user's roles
                    if (allowedRoles.contains(role)) { // O(a) — list scan!
                        authorized.add(user);
                        break;
                    }
                }
            }
            return authorized;
        }

        // Fix: use HashSet for O(1) lookups
        Set<String> allowedSet = new HashSet<>(allowedRoles);  // Build once: O(a)
        // Now: allowedSet.contains(role) is O(1)
        ```

    === ":material-language-cpp: C++"

        ```cpp title="A hidden O(n²) problem — and the fix" linenums="1"
        std::vector<User> getAuthorizedUsers(
                const std::vector<User>& users,
                const std::vector<std::string>& allowedRoles) {
            std::vector<User> authorized;
            for (const auto& user : users) {
                for (const auto& role : user.roles) {
                    // O(a) — linear scan through allowedRoles vector
                    auto it = std::find(allowedRoles.begin(), allowedRoles.end(), role);
                    if (it != allowedRoles.end()) {
                        authorized.push_back(user);
                        break;
                    }
                }
            }
            return authorized;
        }

        // Fix: use unordered_set for O(1) lookups
        std::unordered_set<std::string> allowedSet(
            allowedRoles.begin(), allowedRoles.end());  // Build once: O(a)
        // Now: allowedSet.count(role) is O(1)
        ```

    Total complexity drops from $O(n \times r \times a)$ to $O(n \times r)$. With 50,000 users: 50,000 × 20 = 1,000,000 operations. Completely manageable.

=== ":material-scale-balance: Memory vs. Time"

    The $O(n)$ duplicate finder uses extra memory (the set). The $O(n^2)$ version uses no extra memory. This is the fundamental trade-off in algorithm design—**time versus space**—and it shows up constantly.

    === ":material-language-python: Python"

        ```python title="The same problem, two trade-offs" linenums="1"
        def has_duplicate_slow(items):
            # O(n²) time, O(1) extra space — no extra memory used
            for i in range(len(items)):
                for j in range(i + 1, len(items)):
                    if items[i] == items[j]:
                        return True
            return False

        def has_duplicate_fast(items):
            # O(n) time, O(n) extra space — trades memory for speed
            seen = set()  # grows with input size
            for item in items:
                if item in seen:
                    return True
                seen.add(item)
            return False
        ```

    === ":material-language-javascript: JavaScript"

        ```javascript title="The same problem, two trade-offs" linenums="1"
        function hasDuplicateSlow(items) {
            // O(n²) time, O(1) extra space — no extra memory used
            for (let i = 0; i < items.length; i++) {
                for (let j = i + 1; j < items.length; j++) {
                    if (items[i] === items[j]) return true;
                }
            }
            return false;
        }

        function hasDuplicateFast(items) {
            // O(n) time, O(n) extra space — trades memory for speed
            const seen = new Set();  // grows with input size
            for (const item of items) {
                if (seen.has(item)) return true;
                seen.add(item);
            }
            return false;
        }
        ```

    === ":material-language-go: Go"

        ```go title="The same problem, two trade-offs" linenums="1"
        func hasDuplicateSlow(items []string) bool {
            // O(n²) time, O(1) extra space — no extra memory used
            for i := 0; i < len(items); i++ {
                for j := i + 1; j < len(items); j++ {
                    if items[i] == items[j] {
                        return true
                    }
                }
            }
            return false
        }

        func hasDuplicateFast(items []string) bool {
            // O(n) time, O(n) extra space — trades memory for speed
            seen := make(map[string]bool)  // grows with input size
            for _, item := range items {
                if seen[item] {
                    return true
                }
                seen[item] = true
            }
            return false
        }
        ```

    === ":material-language-rust: Rust"

        ```rust title="The same problem, two trade-offs" linenums="1"
        fn has_duplicate_slow(items: &[String]) -> bool {
            // O(n²) time, O(1) extra space — no extra memory used
            for i in 0..items.len() {
                for j in (i + 1)..items.len() {
                    if items[i] == items[j] {
                        return true;
                    }
                }
            }
            false
        }

        fn has_duplicate_fast(items: &[String]) -> bool {
            // O(n) time, O(n) extra space — trades memory for speed
            let mut seen = std::collections::HashSet::new();  // grows with input size
            for item in items {
                if !seen.insert(item) {
                    return true;
                }
            }
            false
        }
        ```

    === ":material-language-java: Java"

        ```java title="The same problem, two trade-offs" linenums="1"
        public boolean hasDuplicateSlow(String[] items) {
            // O(n²) time, O(1) extra space — no extra memory used
            for (int i = 0; i < items.length; i++) {
                for (int j = i + 1; j < items.length; j++) {
                    if (items[i].equals(items[j])) return true;
                }
            }
            return false;
        }

        public boolean hasDuplicateFast(String[] items) {
            // O(n) time, O(n) extra space — trades memory for speed
            Set<String> seen = new HashSet<>();  // grows with input size
            for (String item : items) {
                if (!seen.add(item)) return true;
            }
            return false;
        }
        ```

    === ":material-language-cpp: C++"

        ```cpp title="The same problem, two trade-offs" linenums="1"
        bool hasDuplicateSlow(const std::vector<std::string>& items) {
            // O(n²) time, O(1) extra space — no extra memory used
            for (size_t i = 0; i < items.size(); i++) {
                for (size_t j = i + 1; j < items.size(); j++) {
                    if (items[i] == items[j]) return true;
                }
            }
            return false;
        }

        bool hasDuplicateFast(const std::vector<std::string>& items) {
            // O(n) time, O(n) extra space — trades memory for speed
            std::unordered_set<std::string> seen;  // grows with input size
            for (const auto& item : items) {
                if (!seen.insert(item).second) return true;
            }
            return false;
        }
        ```

    Neither version is wrong — they answer different constraints. Most of the time you choose the fast one. But on a device with 512KB of RAM processing a 10MB dataset, the slow one might be your only option.

    Sometimes you deliberately choose a slower algorithm because memory is constrained: embedded systems, serverless functions with tight memory limits, processing datasets larger than RAM. Big-O gives you the vocabulary to make that trade-off explicitly and deliberately, rather than discovering it accidentally during an incident at 2am.

## Technical Interview Context

Big-O analysis is one of the most consistently tested interview topics across the industry. The questions are predictable — but the expected depth varies. Junior candidates state the complexity; senior candidates justify it.

**Questions you'll be able to answer:**

- *"What is the time complexity of this code snippet?"* — Walk through the nested loops or recursive calls, identify what grows with $n$, then apply the rules: drop constants, keep the dominant term. A loop inside a loop is $O(n^2)$; a loop containing a binary search is $O(n \log n)$.
- *"Why is your solution $O(n \log n)$ and not $O(n)$?"* — Justify your analysis, don't just state it. Trace through: "the outer loop is $O(n)$; the binary search inside it is $O(\log n)$ per iteration; multiply, giving $O(n \log n)$."
- *"How would you optimize this from $O(n^2)$ to $O(n)$?"* — The standard technique: replace the inner linear scan with a hash table lookup. Build the table once in $O(n)$; each lookup is $O(1)$; total is $O(n)$. This pattern (nested loop → hash table) solves a huge fraction of interview optimization problems.
- *"What's the space complexity?"* — Big-O applies to memory too. Recursive algorithms use $O(n)$ stack space (one frame per recursive call). Hash table solutions use $O(n)$ auxiliary space. In-place algorithms use $O(1)$. Interviewers frequently follow "what's the time complexity?" with this question.
- *"Is $O(n \log n)$ always faster than $O(n^2)$?"* — Not at small $n$ — constants matter when inputs are tiny. But for production-scale data, yes: the growth rate dominates. The practical answer is "asymptotically yes, and at the scale where performance actually matters, yes."

## A Brief History

Big-O notation predates computing by 60 years. German mathematician Paul Bachmann introduced it in 1894 in a number theory text. His colleague Edmund Landau popularized it—hence the formal name, "Bachmann-Landau notation." The *O* stands for *Ordnung*, German for "order of magnitude."

Computer science borrowed the notation wholesale. Donald Knuth standardized its use for algorithm analysis in *The Art of Computer Programming* (1968) and introduced the companion notations Big-Θ (theta, for tight bounds) and Big-Ω (omega, for lower bounds). When your tech lead says "order of n squared," they're using a 130-year-old mathematical convention that was originally developed to describe the behavior of prime numbers—not sorting algorithms.

The abstraction turns out to be exactly right for comparing algorithms: constants depend on hardware, language, and implementation. Growth rate is intrinsic to the algorithm itself.

## Practice Problems

??? question "Problem 1: Analyze This Code"

    What's the time complexity?

    ```python title="What's the complexity?" linenums="1"
    def mystery(items):
        result = []
        for item in items:
            if item not in result:
                result.append(item)
        return result
    ```

    ??? tip "Answer"

        **$O(n^2)$**

        The outer `for` loop runs $n$ times. Inside the loop, `item not in result` checks membership in a *list*. List membership is $O(n)$ in the worst case—Python has to scan the entire list to confirm absence.

        As `result` grows toward size $n$, each membership check gets slower. On average, you're scanning half of `result` per iteration. The total: n iterations × up to n checks each = $O(n^2)$.

        **To optimize:** Use a set for $O(1)$ membership checks:

        ```python title="Optimized: O(n) with a set" linenums="1"
        def mystery_optimized(items):
            seen = set()
            result = []
            for item in items:
                if item not in seen:  # O(1) now, not O(n)
                    seen.add(item)
                    result.append(item)
            return result
        ```

        Now it's $O(n)$. One pass, $O(1)$ work per item.

??? question "Problem 2: Which Is Faster?"

    Algorithm A: $O(n \log n)$

    Algorithm B: $O(n^2)$

    For what input sizes is A faster than B?

    ??? tip "Answer"

        A is faster for **large inputs**—and in practice, "large" is smaller than you might think.

        For very small inputs ($n < 10$ or so), constant factors might make B faster in absolute wall-clock time. But as $n$ grows, the difference becomes enormous:

        - $n=100$: A ≈ 664 operations, B = 10,000 — A is 15x faster
        - $n=1,000$: A ≈ 9,966 operations, B = 1,000,000 — A is 100x faster
        - $n=10,000$: A ≈ 133,000 operations, B = 100,000,000 — A is 750x faster

        This is why efficient sorting algorithms (merge sort, quicksort, Timsort) are $O(n \log n)$. The alternative—bubble sort, insertion sort—are $O(n^2)$, and they collapse completely at scale.

??? question "Problem 3: Two Sum"

    Given an array of integers and a target sum, find two numbers that add up to the target. What's the optimal complexity?

    ```python title="Example input" linenums="1"
    # Example: [2, 7, 11, 15], target=9 → return [2, 7]
    ```

    ??? tip "Answer"

        **Optimal: $O(n)$ time, $O(n)$ space**

        ```python title="Two Sum: O(n) with a hash map" linenums="1"
        def two_sum(numbers, target):
            seen = {}  # value -> index
            for i, num in enumerate(numbers):
                complement = target - num
                if complement in seen:   # O(1) hash lookup
                    return [complement, num]
                seen[num] = i
            return None
        ```

        The insight: for each number, you need to know if its complement (target - num) has already appeared. Storing what you've seen in a hash map makes that check $O(1)$. One pass = $O(n)$ total.

        Compare the three approaches:

        - Brute force (nested loops): $O(n^2)$ — check every pair
        - Sort + two pointers: $O(n \log n)$ — sort first, then scan from both ends
        - Hash table: $O(n)$ — this solution, one pass with $O(1)$ lookups

        The hash table approach wins by trading $O(n)$ space for linear time — a classic example of the time/space trade-off in action.

## Key Takeaways

| Concept | What to Remember |
|:--------|:-----------------|
| $O(1)$ | Hash tables, array indexing — size of collection is irrelevant |
| $O(\log n)$ | Halving the search space each step — needs sorted/tree data |
| $O(n)$ | Single loop — proportional, often optimal for unsorted data |
| $O(n \log n)$ | Every `.sort()` call — theoretical minimum for comparison sorts |
| $O(n^2)$ | Nested loops over input — the thing to spot and eliminate |
| $O(2^n)$ | Naive recursion without memoization — avoid; fix with dynamic programming |
| **Drop constants** | $O(2n)$ → $O(n)$, $O(500)$ → $O(1)$ |
| **Drop lower terms** | $O(n^2 + n)$ → $O(n^2)$ |
| **Trade-offs** | Faster algorithms often use more memory — that's usually the right call |
| **Indexes** | Database B-tree indexes turn $O(n)$ table scans into $O(\log n)$ lookups |

## Further Reading

### On This Site

- **[Trees](trees_basics.md)** — The data structures that enable $O(\log n)$: binary search trees, B-tree database indexes, and how depth maps to comparisons
- **[Computational Thinking](../efficiency/computational_thinking.md)** — How Big-O fits into the broader practice of algorithm design and problem decomposition

### Reference

- [Big-O Cheat Sheet](https://www.bigocheatsheet.com/) — Visual reference mapping common data structures and algorithms to their complexity classes
- [Big O Notation — Wikipedia](https://en.wikipedia.org/wiki/Big_O_notation) — Mathematical foundations and formal definitions
- [Bachmann-Landau Notation — Wikipedia](https://en.wikipedia.org/wiki/Bachmann%E2%80%93Landau_notation) — History and the full family of notations (Big-O, Big-Θ, Big-Ω)
- [Timsort — Wikipedia](https://en.wikipedia.org/wiki/Timsort) — How Python's and JavaScript's `.sort()` actually works under the hood

### Courses

- [MIT 6.006: Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/) — Full lecture notes and problem sets from MIT's algorithms course, free on OpenCourseWare


## What's Next

Understanding Big-O is the foundation. Next, explore how specific data structures are designed to hit target complexity classes — starting with **[Trees](trees_basics.md)**, which are the key to understanding why binary search and database index lookups run in $O(\log n)$.
