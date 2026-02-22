# Information Theory

In 1948, Claude Shannon published a paper that changed the world. Before Shannon, people thought communication was about electricity or radio waves. Shannon proved that communication is actually about **Mathematics**.

**Information Theory** is the study of how information is quantified, stored, and communicated. It provides the foundation for everything from the internet to the DNA in your cells.

## 1. What is Information?

In common language, "information" means knowledge. In computer science, information is the **reduction of uncertainty**.

Imagine I flip a coin. Before I tell you the result, you have 50/50 uncertainty. If I say "Heads," I have given you exactly **1 bit** of information because I have eliminated two possibilities.

-   If I tell you something you already knew (e.g., "The sun will rise tomorrow"), I have given you **0 bits** of information.
-   If I tell you something highly unlikely (e.g., "It is snowing in the Sahara Desert"), I have given you a lot of information because I have significantly reduced your uncertainty about a chaotic situation.

## 2. The Bit: The Atomic Unit

Shannon coined the term **Bit** (Binary Digit). A bit is the smallest possible unit of information. It represents a choice between two equally likely outcomes (0 or 1, Yes or No, True or False).

## 3. Entropy: Measuring Randomness

**Entropy** is a measure of how much "uncertainty" or "surprise" is in a message.

-   **Low Entropy:** Predictable data. (Example: `AAAAA`). There is very little information here because we know what's coming next.
-   **High Entropy:** Unpredictable data. (Example: `Xj9!pL`). Every character is a surprise.

## 4. Source Coding (Compression)

Because most human communication is redundant (e.g., in English, the letter "q" is almost always followed by "u"), we can compress it.

**Compression** is the process of representing high-entropy data with the fewest number of bits possible.
-   **Lossless Compression (ZIP):** Every bit is preserved. Essential for text and code.
-   **Lossy Compression (JPEG, MP3):** Throws away bits that humans won't notice (like very high-pitched sounds or subtle color shifts).

## Practice Problems

??? question "Practice Problem 1: Calculating Bits"

    I am thinking of a number between 1 and 8. How many bits of information do you need to find the number?

    ??? tip "Solution"
        **3 bits.**
        
        Each bit halves the search space:
        1. Bit 1: Is it 1-4 or 5-8? (Remaining: 4)
        2. Bit 2: Is it 1-2 or 3-4? (Remaining: 2)
        3. Bit 3: Is it 1 or 2? (Remaining: 1)
        
        Mathematically, $\log_2(8) = 3$.

??? question "Practice Problem 2: Entropy"

    Which message has higher entropy?
    A. `1010101010`
    B. `1100100101`

    ??? tip "Solution"
        **Message B.**
        
        Message A follows a strict, predictable pattern. Message B is more random/unpredictable, meaning it has higher entropy and carries more "information" per bit.

## Key Takeaways

| Concept | Meaning |
| :--- | :--- |
| **Information** | The reduction of uncertainty. |
| **Bit** | The unit of information (0 or 1). |
| **Entropy** | The amount of surprise/randomness in data. |
| **Compression** | Removing redundancy to save space. |

---

Information theory tells us that there is a physical limit to how much we can compress data and how fast we can send it over a wire. By understanding these limits, Shannon paved the way for the digital revolution, turning the messy world of signals into the precise world of bits.
