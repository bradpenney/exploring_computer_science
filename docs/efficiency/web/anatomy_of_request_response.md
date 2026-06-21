---
date: "2026-06-21 12:00"
title: "Anatomy of an HTTP Request and Response"
description: "Methods, status codes, headers, and body — the four parts of every HTTP exchange and how they form the contract your API actually promises."
---

# Anatomy of an HTTP Request and Response

!!! tip "Part of a Learning Path"
    This article is part of the [How APIs Actually Work](https://bradpenney.io/pathways/how-apis-work) pathway on [bradpenney.io](https://bradpenney.io) — a guided sequence through the topic. It also stands on its own.

Strip away the libraries and an HTTP request is just a few lines of text in a rigid shape: a method, a path, some headers, maybe a body — answered by a status code and the same shape in reverse. You already use every part of it — reading `404` by instinct, setting `Content-Type` because the docs said to, dropping JSON in the body. What usually goes unexamined is what each part is actually *for*, and that's exactly the gap that opens the moment you're defining endpoints for someone else to build against.

So let's name the parts. There are only a handful, each with a fixed job — and together they spell out something you've already met: [the API contract](../../essentials/what_is_an_api.md) is written, quite literally, in these slots.

This is the detailed view of each arrow in [the request/response lifecycle](client_server_request_response.md).

## A Request Has Four Parts

Strip away the libraries and an HTTP request is just text with a rigid structure. Here's a real one:

```http title="A raw HTTP request" linenums="1"
POST /orders HTTP/1.1
Host: api.example.com
Authorization: Bearer abc123
Content-Type: application/json

{"product_id": 7, "quantity": 2}
```

Four parts, and you've used all of them:

- **The method** (`POST`) — *what kind of action* you want.
- **The path** (`/orders`) — *which resource* you're acting on.
- **The headers** (`Host`, `Authorization`, `Content-Type`) — *metadata about the request*.
- **The body** (`{"product_id": 7, ...}`) — *the data you're sending* (not every request has one).

## Where You've Seen This

Every Postman request you've built is these four parts in a GUI: the method dropdown, the URL bar, the Headers tab, and the Body tab. Postman is just a friendly face over raw HTTP.

## The Method: What Action

The method (or "verb") tells the server what *kind* of operation you intend. They map cleanly onto the things any API does to a resource:

| Method | Intent | Example |
| :--- | :--- | :--- |
| `GET` | Read; never changes anything | `GET /orders/88` |
| `POST` | Create something new | `POST /orders` |
| `PUT` | Replace a resource wholesale | `PUT /orders/88` |
| `PATCH` | Modify part of a resource | `PATCH /orders/88` |
| `DELETE` | Remove a resource | `DELETE /orders/88` |

Two properties matter enough to design around:

- **Safe** — `GET` must never change server state. A `GET` that deletes something is a contract violation that *will* burn you (web crawlers and prefetchers issue `GET`s freely).
- **Idempotent** — calling it repeatedly has the same effect as calling it once. `GET`, `PUT`, and `DELETE` are idempotent; `POST` generally isn't (two `POST /orders` calls make two orders). This drives whether a client can safely *retry* after a timeout — and the production fix for non-idempotent `POST`s is an **idempotency key**, a deeper API-design topic.

!!! tip "Idempotent ≠ identical response"

    Idempotent means the *server state* ends up the same, not that you get the same response each time. `DELETE /orders/88` typically returns `204` the first time and `404` the second (it's already gone) — the resulting state is identical, the status code isn't. Don't read "idempotent" as "always returns the same code."

## The Path: Which Resource

The path names the *thing* you're acting on. Good APIs treat paths as **nouns** (resources), with the method supplying the verb:

- `GET /users/42/orders` — "read the orders belonging to user 42"
- `POST /users/42/orders` — "create a new order for user 42"

`POST /createOrder` works mechanically but fights the design: the verb belongs in the method, not the path. Combine method + path and you get a sentence — `DELETE /orders/88` reads as "delete order 88."

## Headers: Metadata About the Message

Headers are key-value pairs that describe the message without being the message. They're how the request and response negotiate *how to talk*. The ones you'll touch constantly:

| Header | Direction | What it does |
| :--- | :--- | :--- |
| `Content-Type` | both | Declares the body's format (`application/json`) so the other side parses it correctly |
| `Authorization` | request | Carries the credential proving who's asking |
| `Accept` | request | "Send me back *this* format" |
| `Cache-Control` | response | How long this response may be reused |
| `Set-Cookie` | response | Hands the client a cookie (e.g., a session ID) |

A request that sends JSON but omits `Content-Type: application/json` is a top-three cause of "the server rejected my perfectly good body" — it sent the data without telling the server how to read it.

## The Body: The Payload

The body is the actual data. Requests that *send* data (`POST`, `PUT`, `PATCH`) carry a body; `GET` and `DELETE` usually don't. Responses carry a body too — the resource you asked for, or an error explaining what went wrong. The body's format is whatever `Content-Type` promised, which for most APIs is JSON.

## A Response Has the Same Shape — Plus a Status Code

The server answers with a mirror structure, led by the part you read first:

```http title="A raw HTTP response" linenums="1"
HTTP/1.1 201 Created
Content-Type: application/json
Location: /orders/88

{"id": 88, "product_id": 7, "quantity": 2, "status": "pending"}
```

- **Status code** (`201 Created`) — the headline: what happened.
- **Headers** (`Content-Type`, `Location`) — metadata about the answer.
- **Body** — the resulting resource, or an error.

### Status Codes Come in Families

You don't memorize 60 codes; you learn five *families* by their first digit, then a handful of specifics.

| Family | Meaning | You'll use |
| :--- | :--- | :--- |
| `1xx` | Informational | (rare) |
| `2xx` | Success | `200 OK`, `201 Created`, `204 No Content` |
| `3xx` | Redirection | `301 Moved Permanently`, `304 Not Modified` |
| `4xx` | **Client** error — *you* sent something wrong | `400`, `401`, `403`, `404`, `429` |
| `5xx` | **Server** error — the server broke | `500`, `502`, `503` |

The single most useful distinction is **`4xx` vs `5xx`**: a `4xx` says "fix your request" (bad input, missing auth, wrong URL), while a `5xx` says "the server failed — retrying might help." Confusing the two — returning `500` when the user simply sent bad input — sends everyone debugging in the wrong direction.

A few worth knowing cold:

- `400 Bad Request` — malformed input.
- `401 Unauthorized` — you're not authenticated (the server doesn't know who you are). *Misnamed; it's really "unauthenticated."*
- `403 Forbidden` — you're authenticated but not allowed. (The `401`/`403` split is exactly [authentication vs authorization](authentication_vs_authorization.md).)
- `404 Not Found` — no such resource.
- `429 Too Many Requests` — you're being rate-limited.
- `500 Internal Server Error` — unhandled server-side failure.
- `502 Bad Gateway` / `503 Service Unavailable` — common when something *in front of* your app (a proxy or gateway) can't reach it — see [reverse proxies and API gateways](https://networking.bradpenney.io/efficiency/api_gateways/reverse_proxies_and_gateways/).

## This Is the Contract, Made Concrete

Recall the three parts of [the contract](../../essentials/what_is_an_api.md): address, request shape, response shape. The anatomy *is* those parts:

- **Address** = method + path.
- **Request shape** = headers + body.
- **Response shape** = status code + headers + body.

Designing an endpoint is nothing more than deciding, for each operation: which method and path, which headers and body the client must send, and which status codes and body you'll return. Write those down and you've written the contract.

## Why This Matters for Production Code

- **Right method, right semantics.** Using `GET` for reads (safe, cacheable) and `POST` for creates isn't pedantry — caches, proxies, and browsers make real decisions based on the method.
- **Honest status codes are an API's error language.** Returning `200 OK` with `{"error": "..."}` in the body forces every client to parse the body to learn it failed, defeating every tool that keys off status. Return `4xx`/`5xx` so failures are visible to monitoring, retries, and humans.
- **Headers are where security and content negotiation live.** Most "why won't this request work?" mysteries are a missing or wrong header (`Content-Type`, `Authorization`, `Accept`), not a broken body.

## Technical Interview Context

Expect "what's the difference between `PUT` and `PATCH`?" or "when would you return `401` vs `403`?" The reliable way to shine is to anchor answers in *properties*, not trivia: `PUT` replaces and is idempotent, `PATCH` partially updates and may not be; `401` means unauthenticated (we don't know you), `403` means authenticated-but-forbidden (we know you, and no). If asked about retries, connect it to idempotency — a client can safely retry an idempotent request after a timeout, but retrying a `POST` risks creating duplicates.

## Practice Problems

??? question "Practice Problem 1: Pick the Method"

    You're designing an endpoint to mark a single order as cancelled, changing only its `status` field. Which method fits best, and why not `GET`?

    ??? tip "Solution"

        `PATCH /orders/88` is the best fit: you're modifying *part* of an existing resource. `PUT` would imply replacing the entire order. `GET` is wrong because it's **safe** — it must never change state — and tools like crawlers and prefetchers fire `GET`s freely, so a state-changing `GET` can be triggered accidentally.

??? question "Practice Problem 2: 4xx or 5xx?"

    A client sends a request with an expired token. A teammate returns `500`. Why is that wrong, and what should it be?

    ??? tip "Solution"

        An expired token is a **client problem** — the request is invalid — so it belongs in the `4xx` family, specifically `401 Unauthorized` (unauthenticated). Returning `500` falsely signals a *server* failure, which will trigger the wrong alerts, encourage pointless retries, and send on-call engineers hunting for a bug that doesn't exist. The status code family is a promise about *whose fault it is*.

??? question "Practice Problem 3: The Silent Failure"

    An API returns `200 OK` with body `{"success": false, "error": "not found"}` whenever a resource is missing. What problems does this create?

    ??? tip "Solution"

        It lies to every consumer that reads the status code. Monitoring sees only `200`s and reports the API as 100% healthy while users hit failures. Caches may store the "success" response. Generic HTTP clients and retry logic can't tell it failed without parsing the body. The correct design returns `404 Not Found` so the failure is visible at the protocol level — the status code is the API's primary error signal, and overriding it with `200` blinds the whole ecosystem.

## Key Takeaways

| Concept | What It Means |
| :--- | :--- |
| **Four request parts** | Method, path, headers, body |
| **Method = verb** | `GET`/`POST`/`PUT`/`PATCH`/`DELETE`; mind *safe* and *idempotent* |
| **Path = noun** | Name resources; let the method supply the action |
| **Headers = metadata** | `Content-Type`, `Authorization`, `Accept` carry the "how" |
| **Status families** | `2xx` ok, `3xx` redirect, `4xx` your fault, `5xx` server's fault |
| **Anatomy = contract** | Address + request shape + response shape, made concrete |

An HTTP message looks intimidating until you see it's just four parts with fixed jobs: an action, a target, some metadata, and a payload — answered by a status code, more metadata, and a payload. That structure isn't bureaucracy; it's the vocabulary your API contract is written in. Master the anatomy and "designing an endpoint" becomes "deciding what goes in each slot."

## Further Reading

### Related Reading

- [What an API Actually Is](../../essentials/what_is_an_api.md) — the contract these four parts spell out.
- [Client and Server: The Request/Response Lifecycle](client_server_request_response.md) — the round trip each message belongs to.
- [Authentication vs Authorization in APIs](authentication_vs_authorization.md) — the `401` vs `403` distinction, in depth.

### External Resources

- [MDN: HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) — the authoritative list with semantics.
- [MDN: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) — every code, grouped by family.
- [MDN: HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) — the full header reference.