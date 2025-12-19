# Procedures and Higher-Order Functions

When you calculate the total price of an item including tax, you don't rederive the formula every time. You have a mental procedure: multiply the price by the tax rate, add the result to the original price, done. When a chef teaches an apprentice to make a sauce, they don't list every molecular interaction—they provide a procedure: heat butter, add flour, whisk until smooth, gradually add milk.

Procedures are recipes for computation. They package sequences of steps into reusable units with names. But what happens when procedures themselves become ingredients—when you pass one procedure to another, or return a new procedure as a result? That's when you enter the realm of **higher-order functions**, one of the most powerful ideas in computer science.

## What is a Procedure?

A **procedure** (also called a function, subroutine, or method) is a named sequence of instructions that performs a specific task.

**Key characteristics:**

- **Name**: Identifies the procedure (`calculateTotal`, `sortList`, `findMax`)
- **Parameters**: Inputs the procedure needs (also called arguments)
- **Body**: The sequence of steps to execute
- **Return value**: Output the procedure produces (optional)

**Analogy:** Think of a procedure like a vending machine:

- You insert coins and press a button (parameters)
- Internal mechanism does its work (body)
- You receive your snack (return value)

The machine's internal complexity is hidden—you only interact through its interface.

## Pseudocode: A Language-Neutral Format

**Pseudocode** is a way to describe algorithms without committing to a specific programming language's syntax. It prioritizes clarity and readability over executability.

**Characteristics:**

- Uses plain English mixed with programming constructs
- No strict syntax rules (as long as meaning is clear)
- Focuses on logic, not implementation details

**Common conventions:**

| Construct | Pseudocode Example |
|:----------|:-------------------|
| **Assignment** | `x ← 5` or `x = 5` |
| **Function call** | `result ← calculateTax(100, 0.05)` |
| **If statement** | `if x > 0 then` ... `endif` |
| **Loop** | `while x < 10 do` ... `endwhile` |
| **Function definition** | `function name(param1, param2)` ... `return value` |
| **Comment** | `// This is a comment` |

### Why Use Pseudocode?

1. **Language-agnostic**: Describe algorithms before choosing Python, Java, C++, etc.
2. **Focus on logic**: Don't get bogged down in syntax details
3. **Communication**: Share ideas with non-programmers or different dev teams
4. **Planning**: Design before coding (avoiding premature implementation)

## Defining a Simple Procedure

### Example: Squaring a Number

**Task:** Create a procedure that squares a number.

**Pseudocode:**

```
function square(x)
    result ← x * x
    return result
endfunction
```

**Equivalent in Python:**

```python title="Square Function in Python" linenums="1"
def square(x):  # (1)!
    result = x * x  # (2)!
    return result  # (3)!
```

1. Define function named `square` with parameter `x`
2. Compute x squared and store in `result`
3. Return the computed value to the caller

**Usage:**

```
answer ← square(5)    // answer = 25
```

### Example: Computing Total Cost

**Task:** Calculate the total cost of an item including sales tax.

**Pseudocode:**

```
function COMP-COST(price, taxRate)
    salesTax ← price * taxRate
    totalCost ← price + salesTax
    return totalCost
endfunction
```

**Step-by-step:**

1. **Input**: `price` (item cost), `taxRate` (as decimal, e.g., 0.05 for 5%)
2. **Computation**: Multiply price by tax rate to get tax amount
3. **Computation**: Add tax to original price
4. **Output**: Return total cost

**Example usage:**

```
total ← COMP-COST(100, 0.05)
// total = 100 + (100 * 0.05) = 100 + 5 = 105
```

**Another example:**

```
total ← COMP-COST(13, 0.05)
// total = 13 + (13 * 0.05) = 13 + 0.65 = 13.65
```

### Anatomy of a Procedure

**Structure:**

```
function name(parameter1, parameter2, ...)
    // Procedure body: sequence of statements
    // Can include variables, conditionals, loops, etc.
    return value  // Optional
endfunction
```

**Components:**

| Component | Purpose | Example |
|:----------|:--------|:--------|
| **Name** | Identifies the procedure | `COMP-COST` |
| **Parameters** | Inputs (can be zero or more) | `price`, `taxRate` |
| **Body** | Steps to execute | `salesTax ← price * taxRate` |
| **Return** | Output value | `return totalCost` |

**Parameters vs. Arguments:**

- **Parameters**: Variables in the function definition (`price`, `taxRate`)
- **Arguments**: Actual values passed when calling (`100`, `0.05`)

## Why Procedures Matter

Procedures provide:

### 1. Abstraction

Hide complexity behind a simple interface. Users don't need to know *how* `COMP-COST` works, just *what* it does.

### 2. Reuse

Write once, use many times:

```
total1 ← COMP-COST(50, 0.08)
total2 ← COMP-COST(200, 0.08)
total3 ← COMP-COST(75, 0.08)
```

