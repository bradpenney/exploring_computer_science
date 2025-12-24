# Computational Thinking

Before you can write code, you need to *think* in a way that computers can follow. That's not about memorizing syntax or learning keyboard shortcuts—it's about developing a mental toolkit for breaking down problems, spotting patterns, and building solutions that scale.

This toolkit is called **computational thinking**, and it's arguably more important than any programming language you'll ever learn. Languages come and go; the ability to think systematically about problems is forever.

## The Four Pillars

Computational thinking rests on four core skills. They're not steps to follow in order—they're lenses you apply, often simultaneously, when tackling any problem.

=== ":material-puzzle: Decomposition"

    **Breaking a complex problem into smaller, manageable parts.**

    When faced with something overwhelming, the natural instinct is to panic. Computational thinking says: don't solve the whole thing at once. Chop it up.

    **Example: Building a Website**

    "Build a website" is paralyzing. But decompose it:

    - Design the layout
    - Create the navigation
    - Build the home page
    - Build the about page
    - Add a contact form
    - Style everything with CSS
    - Deploy to a server

    Suddenly, you have a todo list instead of an existential crisis. 📝 Much better.

    **Example: Making Breakfast**

    Even "make breakfast" decomposes:

    1. Decide what to eat
    2. Gather ingredients
    3. Prepare each item (eggs, toast, coffee)
    4. Plate and serve

    Each sub-task can be further decomposed. "Make coffee" becomes: fill kettle, boil water, grind beans (freshly, obviously—pre-ground is for emergencies only), add to French press, pour water at exactly 200°F, wait four minutes, plunge, pour. ☕ Now we're cooking (or brewing). This is the most important sub-task, frankly.

    ??? tip "Decomposition in Practice"

        When you're stuck on a programming problem, ask yourself:

        - What are the *inputs* to this problem?
        - What are the *outputs* I need?
        - What are the *steps* between input and output?
        - Can any of those steps be broken down further?

=== ":material-magnify-plus: Pattern Recognition"

    **Identifying similarities, trends, and regularities.**

    Once you've decomposed a problem, you often notice that several pieces look suspiciously similar. That's a pattern—and patterns are opportunities.

    **Example: Form Validation**

    Validating a registration form:

    - Check that email is valid
    - Check that password is long enough
    - Check that username isn't taken
    - Check that age is a number

    The *pattern*: each field needs a validation check that returns true/false. Instead of writing completely separate code for each, you can create a general validation framework.

    **Example: Sorting Algorithms**

    Many sorting algorithms follow a pattern:

    1. Compare two elements
    2. Swap if needed
    3. Repeat until sorted

    The specific *how* varies (bubble sort, quicksort, merge sort), but the underlying pattern is consistent.

    **Why Patterns Matter:**

    - Patterns let you reuse solutions
    - Recognizing a pattern means you might already know how to solve this
    - Patterns reveal structure you can exploit

