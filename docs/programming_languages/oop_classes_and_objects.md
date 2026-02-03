---
description: The foundation of Object-Oriented Programming: Understanding Classes as blueprints and Objects as instances.
---
# OOP: Classes & Objects

In early programming, software was just a list of instructions (Procedural Programming). If you wanted to simulate a car, you’d have variables for `car_color`, `car_speed`, and a function `drive(car_speed)`.

As programs got larger, this "spaghetti of variables" became impossible to manage. **Object-Oriented Programming (OOP)** solved this by grouping data and behavior together into "Objects."

## The Blueprint: The Class

Imagine you are an architect. You draw up a set of plans for a house. These plans aren't a house—you can't live in them—but they describe exactly what every house built from those plans will look like.

In OOP, the **Class** is the blueprint. It defines:
1.  **Attributes (Properties):** What the object *knows* (data).
2.  **Methods (Functions):** What the object *does* (behavior).

## The Reality: The Object

When a builder takes those plans and builds an actual house on a specific lot, that is an **Object** (or an **Instance**). 

You can use the same Class (blueprint) to create thousands of Objects (houses). Each house will have its own unique color or address, but they all share the same structure defined by the Class.

### Example: A Video Game Character

Let's define a Class for a Player in an RPG.

**The Class (`Player`):**
-   **Attributes:** `name`, `health`, `level`.
-   **Methods:** `take_damage()`, `heal()`, `talk()`.

**The Objects (Instances):**
-   **Object 1:** `name="Brad"`, `health=100`, `level=5`.
-   **Object 2:** `name="Goblin"`, `health=20`, `level=1`.

## Code Example (Python)

```python title="Class and Object in Python" linenums="1"
class Player:
    def __init__(self, name, health):  # (1)!
        self.name = name  # (2)!
        self.health = health

    def take_damage(self, amount):  # (3)!
        self.health -= amount
        print(f"{self.name} took {amount} damage. Health: {self.health}")

# Creating Objects (Instantiation)
hero = Player("Aragorn", 100)
villain = Player("Sauron", 500)

# Calling Methods
hero.take_damage(10) # Aragorn took 10 damage. Health: 90
```

1.  The `__init__` method is the "Constructor"—it's called when you create a new object.
2.  `self` refers to the specific instance of the object being worked on.
3.  `take_damage` is a Method that changes the object's internal state.

## Why Use Objects?

1.  **Organization:** Related data and functions stay together.
2.  **Abstraction:** You don't need to know how `hero.take_damage()` works inside; you just call it.
3.  **Reuse:** You write the `Player` class once and use it for every character in the game.
4.  **Modeling:** It's easier for humans to think about "Objects" (Cars, Users, Accounts) than "Arrays and Integers."

## Practice Problems

??? question "Practice Problem 1: Class vs. Object"

    If "Dog" is the Class, what are some examples of Objects?

    ??? tip "Solution"
        -   Your dog, "Fido" (a Golden Retriever).
        -   The neighbor's dog, "Rex" (a Bulldog).
        -   A cartoon dog, "Snoopy".
        
        They are all "Dog" objects because they share the same attributes (breed, name) and behaviors (bark, eat, sleep).

??? question "Practice Problem 2: Identify Attribute vs. Method"

    In a `BankAccount` class, which of these is an **Attribute** and which is a **Method**?
    1. `balance`
    2. `withdraw()`
    3. `account_number`
    4. `deposit()`

    ??? tip "Solution"
        -   **Attributes:** `balance`, `account_number` (These are data).
        -   **Methods:** `withdraw()`, `deposit()` (These are actions/behaviors).

## Key Takeaways

| Term | Definition | Analogy |
| :--- | :--- | :--- |
| **Class** | The template or blueprint. | Architectural plans. |
| **Object** | A specific instance of a class. | The physical house. |
| **Attribute** | Data stored inside an object. | Color of the house. |
| **Method** | A function defined inside a class. | Opening the door. |

---

Classes and Objects are the building blocks of modern software engineering. By modeling our code after the real world, we can build systems that are more intuitive, more organized, and easier to scale.