Without procedures, you'd duplicate the calculation logic three times.

### 3. Maintainability

If the tax calculation formula changes (e.g., adding rounding), update one place:

```
function COMP-COST(price, taxRate)
    salesTax ← round(price * taxRate, 2)  // Round to 2 decimal places
    totalCost ← price + salesTax
    return totalCost
endfunction
```

All callers automatically benefit.

### 4. Testability

Test procedures in isolation:

```
assert COMP-COST(100, 0.05) = 105
assert COMP-COST(13, 0.05) = 13.65
assert COMP-COST(0, 0.05) = 0
```

### 5. Readability

Compare:

**Without procedures:**

```
total1 ← 100 + (100 * 0.05)
total2 ← 200 + (200 * 0.05)
```

**With procedures:**

```
total1 ← COMP-COST(100, 0.05)
total2 ← COMP-COST(200, 0.05)
```

The second version clearly communicates intent.

## Higher-Order Functions

A **higher-order function** is a function that:

1. **Takes one or more functions as parameters**, and/or
2. **Returns a function as its result**

This treats functions as first-class values—they can be passed around like numbers or strings.

### Why "Higher-Order"?

The terminology comes from mathematics:

- **First-order** functions operate on data (numbers, strings, etc.)
- **Higher-order** functions operate on functions themselves

**Example from calculus:**

The derivative operator takes a function and returns a new function:

```
d/dx(f) → f'
```

