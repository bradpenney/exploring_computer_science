# Information Security Basics

In the physical world, we protect valuables with locks, safes, and guards. in the digital world, we protect **Information**.

Information Security (InfoSec) is the practice of protecting information from unauthorized access, use, disclosure, disruption, modification, or destruction.

## The CIA Triad

The core goal of InfoSec is to maintain three key properties, known as the **CIA Triad**:

1.  **Confidentiality:** Only authorized people can see the data.
    -   *Failure:* A hacker steals your credit card number.
2.  **Integrity:** The data has not been tampered with.
    -   *Failure:* A hacker changes your bank balance from \$100 to \$0.
3.  **Availability:** The data is accessible when needed.
    -   *Failure:* A Denial of Service (DoS) attack takes down Netflix.

## Authentication vs. Authorization

These two terms sound similar but mean very different things.

1.  **Authentication (AuthN):** "Who are you?"
    -   Verifying identity (Passwords, Fingerprints, 2FA).
    -   *Analogy:* Showing your passport at the airport.
2.  **Authorization (AuthZ):** "What are you allowed to do?"
    -   Verifying permissions (Read-only, Admin, Edit).
    -   *Analogy:* Your boarding pass letting you on a specific flight, but not into the cockpit.

**You must be Authenticated *before* you can be Authorized.**

## Common Threats

### 1. Social Engineering (Phishing)
Hacking the **human**, not the computer. Sending a fake email ("Reset your password!") to trick a user into giving up their credentials. This is the most common way systems are breached.

### 2. Malware
Software designed to harm.
-   **Virus:** Attaches to a file and spreads.
-   **Worm:** Spreads automatically across a network.
-   **Ransomware:** Encrypts your files and demands payment to unlock them.

### 3. Man-in-the-Middle (MitM)
An attacker sits between you and the server (e.g., on public Wi-Fi) and intercepts your data. This is why we use **HTTPS** (Encryption).

## Practice Problems

??? question "Practice Problem 1: AuthN or AuthZ?"

    You swipe your badge to enter the office building. The reader beeps and unlocks the door. Is this Authentication or Authorization?

    ??? tip "Solution"
        **Both.**
        
        -   **Authentication:** The badge proves *who* you are (ID #12345).
        -   **Authorization:** The system checks if ID #12345 is *allowed* to enter that specific door at that time.

??? question "Practice Problem 2: CIA Failure"

    A hospital's patient database is encrypted so hackers can't read it, but a ransomware attack locks the hospital staff out of the system for 3 days. Which part of the CIA triad was compromised?

    ??? tip "Solution"
        **Availability.**
        
        The data was still Confidential (hackers didn't read it) and had Integrity (hackers didn't change the medical records), but it was not **Available** to the doctors who needed it.

## Key Takeaways

| Concept | Definition |
| :--- | :--- |
| **Confidentiality** | Secrecy. |
| **Integrity** | Accuracy/Trust. |
| **Availability** | Uptime. |
| **Authentication** | Identity Verification. |
| **Authorization** | Permission Management. |

---

Security is not a product you buy; it is a process. It requires constant vigilance, because while defenders have to be right 100% of the time, an attacker only has to be right once.
