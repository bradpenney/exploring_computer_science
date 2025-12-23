# Database Fundamentals

If you're writing a small script, saving data to a text file or a spreadsheet is fine. But what happens when you have 10,000 users trying to save data at the exact same millisecond? Or when you need to find one specific customer among 50 million records instantly?

Text files crash. Spreadsheets freeze. For this, we need a **Database**.

## 1. The DBMS (Database Management System)

A database isn't just a file. It is managed by a piece of software called the **DBMS** (e.g., PostgreSQL, MySQL, SQLite, Oracle).

The DBMS is the gatekeeper.
-   It ensures data is saved correctly.
-   It prevents two people from overwriting each other.
-   It enforces security rules.
-   It optimizes searches (using "Indexes").

## 2. The Relational Model

Most of the world's data is stored in **Relational Databases**. This model was invented by E.F. Codd in 1970 and is based on set theory.

In this model, data is organized into **Tables** (formally called "Relations").

-   **Table (Relation):** A collection of data about a specific topic (e.g., `Customers`, `Orders`).
-   **Column (Attribute):** A specific piece of information (e.g., `Email`, `Phone Number`). Every column has a specific **Type** (Integer, Text, Date).
-   **Row (Tuple):** A single record (e.g., `Customer #42: Brad Penney`).
-   **Primary Key:** A unique ID that identifies a specific row (e.g., `CustomerID`).
-   **Foreign Key:** A reference to a Primary Key in another table. This is how we "Relate" data (e.g., An Order has a `CustomerID` that points to the Customer who made it).

## 3. SQL (Structured Query Language)

To talk to a Relational DBMS, we use a standard language called **SQL**.

It is a **Declarative** language (remember [Programming Paradigms](../programming_languages/programming_paradigms.md)?). You tell the database *what* you want, not *how* to find it.

**Example:**
```sql
SELECT name, email 
FROM customers 
WHERE city = 'New York';
```

## Why Not Just Use Files?

1.  **Concurrency:** A DBMS allows thousands of users to read/write at the same time.
2.  **Integrity:** You can set rules like "Email cannot be blank" or "Age must be > 0". The DBMS will reject any bad data.
3.  **Speed:** A DBMS uses fancy data structures (B-Trees) to find data in $O(\log N)$ time, whereas searching a text file is $O(N)$.

## Practice Problems

??? question "Practice Problem 1: Primary vs. Foreign Key"

    In an `Orders` table, you have a column called `Product_ID`. This ID connects the order to the `Products` table. Is `Product_ID` a Primary Key or a Foreign Key in the `Orders` table?

    ??? tip "Solution"
        **Foreign Key.**
        
        It is a "reference" to a key in another table. The `Primary Key` of the `Orders` table would be something like `Order_ID`, which uniquely identifies the order itself.

??? question "Practice Problem 2: Relational Integrity"

    If you try to delete a Customer from the database, but that Customer still has 5 active Orders, what should the DBMS do?

    ??? tip "Solution"
        **Block the deletion.**
        
        This is called **Referential Integrity**. If you deleted the Customer, the Orders would become "orphans" pointing to a Customer that doesn't exist. The DBMS prevents this to keep the data valid.

## Key Takeaways

| Term | Meaning |
| :--- | :--- |
| **DBMS** | The software that manages the database. |
| **Table** | A structured list of data (Relation). |
| **Row** | A single record (Tuple). |
| **Column** | A specific field/attribute. |
| **SQL** | The language used to query the database. |

---

Databases are the memory of civilization. They allow us to store vast amounts of information in a structured, retrievable way, forming the backbone of every bank, hospital, and website on Earth.