If \(f(x) = x^2\), then \(f'(x) = 2x\). The derivative operator is higher-order.

## Example 1: Reducing Repetition

### The Problem

Suppose you run a retail store with a fixed 5% sales tax. Every time you calculate total cost, you must specify the tax rate:

```
total1 ← COMP-COST(50, 0.05)
total2 ← COMP-COST(100, 0.05)
total3 ← COMP-COST(75, 0.05)
total4 ← COMP-COST(120, 0.05)
```

Repeating `0.05` is tedious and error-prone. If the tax rate changes, you must update every call.

### The Solution: Partial Application

Create a specialized version of `COMP-COST` that "bakes in" the tax rate:

**Pseudocode:**

```
function makeFixedTaxCalculator(fixedTaxRate)
    function calculate(price)
        return COMP-COST(price, fixedTaxRate)
    endfunction
    return calculate
endfunction
```

**Usage:**

```
calcWith5PercentTax ← makeFixedTaxCalculator(0.05)

total1 ← calcWith5PercentTax(50)      // 52.50
total2 ← calcWith5PercentTax(100)     // 105.00
total3 ← calcWith5PercentTax(75)      // 78.75
```

**What happened:**

1. `makeFixedTaxCalculator(0.05)` returns a *new function*
2. That new function "remembers" `fixedTaxRate = 0.05` (a **closure**)
3. When you call `calcWith5PercentTax(50)`, it uses the remembered tax rate

**Benefits:**

- Tax rate specified once
- If tax rate changes, create new calculator: `calcWith6PercentTax ← makeFixedTaxCalculator(0.06)`
- Clearer intent: "calculate with 5% tax"

### Closures

A **closure** is a function that "closes over" (captures) variables from its surrounding scope.

In the example above, the inner `calculate` function captures `fixedTaxRate` from the outer `makeFixedTaxCalculator` function. Even after `makeFixedTaxCalculator` returns, `fixedTaxRate` remains accessible to `calculate`.

**Visual representation:**

```
makeFixedTaxCalculator(0.05)
    ↓
  [Closure: calculate function]
  Captured: fixedTaxRate = 0.05
    ↓
  calcWith5PercentTax(50)
    ↓
  COMP-COST(50, 0.05) → 52.50
```

## Example 2: Functions as Parameters

### The Problem

You have a list of numbers and want to perform various operations:

- Square each number
- Double each number
- Negate each number

**Naive approach:** Write separate functions:

```
function squareAll(numbers)
    result ← []
    for each num in numbers
        result.append(num * num)
    endfor
    return result
endfunction

function doubleAll(numbers)
    result ← []
    for each num in numbers
        result.append(num * 2)
    endfor
    return result
endfunction

function negateAll(numbers)
    result ← []
    for each num in numbers
        result.append(-num)
    endfor
    return result
endfunction
```

**Problem:** Nearly identical code—only the operation (`num * num`, `num * 2`, `-num`) differs.

### The Solution: Higher-Order Map

Define a general `map` function that applies *any* function to each element:

```
function map(func, numbers)
    result ← []
    for each num in numbers
        result.append(func(num))
    endfor
    return result
endfunction
```

**Now define simple helper functions:**

```
function square(x)
    return x * x
endfunction

function double(x)
    return x * 2
endfunction

function negate(x)
    return -x
endfunction
```

**Usage:**

```
numbers ← [1, 2, 3, 4, 5]

squared ← map(square, numbers)     // [1, 4, 9, 16, 25]
doubled ← map(double, numbers)     // [2, 4, 6, 8, 10]
negated ← map(negate, numbers)     // [-1, -2, -3, -4, -5]
```

**Benefits:**

- One `map` function handles all cases
- To add a new operation, just define a one-line function
- Reusable across different data sets

**In Python:**

```python title="Higher-Order Map Function" linenums="1"
def map_function(func, numbers):  # (1)!
    result = []
    for num in numbers:
        result.append(func(num))  # (2)!
    return result

def square(x):
    return x * x

numbers = [1, 2, 3, 4, 5]
squared = map_function(square, numbers)  # (3)!
print(squared)  # [1, 4, 9, 16, 25]
```

1. `map_function` takes a function `func` and a list `numbers` as parameters
2. Apply `func` to each element—this is where higher-order magic happens
3. Pass the `square` function itself (not its result) to `map_function`

## Currying

**Currying** transforms a function that takes multiple arguments into a sequence of functions, each taking a single argument.

**Named after:** Haskell Curry (mathematician and logician), though the concept predates him.

### Example: Addition

**Normal function:**

```
function add(x, y)
    return x + y
endfunction

result ← add(3, 4)  // 7
```

**Curried version:**

```
function addCurried(x)
    function inner(y)
        return x + y
    endfunction
    return inner
endfunction
```

**Usage:**

```
add3 ← addCurried(3)     // Returns a function that adds 3
result ← add3(4)         // 7

add10 ← addCurried(10)   // Returns a function that adds 10
result2 ← add10(5)       // 15
```

**Or inline:**

```
result ← addCurried(3)(4)  // 7
```

### Why Curry?

**Partial application**: Create specialized versions by fixing some arguments.

**Example: Logging with timestamp**

```
function log(level, message)
    print(level + ": " + message)
endfunction

log("ERROR", "File not found")    // ERROR: File not found
log("INFO", "Server started")     // INFO: Server started
```

**Curried version:**

```
function logCurried(level)
    function inner(message)
        print(level + ": " + message)
    endfunction
    return inner
endfunction

logError ← logCurried("ERROR")
logInfo ← logCurried("INFO")

logError("File not found")      // ERROR: File not found
logInfo("Server started")       // INFO: Server started
```

**Benefit:** `logError` and `logInfo` are reusable, self-documenting functions.

## Real-World Applications

### 1. Event Handlers (GUI Programming)

In graphical interfaces, you often pass functions to handle events:

```
button.onClick(saveDocument)
textBox.onChange(validateInput)
```

Here, `onClick` and `onChange` are higher-order functions—they take functions as parameters.

### 2. Callbacks (Asynchronous Programming)

```
fetchDataFromServer(url, function(response) {
    processData(response)
})
```

The second parameter is a callback function executed when data arrives.

### 3. Functional Programming (map, filter, reduce)

Modern languages provide built-in higher-order functions:

**Map:** Apply function to each element

```python
squared = list(map(lambda x: x**2, [1, 2, 3, 4]))
# [1, 4, 9, 16]
```

**Filter:** Keep elements matching condition

```python
evens = list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4, 5, 6]))
# [2, 4, 6]
```

**Reduce:** Combine elements into single value

```python
from functools import reduce
product = reduce(lambda x, y: x * y, [1, 2, 3, 4])
# 1 * 2 * 3 * 4 = 24
```

### 4. Decorators (Python) / Middleware (Web Frameworks)

**Decorators** wrap functions to add behavior:

```python
@log_execution_time
def slow_function():
    # ...
```

The `@log_execution_time` decorator is a higher-order function that takes `slow_function`, wraps it with timing logic, and returns the wrapped version.

## Historical Context

### Lambda Calculus (1930s)

Alonzo Church invented **λ-calculus**, a formal system where:

- Everything is a function
- Functions can take functions as inputs
- Functions can return functions

This became the theoretical foundation for functional programming.

**Example:** The λ-calculus expression for `add(3, 4)`:

```
(λx. λy. x + y)(3)(4)
```

This is currying in its purest form.

### Lisp (1958)

John McCarthy's Lisp was the first language with first-class functions—functions could be passed as arguments, returned from functions, and stored in variables.

### Modern Languages

Higher-order functions are now mainstream:

- **JavaScript**: `.map()`, `.filter()`, `.reduce()`, arrow functions
- **Python**: `map()`, `filter()`, lambda expressions, decorators
- **Java**: Streams API, method references (Java 8+)
- **C++**: `std::function`, lambdas (C++11+)
- **Rust**: Closures, iterator adapters

## Practice Problems

??? question "Practice Problem 1: Define COMP-COST"

    Write a procedure `COMP-COST` in pseudocode that:

    - Takes two parameters: `price` and `taxRate`
    - Calculates sales tax as `price * taxRate`
    - Returns total cost (price + tax)

    Test with `COMP-COST(13, 0.05)` → expected result: 13.65

    ??? tip "Solution"

        ```
        function COMP-COST(price, taxRate)
            salesTax ← price * taxRate
            totalCost ← price + salesTax
            return totalCost
        endfunction
        ```

        **Test:**

        ```
        result ← COMP-COST(13, 0.05)
        // salesTax = 13 * 0.05 = 0.65
        // totalCost = 13 + 0.65 = 13.65
        ```

        **Result:** 13.65 ✓

??? question "Practice Problem 2: Fixed Tax Rate Version"

    Create a higher-order function `makeFixedTaxCalculator(taxRate)` that returns a new function accepting only `price`.

    Use it to create `calcWith5Percent` and calculate totals for prices [10, 20, 30].

    ??? tip "Solution"

        ```
        function makeFixedTaxCalculator(fixedTaxRate)
            function calculate(price)
                return COMP-COST(price, fixedTaxRate)
            endfunction
            return calculate
        endfunction

        // Create specialized calculator
        calcWith5Percent ← makeFixedTaxCalculator(0.05)

        // Use it
        total1 ← calcWith5Percent(10)     // 10.50
        total2 ← calcWith5Percent(20)     // 21.00
        total3 ← calcWith5Percent(30)     // 31.50
        ```

        **Results:** [10.50, 21.00, 31.50]

??? question "Practice Problem 3: Implement Map"

    Write a `map` function in pseudocode that takes a function and a list, applying the function to each element.

    Define a `triple` function that multiplies by 3, then use `map` to triple the list [1, 2, 3, 4].

    ??? tip "Solution"

        ```
        function map(func, list)
            result ← []
            for each item in list
                result.append(func(item))
            endfor
            return result
        endfunction

        function triple(x)
            return x * 3
        endfunction

        numbers ← [1, 2, 3, 4]
        tripled ← map(triple, numbers)
        // tripled = [3, 6, 9, 12]
        ```

        **Verification:**

        - `triple(1) = 3`
        - `triple(2) = 6`
        - `triple(3) = 9`
        - `triple(4) = 12`

        **Result:** [3, 6, 9, 12] ✓

??? question "Practice Problem 4: Curry a Function"

    Write a curried version of a `multiply(x, y)` function.

    Use it to create a `double` function (multiply by 2) and a `triple` function (multiply by 3).

    ??? tip "Solution"

        ```
        function multiplyCurried(x)
            function inner(y)
                return x * y
            endfunction
            return inner
        endfunction

        // Create specialized functions
        double ← multiplyCurried(2)
        triple ← multiplyCurried(3)

        // Use them
        result1 ← double(5)     // 10
        result2 ← triple(5)     // 15
        result3 ← double(7)     // 14
        ```

        **Alternative inline usage:**

        ```
        result ← multiplyCurried(4)(5)  // 20
        ```

## Key Takeaways

| Concept | Meaning |
|:--------|:--------|
| **Procedure** | Named sequence of instructions with parameters and return value |
| **Pseudocode** | Language-neutral algorithm description prioritizing clarity |
| **Higher-Order Function** | Function that takes or returns other functions |
| **Closure** | Function that captures variables from surrounding scope |
| **Currying** | Transforming multi-argument function into sequence of single-argument functions |
| **Partial Application** | Fixing some arguments to create specialized function |
| **First-Class Functions** | Functions treated as values (can be passed, returned, stored) |

## Why Procedures and Higher-Order Functions Matter

These concepts are fundamental because they enable:

- **Abstraction**: Hide complexity, expose simple interfaces
- **Reuse**: Write once, use everywhere
- **Composability**: Combine simple functions into complex behaviors
- **Maintainability**: Change logic in one place
- **Expressiveness**: Code that reads like the problem domain

Higher-order functions, in particular, represent a shift in thinking: instead of just operating on data, you operate on *operations themselves*. This meta-level reasoning unlocks powerful patterns—from event handling to functional programming to domain-specific languages.

## Further Reading

- **David Evans, [Introduction to Computing](https://computingbook.org/)** — Chapters 3-4 cover procedures and abstraction
- **Abelson & Sussman, [Structure and Interpretation of Computer Programs](https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/6515/sicp.zip/index.html)** — Definitive text on procedures and higher-order functions
- **[Computational Thinking](computational_thinking.md)** — Abstraction and algorithm design
- **[Scheme and Parse Trees](scheme_and_parse_trees.md)** — First-class functions in Scheme

---

Procedures transform sequences of steps into reusable building blocks. Higher-order functions let you compose those blocks in infinitely flexible ways. Together, they form the foundation of abstraction—the single most important idea in computer science. Master them, and you've mastered the art of managing complexity.


