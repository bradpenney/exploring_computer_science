# What is Computer Science?

Here's a trick question: What do computers have to do with computer science?

Less than you'd think.

Computer science isn't really about computers, any more than astronomy is about telescopes or biology is about microscopes. Computers are tools we use, but the field itself is about something deeper: **computation**—the systematic study of what can be computed, how efficiently, and what it means to solve problems algorithmically.

## The Classic Definitions

Ask ten computer scientists what CS is, and you'll get twelve answers. 🤷 Here are some classics:

> "Computer science is no more about computers than astronomy is about telescopes."
> — Edsger Dijkstra

> "Computer science is the study of the principles and use of computers."
> — Encyclopaedia Britannica (less poetic, more accurate for practical purposes)

> "The discipline of computing is the systematic study of algorithmic processes that describe and transform information."
> — ACM/IEEE Computing Curricula (yes, this one's a mouthful, but it's accurate)

The common thread? **Algorithms** and **information**. Computers just happen to be really good at executing algorithms on information.

## The Core Questions

Computer science asks fundamental questions that would matter even if silicon chips had never been invented:

### What can be computed?

Not everything! Some problems are **undecidable**—no algorithm can ever solve them. The famous Halting Problem asks: "Given a program, will it eventually stop or run forever?" Alan Turing proved in 1936 that no general algorithm can answer this for all programs.

This matters because it sets limits on what we can automate. Some things require human judgment not because we haven't figured out the algorithm yet, but because no such algorithm can exist. Math said so! 🧮

### How efficiently can it be computed?

Even solvable problems vary wildly in difficulty. Sorting a million numbers? Easy—a fraction of a second. Finding the best route through 100 cities (the Traveling Salesman Problem)? Our best algorithms would take longer than the age of the universe. ⏳ Pack a lunch.

This is the study of **computational complexity**—categorizing problems by how their difficulty scales with size.

### How do we express computation?

This is where programming languages come in. But beneath the syntax lies a deeper question: What are the fundamental ways to describe processes? [Finite State Machines](finite_state_machines.md), [Recursive Transition Networks](recursive_transition_networks.md), [BNF grammars](backus_naur_form.md), lambda calculus, Turing machines—these are all answers to "How do we write down what we want a computer to do?"

### How do we build reliable systems?

Software is among the most complex things humans create. A modern operating system has tens of millions of lines of code. How do we build systems that work? That don't crash? That hackers can't break into? That scale to billions of users?

This encompasses software engineering, security, distributed systems, and more.

## The Major Subfields

Computer science is vast. Here's a map of the territory:

### Theory

The mathematical foundations (where the magic happens):

| Area | Key Questions |
|:-----|:--------------|
| **Algorithms** | What's the best way to solve this problem? |
| **Complexity** | How hard is this problem inherently? |
| **Computability** | Can this problem be solved at all? |
| **Formal Languages** | How do we describe and recognize patterns? |
| **Cryptography** | How do we secure information mathematically? |

### Systems

Building the infrastructure:

| Area | Key Questions |
|:-----|:--------------|
| **Operating Systems** | How do we manage hardware resources? |
| **Networks** | How do computers communicate? |
| **Databases** | How do we store and retrieve information efficiently? |
| **Compilers** | How do we translate high-level code to machine code? |
| **Distributed Systems** | How do we coordinate many computers? |

### Specialized Domains
Pushing the boundaries of what computers can do:

| Area | Key Questions |
|:-----|:--------------|
| **Artificial Intelligence** | Can machines think? Learn? Reason? |
| **Computer Graphics** | How do we generate images and animations? |
| **Computer Vision** | How do we understand images and video? |
| **Natural Language Processing** | How do we understand human language? |
| **Robotics** | How do we build machines that act in the world? |

### Software Engineering
The art and science of building robust software:

| Area | Key Questions |
|:-----|:--------------|
| **Software Engineering** | How do we build large systems reliably? |

### Human-Computer Interaction (HCI)
Designing for people:

| Area | Key Questions |
|:-----|:--------------|
| **Human-Computer Interaction** | How do we design usable interfaces? |

### Ethics & Society
Considering the impact:

| Area | Key Questions |
|:-----|:--------------|
| **Ethics** | What should we build? What shouldn't we? |
| **Privacy** | How do we protect personal information? |
| **Fairness** | Are our algorithms biased? |

