# Network Fundamentals

In the early days of computing, a computer was an "island." To move data from one machine to another, you had to save it to a physical tape or disc and walk it over. Today, computing is defined by connectivity.

A **Computer Network** is simply two or more computers connected together so they can share resources and data.

## 1. Scope: LAN vs. WAN

We categorize networks by how much distance they cover.

-   **LAN (Local Area Network):** A network in a small geographic area, like your house, an office, or a coffee shop. High speed, low cost, and privately owned.
-   **WAN (Wide Area Network):** A network that spans a large distance—a city, a country, or the entire planet. The **Internet** is the largest WAN in existence.

## 2. Topologies: The Shape of the Network

The "Topology" of a network describes how the devices are physically or logically connected.

-   **Star Topology:** Every device connects to a central "Hub" or "Switch." (This is what your home Wi-Fi router does).
    -   *Pros:* If one cable breaks, only one computer goes down.
    -   *Cons:* If the central hub breaks, the whole network dies.
-   **Mesh Topology:** Every device connects to every other device.
    -   *Pros:* Extremely reliable (no single point of failure).
    -   *Cons:* Very expensive and complex to wire.
-   **Bus Topology:** All devices share a single backbone cable. (Rare today).

## 3. Communication Links

How does the data actually move? We split links into two categories:

### Guided Media (Cables)
-   **Ethernet (Copper):** Uses electrical signals. Fast and cheap, but limited to short distances (100 meters).
-   **Fiber Optics (Glass):** Uses pulses of light. Incredibly fast and can travel miles without losing signal. This is what connects continents under the ocean.

### Unguided Media (Wireless)
-   **Wi-Fi:** Radio waves for short distances.
-   **Satellite:** Microwave signals bounced off satellites in orbit. High latency (delay) because the signal has to travel to space and back.
-   **Cellular (4G/5G):** Wide-area wireless for mobile devices.

## 4. Network Protocols: The Language of the Link

For two computers to talk, they must agree on a set of rules. These rules are called **Protocols**.

-   **IP (Internet Protocol):** How to address and route data.
-   **TCP (Transmission Control Protocol):** How to ensure data arrives correctly and in order.
-   **Ethernet Protocol:** How to send electrical signals over a wire without "crashing" into other signals.

## Practice Problems

??? question "Practice Problem 1: Choosing a Topology"

    You are designing a network for a high-security military base where the network *must* stay up even if several cables are cut. Which topology would you choose?

    ??? tip "Solution"
        **Mesh Topology.** 
        
        Because every node is connected to multiple others, there are many redundant paths. If one path is cut, the data can simply be rerouted through another neighbor.

??? question "Practice Problem 2: LAN vs. WAN"

    Is your home Wi-Fi network a LAN or a WAN?

    ??? tip "Solution"
        **LAN.** 
        
        It is a small, privately owned network covering a single building. However, your LAN is *connected* to a WAN (the Internet) through your Internet Service Provider (ISP).

## Key Takeaways

| Concept | Meaning |
| :--- | :--- |
| **LAN** | Small area (Home/Office). |
| **WAN** | Large area (The Internet). |
| **Star Topology** | All connected to a center point. |
| **Guided Media** | Physical wires (Copper/Fiber). |
| **Protocol** | The "rules of conversation" for computers. |

---

Network fundamentals are the "plumbing" of the digital age. By understanding how the pipes are laid and how the water (data) flows, we can build systems that are faster, more reliable, and more connected than ever before.
