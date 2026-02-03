---
description: OOP Encapsulation: Hiding complexity behind clean interfaces.
---
# OOP: Encapsulation

Imagine you are using a TV remote. To turn up the volume, you press a button labeled `+`. You don't need to open the remote, touch the copper wires, or understand the infrared signals being sent. The complex internal "wiring" is hidden from you, and you are given a simple "interface" (the buttons).

In programming, this is called **Encapsulation**. It is the practice of bundling data and the methods that act on that data into a single unit (the Class) and **restricting access** to the internal details.

## The "Black Box" Concept

Encapsulation turns an object into a "Black Box." 

-   **The Interface (Public):** The methods and attributes that the outside world is allowed to see and use.
-   **The Implementation (Private):** The internal logic and variables that are hidden from the outside world.

### Why Hide the Details?

1.  **Protection (Integrity):** If a `BankAccount` object has a `balance` variable, you don't want other parts of the program setting `balance = -1000000` directly. By making it private, you force users to go through a `withdraw()` method that checks if they have enough money first.
2.  **Flexibility:** You can change how the "wiring" works inside the object without breaking the rest of the program. As long as the `+` button on the remote still turns up the volume, the user doesn't care if you replaced the circuit board inside.
3.  **Simplicity:** Users of your class don't need to understand its 500 lines of internal logic; they just need to know the 3 methods they can call.

## Getters and Setters: The Security Guards

If we make our data private, how do we see or change it? We use "Security Guard" methods:

-   **Getter:** A method that returns the value (e.g., `get_balance()`).
-   **Setter:** A method that validates and updates the value (e.g., `set_balance(amount)`).

## Code Example (Python)

In Python, we use a single underscore `_` or double underscore `__` to indicate that a variable is "private" (by convention).

```python title="Encapsulation in Python" linenums="1"
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self._balance = balance  # (1)!

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            print(f"Deposited {amount}. New balance: {self._balance}")
        else:
            print("Invalid deposit amount!")

    def get_balance(self):  # (2)!
        return self._balance

# Usage
my_account = BankAccount("Brad", 1000)

# my_account._balance = -5000  # (3)!
my_account.deposit(500)      # (4)!
print(my_account.get_balance())
```

1.  The underscore `_` tells other programmers: "This is internal, don't touch it directly!"
2.  A **Getter** method provides a safe way to view the balance.
3.  **DON'T DO THIS:** Accessing the private variable directly is bad practice and bypasses the rules.
4.  **DO THIS:** Interact with the object through its public interface.

## Practice Problems

??? question "Practice Problem 1: The Remote Control"

    In our TV Remote analogy, which of these is part of the **Interface** and which is part of the **Implementation**?
    1. The plastic "Power" button.
    2. The specific frequency of the infrared light.
    3. The battery voltage sensor logic.
    4. The "Channel Up" button.

    ??? tip "Solution"
        -   **Interface:** Power button, Channel Up button (These are the "Public" parts we interact with).
        -   **Implementation:** Infrared frequency, Battery sensor logic (These are the "Private" internal details).

??? question "Practice Problem 2: Validation"

    Why is a **Setter** method better than letting someone change a variable directly?

    ??? tip "Solution"
        A Setter allows for **validation**. For example, if you have a `Person` class with an `age` attribute, a `set_age()` method can prevent someone from setting the age to `-5` or `500`. Direct access has no way to enforce these rules.

## Key Takeaways

| Term | Meaning |
| :--- | :--- |
| **Encapsulation** | Bundling data/methods and hiding internal details. |
| **Public Interface** | The methods and properties intended for outside use. |
| **Private State** | Data that should only be modified by the object itself. |
| **Getter/Setter** | Methods used to safely interact with private data. |

---

Encapsulation is about **trust**. By hiding the complexity and protecting the data, you create objects that are reliable, secure, and easy to maintain. It is the first step toward building professional-grade software.
