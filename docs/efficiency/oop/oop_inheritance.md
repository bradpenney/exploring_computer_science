# OOP: Inheritance

In the real world, we naturally group things into hierarchies. A **German Shepherd** is a type of **Dog**, and a **Dog** is a type of **Mammal**. Because a German Shepherd is a Dog, it automatically has certain traits (four legs, fur, barking) without us needing to redefine them every time.

In programming, this is called **Inheritance**. It allows us to create a new class (the **Child**) that "inherits" all the attributes and methods of an existing class (the **Parent**).

## The "Is-A" Relationship

The golden rule of inheritance is the **"Is-A" Relationship**. You should only use inheritance if the child truly "is a" version of the parent.

-   A **Square** "is a" **Shape**. (Inheritance makes sense)
-   A **Laptop** "is a" **Computer**. (Inheritance makes sense)
-   A **Car** "is a" **Steering Wheel**. (**No.** A car *has a* steering wheel, but it is not one. This is a different concept called "Composition").

## Parent vs. Child Classes

-   **Parent Class (Base Class):** The general class containing shared logic.
-   **Child Class (Derived Class):** The specific class that inherits from the parent and adds its own unique features.

### Why Use Inheritance?

1.  **Code Reuse (DRY):** You don't have to rewrite the same code for `Car`, `Truck`, and `Motorcycle` if they all share a `start_engine()` method. You put that in the `Vehicle` parent class once.
2.  **Extensibility:** You can create a specialized version of a class without modifying the original code.
3.  **Hierarchy:** It creates a logical structure for your software that reflects the real world.

## Method Overriding

Sometimes a child class inherits a method but needs to change how it works. This is called **Overriding**.

For example, every `Animal` might have a `make_sound()` method. But a `Dog` should override it to "Bark," while a `Cat` overrides it to "Meow."

## Code Example (Python)

```python title="Inheritance in Python" linenums="1"
class Vehicle: # (1)!
    def __init__(self, brand):
        self.brand = brand

    def drive(self):
        print(f"The {self.brand} is moving.")

class ElectricCar(Vehicle): # (2)!
    def __init__(self, brand, battery_size):
        super().__init__(brand) # (3)!
        self.battery_size = battery_size

    def drive(self): # (4)!
        print(f"The {self.brand} is gliding silently on {self.battery_size}kWh.")

# Usage
my_tesla = ElectricCar("Tesla", 75)
my_tesla.drive() # Output: The Tesla is gliding silently on 75kWh.
```

1.  **Parent Class**: A general `Vehicle`.
2.  **Child Class**: `ElectricCar` inherits from `Vehicle`.
3.  `super()`: This special function calls the constructor of the parent class so we can still set the `brand`.
4.  **Overriding**: We provide a new version of `drive` specifically for electric cars.

## Practice Problems

??? question "Practice Problem 1: Identify the Parent"

    In a software system for a library, you have classes for `Book`, `Magazine`, and `DVD`. What would be a good **Parent Class** for these?

    ??? tip "Solution"
        A good parent class would be **`LibraryItem`** or **`Resource`**. 
        
        All three share attributes like `title`, `call_number`, and `is_checked_out`, so those should live in the parent class.

??? question "Practice Problem 2: The Is-A Test"

    Does it make sense for a `SmartPhone` class to inherit from a `Screen` class? Why or why not?

    ??? tip "Solution"
        **No.**
        
        A `SmartPhone` is not a `Screen`. A smartphone *has* a screen. This fails the "Is-A" test. Inheritance here would lead to confusing code. A better approach is to have the `SmartPhone` class contain an instance of a `Screen` class as an attribute.

## Key Takeaways

| Term | Meaning |
| :--- | :--- |
| **Inheritance** | Creating a new class based on an existing one. |
| **Parent Class** | The base class that provides the foundation. |
| **Child Class** | The derived class that inherits and extends. |
| **super()** | A way to access methods from the parent class. |
| **Overriding** | Replacing a parent's method with a new version in the child. |

---

Inheritance is the foundation of building complex systems. It allows us to start with simple, general ideas and refine them into specific, powerful tools—all while keeping our code clean, organized, and reusable. 🌳
