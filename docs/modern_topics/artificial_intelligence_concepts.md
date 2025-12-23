# Artificial Intelligence Concepts

For as long as there have been computers, there has been a question: *Can a machine think?*

**Artificial Intelligence (AI)** is the branch of computer science dedicated to creating systems capable of performing tasks that typically require human intelligence, such as recognizing speech, making decisions, or playing games.

## 1. The Two Paths of AI

Historically, there have been two ways to build "intelligence":

### A. Symbolic AI (The Rule-Book)
Also known as "Good Old Fashioned AI" (GOFAI). The idea is that intelligence comes from manipulating symbols according to logical rules.
-   **Method:** "If the light is red, then stop."
-   **Strength:** Excellent for math and logic.
-   **Weakness:** Fails at "messy" real-world tasks like identifying a cat in a photo.

### B. Connectionism (The Brain-Model)
Inspired by the human brain. Instead of rules, we build a "Neural Network" of simple nodes that learn patterns through experience.
-   **Method:** Show the machine 10,000 photos of cats until it "recognizes" the pattern.
-   **Strength:** Excellent for vision, speech, and translation.
-   **Weakness:** A "Black Box"—it’s hard to explain *why* it made a specific decision.

## 2. Machine Learning (ML)

Most modern AI is actually **Machine Learning**. This is a subset of AI where the computer improves its performance on a task by analyzing data, rather than being explicitly programmed with rules.

### The Three Types of Learning:
1.  **Supervised Learning:** Learning with a teacher. We give the machine "Labeled Data" (Input + Correct Answer). 
    - *Example:* Spam filters (This email is Spam / Not Spam).
2.  **Unsupervised Learning:** Learning alone. The machine looks for hidden patterns in data without being told what they are.
    - *Example:* Grouping customers by their shopping habits.
3.  **Reinforcement Learning:** Learning by trial and error. The machine receives "rewards" for good moves and "penalties" for bad ones.
    - *Example:* An AI learning to play chess or drive a car.

## 3. Heuristics: Rules of Thumb

Because some problems are too complex to solve perfectly (remember P vs NP?), AI often uses **Heuristics**. 

A heuristic is a mental shortcut or "rule of thumb" that finds a "good enough" solution quickly, even if it's not the mathematically perfect one.

## Practice Problems

??? question "Practice Problem 1: Symbolic or Connectionist?"

    An AI system is built to help a doctor diagnose diseases. It uses a massive list of rules written by medical experts (e.g., "If patient has a fever AND a cough, check for flu"). Is this Symbolic or Connectionist?

    ??? tip "Solution"
        **Symbolic AI.**
        
        It is based on explicit logical rules provided by humans. This is often called an **Expert System**.

??? question "Practice Problem 2: Type of Learning"

    You want to build an AI that can look at a photo of a piece of fruit and tell you if it is an Apple, Orange, or Banana. You have 5,000 photos that are already labeled with the correct fruit name. Which type of learning should you use?

    ??? tip "Solution"
        **Supervised Learning.**
        
        Since you have "labeled data" (the fruit names), you can train the model to map the input (pixels) to the correct output (label).

## Key Takeaways

| Term | Meaning |
| :--- | :--- |
| **AI** | The broad field of "intelligent" machines. |
| **Machine Learning** | Learning from data instead of rules. |
| **Neural Network** | A brain-inspired model for finding patterns. |
| **Supervised Learning** | Training with labeled examples. |
| **Heuristic** | A practical "shortcut" to find a quick solution. |

---

AI is moving from "calculating" to "perceiving." By shifting from rigid rules to flexible learning, we have enabled computers to interact with the messy, unpredictable world in ways that were once thought to be pure science fiction.
