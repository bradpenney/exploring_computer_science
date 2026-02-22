# Graph Traversal: BFS vs. DFS

Imagine you are in a large, dark maze. You want to find the exit. You have two choices for how to explore:

1.  **Choice A:** You walk down every path as far as it goes. If you hit a dead end, you backtrack to the last intersection and try a different turn.
2.  **Choice B:** You explore everything within 5 feet of you. Then everything within 10 feet. Then 15 feet. You gradually expand your search area in circles.

In computer science, these are the two fundamental ways to explore a **Graph** (a web of connected nodes). They are called **Depth-First Search (DFS)** and **Breadth-First Search (BFS)**.

---

## 1. Depth-First Search (DFS)

DFS is the "Deep Dive" approach. It explores one branch as deeply as possible before backtracking.

### How it works:
1.  Visit a node.
2.  Go to one of its unvisited neighbors.
3.  Repeat until you hit a dead end (a node with no unvisited neighbors).
4.  Backtrack to the previous node and try another neighbor.

### Data Structure: The Stack
DFS naturally uses a **Stack** to keep track of where it's been. This is why DFS is almost always implemented using **Recursion**.

### Best Used For:
-   **Solving Puzzles/Mazes:** Finding a path from start to finish.
-   **Topological Sorting:** Scheduling tasks with dependencies.
-   **Detecting Cycles:** Checking if a graph has a loop.

---

## 2. Breadth-First Search (BFS)

BFS is the "Layer-by-Layer" approach. It visits all the immediate neighbors of a node before moving on to the neighbors' neighbors.

### How it works:
1.  Visit a node.
2.  Add all of its unvisited neighbors to a "to-do" list.
3.  Visit the first item on that list and add its neighbors to the end of the list.
4.  Repeat.

### Data Structure: The Queue
BFS uses a **Queue** (First-In, First-Out). The first neighbors you see are the first ones you visit.

### Best Used For:
-   **Shortest Path:** In an unweighted graph (like a subway map), BFS is guaranteed to find the path with the fewest steps.
-   **Social Networks:** Finding "Friends of Friends" or "Degrees of Separation."
-   **GPS Navigation:** Finding the nearest gas station.

---

## Visual Comparison

| Feature | DFS (Depth-First) | BFS (Breadth-First) |
| :--- | :--- | :--- |
| **Analogy** | A snake diving deep. | A ripple in a pond. |
| **Structure** | Stack (Recursion). | Queue. |
| **Shortest Path** | Not guaranteed. | **Guaranteed** (in unweighted graphs). |
| **Memory** | Low (depends on depth). | High (must store all neighbors at a level). |

---

## Which One Should You Use?

-   **Use BFS** if you need the shortest path, or if you know the target is likely close to your starting point.
-   **Use DFS** if you need to visit every node in the graph, if the graph is very deep and memory is an issue, or if you are looking for solutions that are far away from the start.

## Practice Problems

??? question "Practice Problem 1: Social Networks"

    LinkedIn shows you "2nd-degree connections." Which algorithm would LinkedIn use to find these people?

    ??? tip "Solution"
        **BFS.** 
        
        LinkedIn looks at your neighbors (1st degree) and then their neighbors (2nd degree). This layer-by-layer exploration is exactly what BFS does.

??? question "Practice Problem 2: The Maze"

    You are writing a program to solve a maze. You want to explore every possible path to see if any of them lead to a hidden treasure. Which algorithm is more natural to write using recursion?

    ??? tip "Solution"
        **DFS.**
        
        Recursion uses the "Call Stack" automatically. DFS's logic of "Go deep, then backtrack" maps perfectly to how recursive functions work.

## Key Takeaways

| Algorithm | Order of Exploration | Tool |
| :--- | :--- | :--- |
| **DFS** | Deepest first. | Stack / Recursion. |
| **BFS** | Widest first. | Queue. |

---

Whether you are crawling the web, routing internet packets, or analyzing DNA, BFS and DFS are your primary tools for navigating the complex web of information that makes up our world.
