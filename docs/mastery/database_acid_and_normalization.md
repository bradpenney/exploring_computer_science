# Database Theory: ACID and Normalization

Building a database isn't just about dumping data into tables. It's about ensuring that data remains **valid**, **consistent**, and **reliable**, even when things go wrong.

To achieve this, computer scientists rely on two major concepts: the **ACID** guarantees and **Normalization**.

## 1. ACID: The Safety Net

Imagine you are transferring \$100 from Account A to Account B.
1.  Subtract \$100 from A.
2.  Add \$100 to B.

What happens if the power goes out after Step 1 but before Step 2? The money has vanished! **ACID** is the set of properties that prevents this.

### A - Atomicity (All or Nothing)
A transaction is treated as a single "Atom." Either **all** steps happen, or **none** of them happen. If the power fails, the database "Rolls Back" Step 1 as if it never occurred.

### C - Consistency (Follow the Rules)
The database must always move from one valid state to another valid state. It cannot break its own rules (e.g., "Account balance cannot be negative").

### I - Isolation (Wait Your Turn)
If two people try to edit the same record at the same time, they shouldn't mess each other up. The database processes transactions as if they happened one after another (Serialized).

### D - Durability (Written in Stone)
Once the database says "Success," that data is saved to the physical disk. Even if the server catches fire immediately afterwards, the data is safe on the hard drive.

## 2. Normalization: Organizing Data

**Normalization** is the process of organizing data to reduce **redundancy** (duplicates). 

**The Golden Rule:** Every piece of information should be stored in exactly one place.

If you store a customer's address in the `Orders` table, and they place 50 orders, you have stored their address 50 times. If they move, you have to update 50 rows. This is bad design. Instead, store the address once in the `Customers` table and reference it.

### The Normal Forms

-   **1NF (First Normal Form):** Each cell must contain a single value. No lists or comma-separated values in a single column.
-   **2NF (Second Normal Form):** All non-key columns must depend on the *entire* Primary Key.
-   **3NF (Third Normal Form):** All columns must depend *only* on the Primary Key, not on other columns. ("The Key, the whole Key, and nothing but the Key").

## Practice Problems

??? question "Practice Problem 1: ACID Failure"

    You buy a concert ticket online. The system charges your credit card but crashes before assigning you a seat. Which ACID property failed?

    ??? tip "Solution"
        **Atomicity.**
        
        The transaction (Charge Card + Assign Seat) should have been atomic. Since one part happened and the other didn't, the system failed to enforce Atomicity.

??? question "Practice Problem 2: Normalization"

    You have a table `Students` with a column `Classes` that contains: "Math, History, Science". Is this table in 1NF?

    ??? tip "Solution"
        **No.**
        
        1NF forbids multiple values in a single cell. You should create a separate `Enrollments` table where each class is a separate row linked to the student.

## Key Takeaways

| Concept | Meaning |
| :--- | :--- |
| **Atomicity** | All or nothing transactions. |
| **Consistency** | Data always follows the rules. |
| **Redundancy** | Storing the same data twice (Bad!). |
| **Normalization** | Splitting tables to remove redundancy. |

---

ACID keeps your data safe. Normalization keeps your data clean. Together, they form the bedrock of reliable information systems.
