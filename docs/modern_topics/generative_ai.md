# Generative AI

Traditional AI is "Discriminative." It looks at a photo and says, "That's a cat." It looks at an email and says, "That's spam." It classifies things that already exist.

**Generative AI** is different. It creates **new** content—text, images, music, or code—that has never existed before.

## 1. Large Language Models (LLMs)

When you use ChatGPT or Gemini, you are talking to a **Large Language Model**. 

These models are "Large" because they have been trained on almost all the text on the public internet—billions of books, articles, and code repositories. They are "Models" because they are mathematical representations of how human language works.

## 2. How it Works: Next Token Prediction

Despite how smart it feels, an LLM is essentially a very powerful version of "Auto-complete" on your phone.

1.  **Tokenization:** The model breaks your text into small chunks called **Tokens** (words or parts of words).
2.  **Probability:** It looks at the tokens you just typed and calculates the mathematical probability of what the **next** token should be.
3.  **Generation:** It picks the most likely token, adds it to the sequence, and repeats the process.

**Example:**
-   *Input:* "The capital of France is..."
-   *Model calculation:* "Paris" (99% probability), "Lyon" (0.5% probability).
-   *Output:* "Paris"

## 3. The Magic of Transformers

The breakthrough that made modern Generative AI possible was the **Transformer** architecture (invented by Google in 2017). 

Transformers use a mechanism called **Attention**. It allows the model to look at *every* word in a sentence at once to understand context. 

In the sentence *"The bank was closed because the river flooded,"* the model uses Attention to know that "bank" refers to a river bank, not a money bank, because it sees the word "river" elsewhere in the sentence.

## 4. Hallucinations: The Weakness

Because LLMs are based on **probability**, not **truth**, they can sometimes "Hallucinate." 

They might generate a sentence that sounds perfectly confident and grammatically correct but is factually wrong. They aren't "lying"—they are simply picking the most probable word sequence according to their training, even if that sequence doesn't match reality.

## Practice Problems

??? question "Practice Problem 1: Generative or Discriminative?"

    You use an app that takes a photo of a receipt and automatically extracts the Total Price and the Tax amount. Is this Generative AI?

    ??? tip "Solution"
        **No.** 
        
        This is **Discriminative AI** (or Computer Vision). It is identifying and classifying existing data on the receipt. If the app used that data to write a funny poem about your shopping habits, *that* would be Generative AI.

??? question "Practice Problem 2: Next Token Prediction"

    If an LLM is asked to complete the sentence "The sun rises in the...", why does it pick "East"?

    ??? tip "Solution"
        Because in its training data (billions of sentences), the token "East" followed that specific sequence of words more often than any other token. It is a mathematical prediction based on patterns in human language.

## Key Takeaways

| Concept | Meaning |
| :--- | :--- |
| **Generative AI** | AI that creates new data. |
| **LLM** | An AI trained on massive amounts of text. |
| **Transformer** | The architecture that allows AI to understand context. |
| **Token** | The basic unit of text the AI processes. |
| **Hallucination** | When an AI generates factually incorrect information. |

---

Generative AI has transformed the computer from a tool that *processes* our work into a partner that *collaborates* on it. While it lacks true "understanding," its ability to map the vast patterns of human creativity makes it one of the most powerful inventions in the history of computer science.