=== ":material-shape-outline: Abstraction"

    **Focusing on essential information while ignoring irrelevant details.**

    Abstraction is the art of knowing what to leave out. A map of the subway doesn't show every building, tree, and fire hydrant—it shows stations and lines. That's abstraction: keeping what matters, discarding what doesn't.

    **Example: Driving a Car**

    When you drive, you think in terms of:

    - Steering wheel
    - Gas pedal
    - Brake pedal
    - Turn signals

    You *don't* think about fuel injection timing, spark plug voltage, or transmission gear ratios. Those details are abstracted away behind simple interfaces.

    **Example: Finite State Machines**

    A [Finite State Machine](finite_state_machines.md) is pure abstraction—it models systems (traffic lights, game AI, compilers) as just states and transitions, ignoring all implementation details. You don't need to know if it's running on hardware or software; the abstraction captures the essential behavior.

    **Example: Functions in Programming**

    Without abstraction, sending an email means dealing with all this complexity:

    === ":material-language-python: Python - Without Abstraction"

        ```python title="Sending Email Without Abstraction" linenums="1"
        # Without abstraction: caller needs to know everything
        import smtplib
        from email.mime.text import MIMEText

        server = smtplib.SMTP('smtp.gmail.com', 587)  # (1)!
        server.starttls()  # (2)!
        server.login('me@gmail.com', 'password123')  # (3)!
        msg = MIMEText('Hi Bob!')  # (4)!
        msg['Subject'] = 'Hello'
        msg['To'] = 'bob@example.com'
        server.send_message(msg)  # (5)!
        server.quit()  # (6)!
        ```

        1. Connect to Gmail's SMTP server on port 587
        2. Upgrade connection to secure TLS encryption
        3. Authenticate with username and password
        4. Construct email message with MIME formatting
        5. Send the constructed message through the server
        6. Close the connection properly

    === ":material-language-javascript: JavaScript - Without Abstraction"

        ```javascript title="Sending Email Without Abstraction" linenums="1"
        // Without abstraction: caller needs to know everything
        const nodemailer = require('nodemailer');  // (1)!

        const transporter = nodemailer.createTransport({  // (2)!
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,  // (3)!
            auth: {  // (4)!
                user: 'me@gmail.com',
                pass: 'password123'
            }
        });

        transporter.sendMail({  // (5)!
            from: 'me@gmail.com',
            to: 'bob@example.com',
            subject: 'Hello',
            text: 'Hi Bob!'
        });
        ```

        1. CommonJS module import for nodemailer (Node.js email library)
        2. Create transport object with all SMTP configuration details
        3. secure: false means use STARTTLS to upgrade connection (TLS on port 587)
        4. Authentication credentials passed as nested object
        5. Send mail using configured transport with message details as object literal

    === ":material-language-go: Go - Without Abstraction"

        ```go title="Sending Email Without Abstraction" linenums="1"
        // Without abstraction: caller needs to know everything
        import (
            "net/smtp"
        )

        from := "me@gmail.com"
        password := "password123"
        to := []string{"bob@example.com"}  // (1)!
        smtpHost := "smtp.gmail.com"
        smtpPort := "587"

        message := []byte("Subject: Hello\r\n\r\nHi Bob!")  // (2)!

        auth := smtp.PlainAuth("", from, password, smtpHost)  // (3)!
        err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)  // (4)!
        ```

        1. Recipients as string slice (Go's dynamic array type) - SendMail accepts multiple recipients
        2. Message as byte slice with RFC 5322 format (headers separated by \r\n\r\n from body)
        3. PlainAuth creates authentication mechanism using username and password
        4. SendMail combines host:port, returns error for Go's explicit error handling pattern

    === ":material-language-rust: Rust - Without Abstraction"

        ```rust title="Sending Email Without Abstraction" linenums="1"
        // Without abstraction: caller needs to know everything
        use lettre::{Message, SmtpTransport, Transport};
        use lettre::transport::smtp::authentication::Credentials;

        let email = Message::builder()  // (1)!
            .from("me@gmail.com".parse().unwrap())  // (2)!
            .to("bob@example.com".parse().unwrap())
            .subject("Hello")
            .body(String::from("Hi Bob!"))
            .unwrap();  // (3)!

        let creds = Credentials::new("me@gmail.com".to_string(),  // (4)!
                                     "password123".to_string());

        let mailer = SmtpTransport::relay("smtp.gmail.com")  // (5)!
            .unwrap()
            .credentials(creds)
            .build();

        mailer.send(&email).unwrap();  // (6)!
        ```

        1. Builder pattern - chain method calls to construct email object incrementally
        2. parse() converts string to email address type, unwrap() panics if invalid
        3. Final unwrap() on builder - convert Result<Message> to Message (panic on error)
        4. to_string() converts &str to owned String type (Credentials requires String)
        5. relay() creates SMTP transport for relaying through server (unwrap Result)
        6. send() borrows email reference, unwrap() panics if send fails

    === ":material-language-java: Java - Without Abstraction"

        ```java title="Sending Email Without Abstraction" linenums="1"
        // Without abstraction: caller needs to know everything
        import javax.mail.*;
        import javax.mail.internet.*;
        import java.util.Properties;

        Properties props = new Properties();  // (1)!
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(props, new Authenticator() {  // (2)!
            protected PasswordAuthentication getPasswordAuthentication() {  // (3)!
                return new PasswordAuthentication("me@gmail.com", "password123");
            }
        });

        Message message = new MimeMessage(session);  // (4)!
        message.setFrom(new InternetAddress("me@gmail.com"));
        message.setRecipients(Message.RecipientType.TO,
            InternetAddress.parse("bob@example.com"));
        message.setSubject("Hello");
        message.setText("Hi Bob!");

        Transport.send(message);  // (5)!
        ```

        1. Properties object stores SMTP configuration as key-value pairs
        2. Anonymous inner class implements Authenticator interface inline
        3. Override getPasswordAuthentication() to provide credentials when needed
        4. MimeMessage constructed with session (contains all SMTP settings)
        5. Static Transport.send() method sends message using session configuration

    === ":material-language-cpp: C++ - Without Abstraction"

        ```cpp title="Sending Email Without Abstraction" linenums="1"
        // Without abstraction: caller needs to know everything
        #include <curl/curl.h>
        #include <string>

        CURL *curl = curl_easy_init();  // (1)!
        if(curl) {  // (2)!
            curl_easy_setopt(curl, CURLOPT_URL, "smtp://smtp.gmail.com:587");  // (3)!
            curl_easy_setopt(curl, CURLOPT_USE_SSL, CURLUSESSL_ALL);
            curl_easy_setopt(curl, CURLOPT_USERNAME, "me@gmail.com");
            curl_easy_setopt(curl, CURLOPT_PASSWORD, "password123");
            curl_easy_setopt(curl, CURLOPT_MAIL_FROM, "<me@gmail.com>");

            struct curl_slist *recipients = NULL;  // (4)!
            recipients = curl_slist_append(recipients, "<bob@example.com>");
            curl_easy_setopt(curl, CURLOPT_MAIL_RCPT, recipients);

            std::string payload = "To: bob@example.com\r\n"  // (5)!
                                "Subject: Hello\r\n"
                                "\r\nHi Bob!";
            curl_easy_setopt(curl, CURLOPT_READDATA, &payload);

            curl_easy_perform(curl);  // (6)!
            curl_easy_cleanup(curl);
        }
        ```

        1. Initialize libcurl easy interface - returns handle (NULL on failure)
        2. Check handle validity before using (C-style error handling)
        3. curl_easy_setopt() sets options using enum constants (variadic function)
        4. curl_slist is linked list structure for recipient list (manual memory management)
        5. Construct RFC 5322 message format as string with proper \r\n line endings
        6. curl_easy_perform() sends email, curl_easy_cleanup() frees allocated memory

    With abstraction, all that complexity hides behind a simple interface:

    === ":material-language-python: Python - With Abstraction"

        ```python title="Sending Email With Abstraction" linenums="1"
        # With abstraction: complexity hidden
        send_email("bob@example.com", "Hello", "Hi Bob!")  # (1)!
        ```

        1. All the complexity from the previous example is now hidden inside this function - caller only needs to provide recipient, subject, and message

    === ":material-language-javascript: JavaScript - With Abstraction"

        ```javascript title="Sending Email With Abstraction" linenums="1"
        // With abstraction: complexity hidden
        sendEmail("bob@example.com", "Hello", "Hi Bob!");  // (1)!
        ```

        1. All the complexity from the previous example is now hidden inside this function - caller only needs to provide recipient, subject, and message

    === ":material-language-go: Go - With Abstraction"

        ```go title="Sending Email With Abstraction" linenums="1"
        // With abstraction: complexity hidden
        sendEmail("bob@example.com", "Hello", "Hi Bob!")  // (1)!
        ```

        1. All the complexity from the previous example is now hidden inside this function - caller only needs to provide recipient, subject, and message

    === ":material-language-rust: Rust - With Abstraction"

        ```rust title="Sending Email With Abstraction" linenums="1"
        // With abstraction: complexity hidden
        send_email("bob@example.com", "Hello", "Hi Bob!");  // (1)!
        ```

        1. All the complexity from the previous example is now hidden inside this function - caller only needs to provide recipient, subject, and message

    === ":material-language-java: Java - With Abstraction"

        ```java title="Sending Email With Abstraction" linenums="1"
        // With abstraction: complexity hidden
        sendEmail("bob@example.com", "Hello", "Hi Bob!");  // (1)!
        ```

        1. All the complexity from the previous example is now hidden inside this function - caller only needs to provide recipient, subject, and message

    === ":material-language-cpp: C++ - With Abstraction"

        ```cpp title="Sending Email With Abstraction" linenums="1"
        // With abstraction: complexity hidden
        send_email("bob@example.com", "Hello", "Hi Bob!");  // (1)!
        ```

        1. All the complexity from the previous example is now hidden inside this function - caller only needs to provide recipient, subject, and message

    The caller doesn't need to know *how* emails work—only *that* they can send one. The 50 lines of SMTP configuration, authentication, and error handling still exist, but they're someone else's problem now.

    **Levels of Abstraction:**

    Think of a computer:

    | Level | What You Interact With / Build With |
    |:------|:----------------------------------|
    | User | Apps, buttons, windows (the interface) |
    | Application | Functions, objects, APIs (the building blocks) |
    | Operating System | Processes, files, memory (the system's tools) |
    | Hardware | CPU, RAM, circuits (the physical components) |
    | Physics | Electrons, voltage, silicon (the fundamental reality) |

    Each level abstracts the one below. You can write Python without understanding transistors. That's powerful.

    ??? tip "Abstraction in Data Structures"

        A prime example of abstraction in computing is the **[Abstract Data Type (ADT)](../data_structures/abstract_data_types_and_stack.md)**—a way of defining data structures by *what they do* rather than *how they're implemented*.

        When you use a Stack, you call `PUSH` and `POP` without caring whether it's built with arrays or linked lists. That's abstraction hiding complexity behind a clean interface.

=== ":material-graph-outline: Algorithm Design"

    **Creating step-by-step instructions to solve a problem.**

    An algorithm is a recipe—a sequence of unambiguous steps that, when followed, produce a desired result. The key word is *unambiguous*: every step must be precise enough that anyone (or any computer) could follow it.

    **Example: Finding the Largest Number**

    Given a list of numbers, find the largest:

    1. Assume the first number is the largest (call it `max`)
    2. For each remaining number:
       - If it's greater than `max`, update `max`
    3. Return `max`

    This works for any list, any size. That's the power of a well-designed algorithm.

    **Example: Making a Sandwich (Precise Edition)**

    "Make a peanut butter sandwich" isn't precise enough for a computer. Try:

    1. Get two slices of bread from the bag
    2. Place both slices on a plate, flat side up
    3. Open the peanut butter jar (twist lid counter-clockwise)
    4. Insert knife into jar
    5. Scoop approximately 2 tablespoons of peanut butter
    6. Spread peanut butter evenly across one slice of bread
    7. Place the other slice on top, flat side down
    8. Close the peanut butter jar

    Tedious? Yes. Unambiguous? Also yes. That's algorithm design. 🥪

    ??? note "The Sandwich Exercise"

        This is a classic CS education exercise. Try writing instructions for making a sandwich,
        then have someone follow them *literally*. You'll quickly discover your assumptions.
        "Spread the peanut butter" — with what? On which side? How much? Computers need this level of detail.

## Computational Thinking in Action

Let's apply all four pillars to a real problem: **building a search feature for a website**.

### Step 1: Decomposition

Break it down:

- Get search query from user
- Find matching items in database
- Rank results by relevance
- Display results to user
- Handle "no results found" case

### Step 2: Pattern Recognition

This looks like other problems we've solved:

- "Find matching items" is similar to filtering a list
- "Rank by relevance" is similar to sorting
- "Display results" follows our standard page template

We can reuse patterns from those solutions.

### Step 3: Abstraction

What details can we hide?

- User doesn't need to know how the database query works
- Search algorithm doesn't need to know how results are displayed
- Display code doesn't need to know how ranking works

Each component has a clean interface; internals are hidden.

### Step 4: Algorithm Design

For the matching algorithm:

1. Split search query into individual words
2. For each item in database:
   - Count how many query words appear in item's title/description
   - Store count as "relevance score"
3. Sort items by relevance score (highest first)
4. Return top 20 items

## Computational Thinking Beyond Code

Here's the thing: computational thinking isn't just for programmers. These skills apply everywhere.

| Domain | Application |
|:-------|:------------|
| **Medicine** | Decompose symptoms → Pattern match to conditions → Abstract to treatment categories |
| **Law** | Decompose case → Pattern match to precedents → Abstract legal principles |
| **Cooking** | Decompose recipe → Pattern match techniques → Abstract flavor profiles |
| **Music** | Decompose song → Pattern match chord progressions → Abstract genre conventions |
| **Debugging Life** | Decompose problem → Pattern match to past experiences → Abstract lessons learned 🐛 |

The formal name is "computational thinking," but really it's just *structured problem-solving*.

## Common Pitfalls

### Decomposing Too Much (or Too Little)

- **Too little**: Chunks are still too big to tackle
- **Too much**: You're lost in trivial details

Find the level where each piece is solvable but not trivial.

### Seeing Patterns That Aren't There

Not everything is a pattern. Sometimes two similar-looking things are genuinely different. Don't force-fit solutions from one domain into another.

### Abstracting Away the Wrong Things

Good abstraction hides complexity while preserving essential behavior. Bad abstraction hides things you actually needed to know.

### Ambiguous Algorithms

"Sort the list" isn't an algorithm—it's a wish. Algorithms must be precise enough to execute mechanically.

## Practice Problems

??? question "Practice Problem 1: Decompose a Mobile App"

    You're building a mobile app for tracking daily habits. Decompose this into components and sub-components.

    How would you break down just the "streak tracking" feature?

??? question "Practice Problem 2: Spot the Pattern"

    These functions all do something similar:

    - `sum(list)` - adds all numbers in a list
    - `product(list)` - multiplies all numbers in a list
    - `max(list)` - finds the largest number in a list
    - `concat(list)` - joins all strings in a list

    What's the underlying pattern? Could you write one general function that handles all of these?

??? question "Practice Problem 3: Write an Algorithm"

    Write precise, unambiguous instructions for:

    - Finding a specific book in a library
    - Determining if a word is a palindrome
    - Calculating a tip at a restaurant

## Key Takeaways

| Pillar | Question to Ask |
|:-------|:----------------|
| **Decomposition** | "How can I break this into smaller pieces?" |
| **Pattern Recognition** | "Have I seen something like this before?" |
| **Abstraction** | "What details can I safely ignore?" |
| **Algorithm Design** | "What are the exact, unambiguous steps to solve this?" |

## Further Resources

- **Jeannette Wing, "Computational Thinking"** — the video below is exceptional:

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/YVEUOHw3Qb8?start=704" title="Jeannette Wing - Computational Thinking" allowfullscreen></iframe>
</div>
- [Binary Trees & Representation](binary_trees_and_representation.md) — Hierarchical structures and abstraction
- [Recursive Transition Networks](recursive_transition_networks.md) — Abstraction and decomposition in action
- [Backus-Naur Form](backus_naur_form.md) — Pattern recognition applied to language structure

---

Computational thinking isn't about thinking *like* a computer—computers don't actually think. It's about thinking *clearly* enough that you could explain your reasoning to a computer. And if you can do that, you can explain it to anyone. That's the real superpower. 🧠

## Video Summary

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/1aqCajM4MiM" title="Computational Thinking" allowfullscreen></iframe>
</div>
