# The Internet vs. The World Wide Web

Most people use the terms "Internet" and "Web" interchangeably, but in computer science, they are completely different things. Confusing them is like confusing the **tracks** with the **train**, or the **highway** with the **delivery truck**.

## 1. The Internet (The Tracks)

The **Internet** is the hardware and infrastructure. It is a "Network of Networks." It consists of millions of miles of cables, thousands of routers, and billions of devices.

The Internet's job is to move **Packets** (small chunks of data) from one IP address to another. It doesn't care what is *inside* the packets—it just delivers them.

**Other things that run on the Internet (not the Web):**
-   Email (SMTP)
-   File Transfers (FTP)
-   Online Gaming (Custom protocols)
-   Video Calls (VOIP/WebRTC)

## 2. The World Wide Web (The Train)

The **World Wide Web** (or simply "The Web") is a service that runs *on top* of the Internet. It was invented by Tim Berners-Lee in 1989.

The Web is a collection of **linked documents** (HTML files) and other resources (images, videos) that are identified by **URLs** (Uniform Resource Locators).

**The Web relies on three key technologies:**
1.  **HTML:** The language used to write web pages.
2.  **HTTP/HTTPS:** The protocol used to send those pages over the internet.
3.  **Web Browsers:** The software used to render those pages for humans.

## 3. DNS: The Phone Book

Computers don't understand `google.com`. They understand IP addresses like `142.250.190.46`. 

The **Domain Name System (DNS)** is the "phone book" of the internet. When you type a URL into your browser:
1.  Your computer asks a DNS Server: "What is the IP address for `google.com`?"
2.  The DNS Server returns the IP address.
3.  Your browser then uses that IP to send a request over the **Internet** to get the **Web** page.

## Summary Table

| Feature | The Internet | The World Wide Web |
| :--- | :--- | :--- |
| **Analogy** | The Highway System. | The Trucks and Cars. |
| **Consists of** | Cables, Routers, Servers. | HTML, URLs, Browsers. |
| **Age** | Born in the 1960s (ARPANET). | Born in 1989 (CERN). |
| **Purpose** | To move data packets. | To share linked documents. |

## Practice Problems

??? question "Practice Problem 1: True or False?"

    "If the World Wide Web crashed today, I would still be able to send an email."

    ??? tip "Solution"
        **True.** 
        
        Email uses a different protocol (SMTP) that runs directly on the Internet. While many people use *Web-based* email (like Gmail in a browser), the underlying email system is independent of the Web.

??? question "Practice Problem 2: Identify the Technology"

    You type `https://cs.bradpenney.io` into your browser. Which part of this is an **Internet** technology and which is a **Web** technology?

    ??? tip "Solution"
        -   **Internet:** The IP routing that finds the server, and the TCP connection that ensures the data arrives.
        -   **Web:** The `https` protocol, the URL, and the HTML content of the page you are requesting.

## Key Takeaways

-   **The Internet** is the physical and logical infrastructure for communication.
-   **The World Wide Web** is a system of interlinked hypertext documents accessed via the Internet.
-   **DNS** bridges the gap between human-friendly names and computer-friendly IP addresses.

---

By distinguishing the infrastructure (Internet) from the application (Web), we can better understand how the digital world is layered. The Internet provides the "connectivity," while the Web provides the "content."