## A Brief History

### Before Computers (–1940s)

Computer science ideas predate computers:

- **9th century**: Al-Khwarizmi develops algebra and systematic problem-solving (his name gives us "algorithm")
- **1843**: Ada Lovelace writes the first algorithm intended for a machine
- **1936**: Alan Turing defines computation mathematically; Alonzo Church develops lambda calculus

### The Pioneer Era (1940s–1960s)

- First electronic computers (ENIAC, UNIVAC)
- First programming languages (FORTRAN, LISP, COBOL)
- Dijkstra, Knuth, McCarthy lay theoretical foundations
- The term "software" is coined (1958)

### The Structured Era (1970s–1980s)

- Unix and C language
- Relational databases
- Personal computers arrive
- Object-oriented programming emerges
- The internet (ARPANET) grows

### The Networked Era (1990s–2000s)

- World Wide Web
- Java, Python, JavaScript
- Open source movement
- Google, Amazon, Facebook scale to billions

### The Modern Era (2010s–Present)

- Cloud computing becomes dominant
- Machine learning renaissance (deep learning)
- Mobile-first world
- Growing concerns about ethics, privacy, AI safety

## CS vs Programming vs IT

These terms are often confused:

| Field | Focus | Typical Questions |
|:------|:------|:------------------|
| **Computer Science** | Theory and foundations | "Is this problem solvable? How efficiently?" |
| **Software Engineering** | Building systems | "How do we build this reliably at scale?" |
| **Programming** | Writing code | "How do I implement this feature?" |
| **Information Technology** | Managing and maintaining computing infrastructure and services | "How do we deploy and maintain this?" |

A computer scientist might study whether a problem is solvable in polynomial time. A programmer implements a solution. An IT professional deploys it. These overlap, but they're distinct skill sets.

You can be an excellent programmer without knowing complexity theory. You can understand theory without being able to ship production code. The most powerful combination is both.

## Why Study Computer Science?

### It's Everywhere

Software runs the world. Banking, healthcare, transportation, communication, entertainment—all depend on computing. Understanding CS means understanding the infrastructure of modern life.

### Problem-Solving Skills Transfer

[Computational thinking](computational_thinking.md)—decomposition, abstraction, pattern recognition, algorithm design—applies far beyond coding. These are general reasoning skills.

### It's Creative

Despite the "science" name, much of CS is creative. Designing elegant algorithms, crafting user experiences, architecting systems—these require imagination as much as logic. It's art that happens to compile. 🎨

### It's Powerful

Few other fields let you build something from nothing and deploy it to millions of people. A laptop and an internet connection can change the world. That's not hyperbole—it's history.

### The Questions Are Fascinating

Can machines think? What are the limits of computation? How do we build systems we can trust? What should we automate, and what should remain human? These are some of the most interesting questions of our time.

## The Philosophical Angle

Here's where things get genuinely interesting. Computer science touches deep philosophical questions:

**What is intelligence?** AI research forces us to define what we mean by understanding, learning, and reasoning. Turns out it's harder than you'd think.

**What is information?** Claude Shannon's information theory quantifies the abstract concept of "information" mathematically. (Yes, you can measure surprise!)

**What is proof?** Automated theorem provers and proof assistants are changing how we think about mathematical certainty. Computers now help mathematicians prove theorems humans can't verify by hand.

