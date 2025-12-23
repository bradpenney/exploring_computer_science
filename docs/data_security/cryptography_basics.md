# Cryptography Basics

The word "Cryptography" comes from the Greek *kryptos* (hidden). It is the science of keeping information secret.

For thousands of years, generals used codes to send orders to armies. Today, your browser uses cryptography every time you visit a bank website.

## 1. Symmetric Encryption (The Shared Key)

Imagine a safe with a single key. You put a message in the safe, lock it, and send the safe to your friend. Your friend uses **the same key** to unlock it.

-   **Algorithm:** AES (Advanced Encryption Standard).
-   **Pros:** Very fast. Good for encrypting large files.
-   **Cons:** **Key Distribution.** How do you get the key to your friend without a hacker seeing it? You can't just email it!

## 2. Asymmetric Encryption (Public Key)

This was a mathematical breakthrough in the 1970s. Imagine a mailbox.

-   **Public Key (The Slot):** Anyone can put a letter *in* the mailbox. You give this key to the world.
-   **Private Key (The Key):** Only *you* can open the mailbox and take letters *out*. You keep this key secret.

If Alice wants to send Bob a secret:
1.  Alice looks up Bob's **Public Key**.
2.  Alice encrypts the message with it.
3.  Alice sends the encrypted message.
4.  Bob decrypts it with his **Private Key**.

-   **Algorithm:** RSA, ECC (Elliptic Curve).
-   **Pros:** No need to share secret keys!
-   **Cons:** Very slow. Usually used just to exchange a Symmetric Key securely.

## 3. Hashing (Digital Fingerprints)

Encryption is two-way (scramble -> unscramble). **Hashing** is one-way.

A Hash Function takes any amount of data (a password, a file, a movie) and turns it into a fixed-size string of characters (the "Hash" or "Digest").

**Properties:**
1.  **One-Way:** You cannot turn the hash back into the original data.
2.  **Deterministic:** The same input always gives the same hash.
3.  **Sensitive:** Changing *one bit* of the input completely changes the hash.

**Use Case: Passwords**
Websites never store your actual password. They store the **Hash** of your password. When you log in, they hash what you typed and compare it to the stored hash. If hackers steal the database, they only get the hashes, not the passwords.

## Summary Table

| Type | Keys | Direction | Use Case |
| :--- | :--- | :--- | :--- |
| **Symmetric** | 1 (Shared) | Two-way | Encrypting hard drives, WiFi. |
| **Asymmetric** | 2 (Public/Private) | Two-way | Secure web browsing (HTTPS), Digital Signatures. |
| **Hashing** | 0 | One-way | Storing passwords, verifying file integrity. |

## Practice Problems

??? question "Practice Problem 1: Safe Communication"

    Alice and Bob have never met. They want to chat securely over the internet. Which encryption method allows them to start talking without a hacker listening in?

    ??? tip "Solution"
        **Asymmetric Encryption.**
        
        Alice sends Bob her Public Key. Bob uses it to encrypt a "Session Key" (Symmetric) and sends it back. Only Alice can decrypt it with her Private Key. Now they both have the Symmetric Key and can talk fast and securely. This is how **HTTPS/TLS** works.

??? question "Practice Problem 2: Hashing"

    If you download a large file and the website provides a "SHA-256 Checksum," what is that for?

    ??? tip "Solution"
        **Integrity.**
        
        You can hash the file you downloaded. If your hash matches the website's hash, you know the file is 100% identical (no corruption, no viruses added).

## Key Takeaways

| Term | Meaning |
| :--- | :--- |
| **Encryption** | Scrambling data so it is unreadable. |
| **Decryption** | Unscrambling data back to original form. |
| **Key** | The secret password used to encrypt/decrypt. |
| **Hash** | A unique, one-way fingerprint of data. |

---

Cryptography is the only reason the modern digital economy exists. Without it, we couldn't buy things online, log into email, or trust that our bank balances are real. It is the mathematics of trust.
