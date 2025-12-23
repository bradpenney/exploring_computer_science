# OOP: Polymorphism

The word **Polymorphism** comes from the Greek words *poly* (many) and *morph* (form). In computer science, it refers to the ability of different objects to respond to the same command in their own unique way.

Imagine you have a universal remote with a "Play" button. 
-   If you point it at a **CD Player**, it starts spinning a disc.
-   If you point it at a **Netflix App**, it starts streaming a digital file.
-   If you point it at a **YouTube Tab**, it resumes a video.

The command is the same: "Play." But the **form** of the action depends entirely on which object is receiving the command.

## One Interface, Many Actions

Polymorphism allows us to write a single piece of code that can interact with many different types of objects, as long as they share the same "interface" (method names).

### Why Does This Matter?

Without polymorphism, if you wanted to draw a list of shapes, you would have to write complex `if` statements:
*"If it's a circle, use `draw_circle()`. If it's a square, use `draw_square()`."*

With polymorphism, you just say: **"Draw everything."** Every object knows how to draw itself.

## How it Works: Overriding

Polymorphism is the natural result of [Inheritance](oop_inheritance.md) and **Method Overriding**. 

When a Child class provides its own version of a Parent's method, it is participating in polymorphism. The computer decides *at runtime* which version of the method to call based on the specific object it is holding.

## Duck Typing (The Python Way)

In some languages (like Java), you must explicitly use inheritance to achieve polymorphism. Python is more relaxed. It uses **Duck Typing**:

> *"If it walks like a duck and it quacks like a duck, then it must be a duck."*

In Python, if an object has a `move()` method, you can use it in a function that expects things to move, regardless of whether that object is a `Car`, a `Person`, or a `Glacier`.

## Code Example (Python)

```python title="Polymorphism in Python" linenums="1"
class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

class Duck:
    def speak(self):
        return "Quack!"

# A function that doesn't care what the animal is, 
# as long as it can 'speak'.
def animal_concert(animals): # (1)!
    for animal in animals:
        print(animal.speak()) # (2)!

# Usage
pets = [Dog(), Cat(), Duck()]
animal_concert(pets)
```

1.  This function is **polymorphic**. It can handle a list of anything.
2.  The computer doesn't know if `animal` is a Dog or a Cat until the loop actually runs. It just looks for the `.speak()` method and calls the right version.

## Practice Problems

??? question "Practice Problem 1: The Remote Control"

    You are building a game with `Warrior`, `Mage`, and `Archer` classes. All of them inherit from a `Character` class that has an `attack()` method. 
    
    If you have a list called `party` containing one of each, and you run:
    ```python
    for member in party:
        member.attack()
    ```
    Which pillar of OOP are you using?

    ??? tip "Solution"
        **Polymorphism.**
        
        Even though the list contains different types of objects, you are treating them all as "Characters" and calling the same `attack()` method. Each object will execute its own specific version of that method (Sword swing, Fireball, or Arrow shot).

??? question "Practice Problem 2: Benefits"

    What is the main advantage of using polymorphism in a large software project?

    ??? tip "Solution"
        **Flexibility and Maintainability.**
        
        You can add a new type of object (e.g., a `Necromancer` class) without having to change any of the existing code that handles characters. As long as the `Necromancer` has an `attack()` method, it will work perfectly with your existing loops and systems.

## Key Takeaways

| Concept | Meaning |
| :--- | :--- |
| **Polymorphism** | "Many forms." One interface used for different types. |
| **Overriding** | Replacing a parent method to provide a specific polymorphic behavior. |
| **Interface** | The set of methods an object promises to have. |
| **Duck Typing** | Python's style of polymorphism based on behavior, not inheritance. |

---

Polymorphism is the ultimate tool for decoupling your code. It allows you to write high-level logic that doesn't get bogged down in the specific details of every single object, making your software more flexible, more scalable, and truly elegant. 🎭