**What is a process?** Algorithms formalize the notion of "a procedure to do something"—an idea that seemed obvious until we tried to make it precise. (Spoiler: it wasn't obvious.)

Computer science is philosophy made executable. 💭→💻

## Getting Started

If you're new to CS, start here:

1. **[Computational Thinking](computational_thinking.md)** — The mental toolkit
2. **[Finite State Machines](finite_state_machines.md)** — Simple computation models
3. **[Recursive Transition Networks](recursive_transition_networks.md)** — Describing languages visually
4. **[Backus-Naur Form](backus_naur_form.md)** — Describing languages textually

*Coming soon:*
5. Regular Expressions — Practical pattern matching
6. How Parsers Work — From theory to implementation

Each topic builds on the previous, moving from abstract thinking to concrete tools.

??? example "How These Subfields Connect: A Google Search"

    When you type a query into Google and hit enter, you're touching all four areas of CS:

    - **Theory**: Search algorithms decide which pages match your query; ranking algorithms determine the order using graph theory (PageRank) and complexity analysis
    - **Systems**: Your query hits distributed databases across thousands of servers, coordinated by networking protocols and operating systems
    - **Applications**: Natural language processing interprets what you *meant*, not just what you typed; machine learning personalizes results
    - **Human-Centered**: The clean, minimal interface hides all this complexity behind a single text box

    One search. Four subfields. That's computer science in action.

## Practice Problems

??? question "Challenge 1: Identify the Subfield"

    For each problem below, which CS subfield would primarily tackle it? (Some might involve multiple!)

    1. Making Netflix recommend shows you'll actually like
    2. Ensuring electronic voting machines can't be hacked
    3. Making a video game run smoothly at 60 frames per second
    4. Determining if two programs do the same thing
    5. Designing an intuitive interface for elderly users

    ??? tip "Answers"

        1. **Machine Learning / AI** — Pattern recognition from viewing history
        2. **Security / Cryptography** — Protecting systems from attacks, ensuring integrity
        3. **Computer Graphics / Systems** — Rendering efficiently, managing resources
        4. **Theory / Computability** — This is actually undecidable! (Rice's Theorem)
        5. **Human-Computer Interaction (HCI)** — Usability and accessibility

??? question "Challenge 2: Solvable or Not?"

    Which of these problems can be solved algorithmically?

    1. Given a number, determine if it's prime
    2. Given a program, determine if it will ever print "Hello"
    3. Given a list of numbers, find the largest one
    4. Given any mathematical statement, prove whether it's true or false
    5. Given a list of numbers, sort them in ascending order

    ??? tip "Answers"

        **Solvable:**

        - ✅ #1: Prime testing — solvable (even efficiently!)
        - ✅ #3: Find largest — definitely solvable
        - ✅ #5: Sorting — very solvable (many algorithms)

        **Unsolvable:**

        - ❌ #2: Undecidable (related to Halting Problem)
        - ❌ #4: Undecidable (Gödel's Incompleteness Theorem)

??? question "Challenge 3: CS vs. Programming vs. IT"

    Classify each task as primarily Computer Science (theory), Software Engineering (building systems), Programming (writing code), or IT (deployment/maintenance):

    1. Proving that no algorithm can solve the Traveling Salesman Problem in polynomial time
    2. Writing a Python script to rename 1000 files
    3. Designing the architecture for a system that handles 10 million users
    4. Setting up backup systems for a company's servers
    5. Implementing a search feature for a website

    ??? tip "Answers"

        1. **Computer Science** — Theoretical complexity analysis
        2. **Programming** — Straightforward coding task
        3. **Software Engineering** — System design at scale
        4. **IT** — Infrastructure management
        5. **Programming** (for small sites) or **Software Engineering** (for large-scale systems)

## Key Takeaways

| Concept | What It Means |
|:--------|:--------------|
| **Computation** | The systematic transformation of information |
| **Algorithm** | A precise procedure for solving a problem |
| **Complexity** | How difficulty scales with problem size |
| **Abstraction** | Hiding details to manage complexity |
| **Decidability** | Whether a problem can be solved algorithmically |

## Further Reading

- [**Introduction to Computing: Explorations in Language, Logic, and Machines**](https://computingbook.org/) by David Evans - A free introductory Computer Science textbook

- [**Code: The Hidden Language of Computer Hardware and Software**](https://en.wikipedia.org/wiki/Code:_The_Hidden_Language_of_Computer_Hardware_and_Software) by Charles Petzold — How computers actually work
- [**Gödel, Escher, Bach**](https://en.wikipedia.org/wiki/G%C3%B6del,_Escher,_Bach) by Douglas Hofstadter — Mind-bending exploration of computation and consciousness
- [**The Innovators**](https://en.wikipedia.org/wiki/The_Innovators_(book)) by Walter Isaacson — History of computing from Ada Lovelace to the internet

---

Computer science is a young field—barely 80 years old—but it's already transformed the world more profoundly than disciplines thousands of years older. That transformation is accelerating.

Whether you're here to build the next transformation or just to understand the one that's already happened, welcome. There's a lot to explore. Let's get started. 🚀

## Video Summary

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/CnVg09yCs6Y" title="What is Computer Science?" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
