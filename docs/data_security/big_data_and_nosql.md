# Big Data and NoSQL

For 40 years, Relational Databases (SQL) ruled the world. They were safe, consistent, and structured.

Then came Google, Facebook, and Amazon.

They generated data at a scale that traditional databases couldn't handle. "Big Data" broke the old rules, and a new generation of **NoSQL** databases was born.

## The 3 Vs of Big Data

When does "Data" become "Big Data"? It's defined by the 3 Vs:

1.  **Volume:** The sheer amount of data. (Terabytes? Petabytes? Exabytes?).
2.  **Velocity:** The speed at which data arrives. (Millions of tweets per second).
3.  **Variety:** The messiness of the data. (It’s not just neat tables anymore; it’s videos, JSON, logs, and free text).

## NoSQL (Not Only SQL)

To handle this, engineers built **NoSQL** databases. These databases often sacrifice some of the strict safety of SQL (like ACID or Normalization) in exchange for massive **Scale** and **Speed**.

### Types of NoSQL Databases:
-   **Document Stores (e.g., MongoDB):** Store data as JSON-like documents. Flexible schema (you can add new fields anytime).
-   **Key-Value Stores (e.g., Redis):** Like a giant Hash Map. Incredibly fast but simple.
-   **Column-Family (e.g., Cassandra):** Optimized for writing massive amounts of data across many servers.
-   **Graph Databases (e.g., Neo4j):** Optimized for storing connections (Social Networks).

## The CAP Theorem

In a distributed system (like a database spanning 100 servers), it is theoretically impossible to have perfection. You must choose.

The **CAP Theorem** states you can only have **two** of the following three:

1.  **Consistency:** Every read receives the most recent write. (Everyone sees the same data at the same time).
2.  **Availability:** Every request receives a response, without guarantee that it contains the most recent write. ( The system never goes down).
3.  **Partition Tolerance:** The system continues to operate despite an arbitrary number of messages being dropped or delayed by the network between nodes.

**The Reality:** In a distributed system, "Partition Tolerance" is mandatory (networks *will* fail). So, you really only have a choice between **CP** (Consistency) and **AP** (Availability).

-   **SQL Databases** usually choose **Consistency**. If the network breaks, they stop accepting writes to prevent errors.
-   **NoSQL Databases** often choose **Availability**. If the network breaks, they keep accepting writes, even if some users see slightly old data for a moment ("Eventually Consistent").

## Practice Problems

??? question "Practice Problem 1: Choosing a Database"

    You are building a social media feed where speed is critical. If a user sees a post 1 second later than their friend, it doesn't matter. Which CAP trade-off should you choose?

    ??? tip "Solution"
        **AP (Availability and Partition Tolerance).**
        
        You prioritize keeping the site up and fast (Availability) over ensuring everyone sees the exact same data at the exact same millisecond (Consistency). A NoSQL database is a good fit here.

??? question "Practice Problem 2: Banking"

    You are building a bank ledger. Which CAP trade-off is mandatory?

    ??? tip "Solution"
        **CP (Consistency and Partition Tolerance).**
        
        You cannot afford for money to "disappear" or for two ATMs to show different balances. You must choose Consistency, even if it means the ATM says "Service Unavailable" during a network glitch.

## Key Takeaways

| Feature | SQL | NoSQL |
| :--- | :--- | :--- |
| **Structure** | Rigid Tables. | Flexible Documents/Keys. |
| **Scaling** | Vertical (Bigger Server). | Horizontal (More Servers). |
| **Priority** | Consistency (ACID). | Speed and Scale (CAP). |
| **Best For** | Banks, Inventory, Financials. | Social Media, Real-time Analytics, IoT. |

---

Big Data isn't just "more data." It requires a fundamental shift in how we think about storage. We move from the comfortable certainty of "ACID" to the chaotic, eventual reality of "BASE" (Basically Available, Soft state, Eventual consistency).
