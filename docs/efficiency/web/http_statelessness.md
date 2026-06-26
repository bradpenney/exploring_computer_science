---
date: "2026-06-21 12:00"
title: "Why HTTP APIs Forget You: Statelessness Explained"
description: "HTTP APIs don't remember your last request. Learn why statelessness exists, what it costs, and how sessions vs tokens rebuild the memory you lost."
---

# Why HTTP APIs Forget You: Statelessness Explained

!!! tip "Part of a Learning Path"
    This article is part of the [How APIs Actually Work](https://bradpenney.io/pathways/how-apis-work) pathway on [bradpenney.io](https://bradpenney.io) — a guided sequence through the topic. It also stands on its own.

Here's something you've worked around without naming it: every API request you send has to *re-introduce itself*. You attach the token again. You pass the user ID again. You re-send the filters again. It feels redundant — surely the server remembers you from two seconds ago?

It doesn't. **By design, the server forgets you the instant it answers.** That's not a bug or a missing feature. It's the property called *statelessness*, and it's one of the load-bearing decisions behind how the web scales. Understanding it explains a whole category of "where does this data live?" questions that make API design feel muddy.

This follows directly from [the request/response lifecycle](client_server_request_response.md): if each request is an independent round trip, what — if anything — survives between them?

## What "Stateless" Actually Means

**A stateless protocol is one where each request contains everything the server needs to handle it, and the server keeps no memory of previous requests.**

Every request starts from zero. The server reads it, does the work, sends a response, and discards all knowledge of you. The next request — even from the same client, one millisecond later — arrives at a server with total amnesia.

HTTP, the protocol almost every web API rides on, is stateless. That single property shapes everything above it.

## Where You've Seen This

You attach the same `Authorization: Bearer <token>` header to *every* call to the same API. You're not being redundant — you're compensating for a server that genuinely doesn't remember the last request you made.

## Why Would Anyone Design It to Forget?

Forgetting sounds like a downgrade. It's actually what makes the modern web possible. Three payoffs:

<div class="grid cards two-col" markdown>

-   :material-arrow-expand-horizontal: __It scales horizontally__

    ---

    If the server remembers nothing, then **any** server can handle **any** request. You can run 50 identical copies behind a load balancer, and it doesn't matter which one a request lands on. No request "belongs" to a particular machine.

-   :material-restart: __It survives restarts__

    ---

    Because nothing important lives in a server's memory between requests, you can kill and replace a server mid-traffic. The next request just goes elsewhere. This is what makes rolling deploys and autoscaling safe.

-   :material-bug-outline: __It's simpler to reason about__

    ---

    Each request is self-contained, so you can replay it, log it, cache it, or debug it in isolation. There's no hidden "session memory" silently changing the outcome.

</div>

!!! tip "The trade-off in one line"

    Statelessness moves the burden of memory **from the server to the request**. The server forgets, so the *request* must remember — it has to carry its own context every time.

## The Cost: Every Request Re-Proves Itself

If the server forgets who you are, then "being logged in" can't be something the server *remembers*. It has to be something you *prove again on every request*. This is exactly why authentication shows up on every call — the topic of [authentication vs authorization](authentication_vs_authorization.md).

Consider logging in:

1. You `POST /login` with a username and password.
2. The server verifies them and responds `200 OK`.
3. You then `GET /orders`.

By step 3, the server has **completely forgotten** step 1. So how does it know you're allowed to see orders? Something from step 2 must travel *with* the request in step 3. That "something" is the heart of web sessions — and there are two classic ways to provide it.

## Rebuilding Memory: Sessions vs Tokens

Both approaches solve the same problem — *carry proof of identity on every request* — but they store the "memory" in opposite places. This is a genuine design fork you'll choose between, so it's worth seeing them side by side. (The security mechanics are covered in depth in [authentication vs authorization](authentication_vs_authorization.md); here we focus on *where the state lives*.)

=== ":material-cookie: Server-Side Sessions"

    The server *does* keep memory after all — but in a shared store (a database or cache), not in the server process. On login it creates a **session record** and hands the client a small opaque **session ID** (usually in a cookie).

    ```mermaid
    flowchart TD
        A[POST /login] --> B[Server stores session<br/>in shared DB/cache]
        B --> C[Client gets session ID cookie]
        C --> D[GET /orders + cookie]
        D --> E[Any server looks up<br/>session ID in shared store]
        style A fill:#1a202c,stroke:#cbd5e0,stroke-width:2px,color:#fff
        style B fill:#2d3748,stroke:#cbd5e0,stroke-width:2px,color:#fff
        style E fill:#326CE5,stroke:#cbd5e0,stroke-width:2px,color:#fff
    ```

    - **The memory lives:** server-side, in a shared store.
    - **The client carries:** a meaningless ID — a coat-check ticket.
    - **Trade-off:** easy to revoke (delete the record), but every request costs a lookup in the shared store.

=== ":material-key-chain: Self-Contained Tokens"

    The server keeps **no** per-user memory. On login it hands the client a **signed token** (often a JWT) that *contains* the user's identity and is cryptographically signed so it can't be forged.

    ```mermaid
    flowchart TD
        A[POST /login] --> B[Server signs a token<br/>containing user identity]
        B --> C[Client stores the token]
        C --> D[GET /orders + token]
        D --> E[Any server verifies the<br/>signature — no lookup]
        style A fill:#1a202c,stroke:#cbd5e0,stroke-width:2px,color:#fff
        style B fill:#2d3748,stroke:#cbd5e0,stroke-width:2px,color:#fff
        style E fill:#326CE5,stroke:#cbd5e0,stroke-width:2px,color:#fff
    ```

    - **The memory lives:** in the token itself, held by the client.
    - **The client carries:** the actual proof — a signed passport.
    - **Trade-off:** no lookup needed (fast, truly stateless), but hard to revoke before it expires.

The deep symmetry: **sessions keep the state on the server and give the client a pointer; tokens keep the state in the request and give the server a way to verify it.** Statelessness is preserved either way, because the *server process* still starts each request from zero.

!!! info "The fine print on stateless tokens"

    Two practical caveats sit behind "no lookup." First, to verify a token's signature a server needs the issuer's **public key** — which it fetches once and caches from a standard **JWKS** (JSON Web Key Set) endpoint. Second, "no lookup" only covers *verifying identity*; **revoking** a token before it expires (a logout, a compromised account) *does* require a central blocklist check, usually in something fast like Redis — which quietly reintroduces a little of the state tokens were meant to avoid.

## A Note on "Stateless" vs "Stateful Data"

A frequent confusion: "If APIs are stateless, how does my bank remember my balance?" Statelessness is about the **protocol's memory of the conversation**, not about whether *data* persists. Your balance lives in a database — that's durable application state, and it's supposed to persist. What's stateless is the *request handling*: the server doesn't remember that *you* asked about your balance 10 seconds ago. Every request re-establishes who you are, then reads the durable data fresh.

| | Conversational state | Application data |
| :--- | :--- | :--- |
| **Example** | "This client is logged in as Alice" | Alice's account balance |
| **Where it lives** | In the request (token) or shared store (session) | In the database |
| **HTTP's stance** | Forgotten between requests (stateless) | Untouched by HTTP; persists normally |

## Why This Matters for Production Code

- **It dictates your scaling story.** If you stash "logged-in user" in a single server's local memory, you've broken statelessness — that user is now stuck to that one server, and a restart logs them out. Keep session state in a shared store or in tokens, and any server can serve any request.
- **It explains "it works on one server but not behind the load balancer."** A classic bug: login works in development (one server) but randomly fails in production (many servers) because session state was kept in local memory and the load balancer routed the next request to a different machine.
- **It frames the revocation problem.** "How do I log someone out immediately?" is easy with sessions (delete the record) and genuinely hard with self-contained tokens (you can't un-sign a passport before it expires). Knowing this *before* you choose saves a painful retrofit.

!!! tip "Where this shows up: Kubernetes"

    Statelessness is the assumption [Kubernetes](https://k8s.bradpenney.io/day_one/what_is_kubernetes/) is built on. It treats your app instances as [disposable Pods](https://k8s.bradpenney.io/essentials/pods/) it can kill and reschedule at will, with a [Service](https://k8s.bradpenney.io/essentials/services/) load-balancing requests across the interchangeable replicas. That works *only* because no request "belongs" to a particular instance — if a Pod vanishes mid-traffic, the next request simply lands on another.

## Technical Interview Context

"Is HTTP stateless, and what does that imply?" is a staple. The complete answer has two moves. First, define it precisely: each request is independent and the server keeps no memory of prior requests. Second — the part that signals depth — explain the *consequence*: statelessness is what enables horizontal scaling and resilience, but it pushes the burden of identity onto every request, which is why we need sessions or tokens. Bonus points for naming the revocation trade-off between server-side sessions (easy to revoke, needs a lookup) and signed tokens (no lookup, hard to revoke).

## Practice Problems

??? question "Practice Problem 1: The Disappearing Login"

    A developer stores the logged-in user in a Python dictionary in the web server's memory. It works perfectly in local testing. In production behind a load balancer with three servers, users get randomly logged out. Why?

    ??? tip "Solution"

        The dictionary lives in **one server's local memory**, which violates statelessness. The load balancer sends each request to whichever server is free. When a request lands on a server that didn't handle the login, that server has no record of the user — so it treats them as logged out. The fix is to keep session state in a **shared store** (so any server can find it) or use **self-contained tokens** (so no server needs to remember). Local memory is the trap.

??? question "Practice Problem 2: Where Did the State Go?"

    With self-contained signed tokens, where is the "this user is an admin" fact physically stored while the user is active, and who can read it?

    ??? tip "Solution"

        It's stored **inside the token, held by the client**. The server doesn't keep it. Anyone holding the token (including the user) can *read* its contents — a JWT payload is encoded, not encrypted — but they **can't change it** without invalidating the signature. So the token is readable but tamper-evident: the client carries the claim, and the server trusts it only because the signature proves the server itself issued it.

??? question "Practice Problem 3: Logout Now"

    Security asks you to forcibly log out a compromised account *immediately*. Which is easier to satisfy: server-side sessions or self-contained tokens, and why?

    ??? tip "Solution"

        **Server-side sessions**, by far. You simply delete the session record from the shared store; the next request fails its lookup and the user is out. With **self-contained tokens**, the proof lives in the client's token and the server isn't consulting a store, so a valid token keeps working until it expires — unless you add extra machinery (short lifetimes plus a revocation/denylist), which partly reintroduces the state you were trying to avoid. This trade-off is the price of pure statelessness.

## Key Takeaways

| Concept | What It Means |
| :--- | :--- |
| **Stateless** | Each request is self-contained; the server keeps no memory of prior requests |
| **Why** | Any server can handle any request → horizontal scaling and restart resilience |
| **The cost** | Identity must be re-proven on every request (hence tokens/cookies everywhere) |
| **Sessions** | State on the server (shared store); client holds an opaque ID; easy to revoke |
| **Tokens** | State in the request (signed token); no server lookup; hard to revoke early |
| **State ≠ data** | Statelessness is about conversation memory, not durable database data |

Statelessness is the quiet decision that lets the web scale to billions of requests: forget everyone, and any server can serve anyone. The price is that *remembering* becomes the request's job, not the server's — which is why every call carries its own proof of identity. Decide early *where* that memory lives, and a whole class of "works on my machine" production mysteries never happens to you.

## Further Reading

### Related Reading

- **[What Is Kubernetes? (k8s.bradpenney.io)](https://k8s.bradpenney.io/day_one/what_is_kubernetes/)** — the platform that treats stateless app instances as disposable and self-healing.
- **[Pods Deep Dive (k8s.bradpenney.io)](https://k8s.bradpenney.io/essentials/pods/)** — why Kubernetes can delete and recreate your app's instances at will.
- **[Services: Stable Networking for Pods (k8s.bradpenney.io)](https://k8s.bradpenney.io/essentials/services/)** — one stable endpoint load-balancing across interchangeable replicas.

### External Resources

- [MDN: HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) — the classic carrier for session IDs.
- [RFC 7519: JSON Web Tokens](https://datatracker.ietf.org/doc/html/rfc7519) — the specification behind self-contained tokens.