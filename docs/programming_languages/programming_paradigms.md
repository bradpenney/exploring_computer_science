# Programming Paradigms: Imperative vs. Declarative

When you learn your first programming language (usually Python, C, or Java), you are implicitly learning a specific "style" of thinking. This style is called a **Programming Paradigm**.

There are hundreds of languages, but they almost all fall into two major camps: those that tell the computer *how* to do something, and those that tell the computer *what* result you want.

## 1. Imperative Programming (The "How")

Imperative programming is the oldest and most common paradigm. It maps directly to how the hardware works (The Turing Machine). You give the computer a specific sequence of instructions to change its state.

**The Vibe:** A detailed recipe.
*"Preheat oven to 350. Mix flour and sugar. Beat eggs. Pour into pan. Bake for 30 minutes."*

**Sub-paradigms:**
-   **Procedural:** Grouping instructions into functions (C, Pascal).
-   **Object-Oriented (OOP):** Grouping instructions and data into objects (Java, C++).

**Example (Python): Filtering a list**
Notice how we manually iterate, check, and append. We control the *flow*.
```python
numbers = [1, 2, 3, 4, 5, 6]
evens = []
for n in numbers:
    if n % 2 == 0:
        evens.append(n)
```

## 2. Declarative Programming (The "What")

Declarative programming hides the control flow. You describe the logic of the computation without describing its control flow. You tell the compiler/interpreter the properties of the result you want, and it figures out the steps.

**The Vibe:** A blueprint or a restaurant order.
*"I want a pepperoni pizza."* (You don't tell the chef how to roll the dough).

**Sub-paradigms:**
-   **Functional:** Building programs by composing pure functions (Haskell, Lisp).
-   **Logic:** Defining facts and rules (Prolog).
-   **Query:** Requesting data (SQL).
-   **Markup:** Defining structure (HTML/CSS).

**Example (SQL): Filtering a list**
Notice we don't say *how* to search the table. We just say *what* we want.
```sql
SELECT number FROM numbers WHERE number % 2 = 0;
```

**Example (Python List Comprehension):**
Python supports declarative styles too!
```python
evens = [n for n in numbers if n % 2 == 0]
```

## The Great Convergence

Historically, languages picked a side. C was purely Imperative. Lisp was purely Declarative (Functional).

Modern languages are **Multi-Paradigm**.
-   **Python/JavaScript:** Allow you to write imperative loops OR declarative map/filter functions.
-   **Java:** Added declarative Streams in Java 8.
-   **React (JS Library):** Shifted UI development from Imperative ("Change this button's text") to Declarative ("The button's text should be X based on state Y").

## Practice Problems

??? question "Practice Problem 1: Classify the Code"

    Is HTML Imperative or Declarative?

    ```html
    <h1>Hello World</h1>
    <p>This is a paragraph.</p>
    ```

    ??? tip "Solution"
        **Declarative.**
        
        You are telling the browser *what* to display (a heading, a paragraph). You are not telling it *how* to render the pixels, manage the layout engine, or flow the text.

??? question "Practice Problem 2: The Loop vs. The Map"

    Which of these two JavaScript snippets is Imperative?

    **A:**
    ```javascript
    const doubled = numbers.map(n => n * 2);
    ```

    **B:**
    ```javascript
    const doubled = [];
    for (let i = 0; i < numbers.length; i++) {
        doubled.push(numbers[i] * 2);
    }
    ```

    ??? tip "Solution"
        **Snippet B is Imperative.**
        
        It specifies the *control flow* (the loop, the index `i`, the push operation). Snippet A is Declarative (Functional)—it just says "Map these numbers to their double."

## Key Takeaways

| Feature | Imperative | Declarative |
| :--- | :--- | :--- |
| **Focus** | How to do it (Steps). | What output to get (Result). |
| **State** | Mutable (Changeable). | Immutable (New values created). |
| **Analogy** | Recipe. | Blueprint. |
| **Examples** | C, Java, Python (Loops). | SQL, HTML, Haskell, Excel. |

---

Understanding paradigms is like understanding musical genres. You might be a rock musician (Imperative C coder), but learning jazz (Functional Haskell) will make you a better musician overall.
