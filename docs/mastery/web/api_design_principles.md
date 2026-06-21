---
date: "2026-06-21 12:00"
title: "API Design Principles: REST, Idempotency, Versioning"
description: "Design APIs that survive production: resource modeling, idempotency, versioning, pagination, and error contracts — the decisions that bite you later."
---

# API Design Principles: REST, Idempotency, Versioning

By now the fog has lifted: an API is [a contract](../../essentials/what_is_an_api.md), executed over [a stateless protocol](../../efficiency/web/http_statelessness.md), shaped by [request/response anatomy](../../efficiency/web/anatomy_of_request_response.md), guarded by [authentication and authorization](../../efficiency/web/authentication_vs_authorization.md). This article is about the decisions that separate an API that *works in the demo* from one that survives years of production, third-party integrations, and 3am incidents.

These are the choices you can't easily undo once clients depend on them. Get them right early.

## REST Is a Set of Constraints, Not a Vibe

"REST" gets used to mean "JSON over HTTP," but it's a specific architectural style with constraints worth honoring because each one buys you something:

- **Resources, identified by URLs.** Model your domain as *nouns* (`/orders`, `/users/42`) and use HTTP methods as the verbs. The payoff is a uniform, predictable interface.
- **Stateless interactions.** Each request carries its own context (see [statelessness](../../efficiency/web/http_statelessness.md)). The payoff is horizontal scalability.
- **Uniform interface.** The same small method set (`GET`/`POST`/`PUT`/`PATCH`/`DELETE`) with consistent semantics everywhere. The payoff is that clients and tooling generalize across endpoints.
- **Cacheability.** Responses declare whether and how long they can be reused. The payoff is performance and reduced load.

You don't have to be a REST purist. You *should* know which constraint you're relaxing and what it costs. Dropping cacheability to ship faster is a choice; doing it by accident is a future incident.

!!! tip "REST is not the only option"

    GraphQL (one endpoint, client-specified queries) and gRPC (binary, contract-first, great for service-to-service) are mature alternatives. REST remains the default for public, human-readable, broadly-consumed APIs because of its cacheability and ubiquity. Choose by audience: public/partner → usually REST; internal high-throughput service mesh → often gRPC; complex, client-driven read shapes → GraphQL.

## Resource Modeling: Nouns, Hierarchy, and Relationships

Good URLs read like sentences and encode relationships:

```text title="Resource-oriented design"
GET    /users/42/orders          # orders belonging to user 42
POST   /users/42/orders          # create an order for user 42
GET    /orders/88                # a specific order
PATCH  /orders/88                # partially update it
DELETE /orders/88                # remove it
```

Principles that age well:

- **Plural collection nouns** (`/orders`, not `/order` or `/getOrders`). The method is the verb.
- **Nest to show ownership**, but don't nest more than one level deep — `/users/42/orders/88/items/3/tax` is a maintenance trap. Prefer `/order-items/55` once a resource has its own identity.
- **Avoid verbs in paths.** When an action genuinely isn't CRUD (e.g., "publish"), model it as a sub-resource state change (`PATCH /articles/9 {"status":"published"}`) or, pragmatically, a clearly-named action sub-resource (`POST /articles/9/publish`). Pick one convention and hold it.

## Idempotency: The Property That Makes Retries Safe

Networks fail *after* the server did the work but *before* the client got the response. The client doesn't know if it succeeded. Can it retry safely? That depends on **idempotency** — whether repeating a request has the same effect as making it once.

| Method | Idempotent? | Safe to blindly retry? |
| :--- | :--- | :--- |
| `GET` | Yes | Yes |
| `PUT` | Yes (full replace lands in the same state) | Yes |
| `DELETE` | Yes (deleting twice = still deleted) | Yes |
| `POST` | **No** (each call creates a new resource) | **No** — risks duplicates |

The hard case is `POST`. A payment client that retries a timed-out `POST /charges` could charge the customer twice. The production-grade solution is an **idempotency key**:

```http title="Idempotent POST via client-supplied key" linenums="1"
POST /charges HTTP/1.1
Idempotency-Key: 7f3c-customer42-order88
Content-Type: application/json

{"amount_cents": 1999, "currency": "usd"}
```

The server records the key with the result of the first request. If the same key arrives again (a retry), it returns the *original* result instead of charging again. This is how Stripe and every serious payments API make retries safe — and it's the kind of decision you must design in from the start, because clients build their retry logic around it. In practice the key and its stored result live in a fast key-value store (often Redis) with a **TTL of roughly 24–72 hours** — long enough to absorb any realistic retry, short enough that storage doesn't grow without bound.

## Versioning: You Will Need to Change the Contract

A published contract is a promise, and requirements change. Versioning is how you evolve *without breaking* existing clients. Three approaches:

=== ":material-routes: URL Path (most common)"

    ```text
    GET /v1/orders/88
    GET /v2/orders/88
    ```

    Explicit, visible, trivially routable and cacheable. The pragmatic default for public APIs. Downside: it's technically un-RESTful (the resource hasn't changed, just its representation) and can encourage whole-API version bumps.

=== ":material-tag: Header / Media Type"

    ```http
    GET /orders/88
    Accept: application/vnd.example.v2+json
    ```

    Keeps URLs stable and versions the *representation*, which is more RESTful. Downside: invisible in a browser, harder to test by hand, easier for clients to get wrong.

=== ":material-flag: Evolution / Additive Only"

    Never break; only *add*. New optional fields, new endpoints, never removing or repurposing existing fields. Avoids version proliferation entirely — but demands discipline and a tolerant-reader contract on the client side.

Whichever you choose, the rules that prevent pain:

- **Additive changes are safe** (new optional fields, new endpoints). **Removals and renames are breaking** — they need a new version.
- **Deprecate, don't delete.** Announce, set a sunset date, emit a `Deprecation`/`Sunset` header, and give integrators time. Pulling a field out from under a partner is how you lose them.
- **Document the contract as a spec** (OpenAPI). A machine-readable contract generates clients, mocks, and tests — and makes "what changed?" a diff.

## Pagination: Never Return an Unbounded List

`GET /orders` that returns *all* orders works in development with 12 rows and falls over in production with 12 million. Decide the pagination strategy before the first client integrates, because it shapes their loops.

=== ":material-numeric: Offset / Limit"

    ```text
    GET /orders?limit=50&offset=100
    ```

    Simple and allows jumping to arbitrary pages. Breaks down at scale: deep offsets are slow (the database still scans skipped rows), and inserts during paging cause items to shift or repeat.

=== ":material-cursor-default: Cursor / Keyset"

    ```text
    GET /orders?limit=50&after=eyJpZCI6ODh9
    ```

    The response returns an opaque cursor pointing to "where you left off." Stable under inserts and fast at any depth because it seeks rather than skips. The right default for large or fast-changing datasets. Downside: no random page access.

Always return pagination metadata (next cursor, or total/limit/offset) so clients can iterate without guessing.

## Error Contracts: Failures Are Part of the API

Your error responses are an interface that clients code against — design them as deliberately as your success responses.

- **Use honest [status codes](../../efficiency/web/anatomy_of_request_response.md).** `4xx` for client mistakes, `5xx` for server failures. Never `200` with an error body.
- **Use a consistent error shape across every endpoint.** A machine-readable code, a human message, and ideally a link or trace ID:

```json title="A consistent, machine-readable error body" linenums="1"
{
  "error": {
    "code": "insufficient_funds",
    "message": "The card has insufficient funds.",
    "request_id": "req_9f2b8c"
  }
}
```

- **Make `code` stable and machine-parseable**; let `message` be the human-friendly, changeable part. Clients branch on `code`, display `message`, and quote `request_id` in support tickets.
- **Consider [RFC 9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457.html)** (`application/problem+json`) as a ready-made standard so clients don't have to learn your bespoke error format.

## Rate Limiting and Other Production Realities

Public APIs need guardrails, and clients need to be told the rules:

- **Communicate limits in headers** (`RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`) and return [`429 Too Many Requests`](../../efficiency/web/anatomy_of_request_response.md) with a `Retry-After` when exceeded, so well-behaved clients can back off.
- **Validate and bound every input.** Cap `limit`, reject oversized bodies, whitelist sortable fields. Unbounded inputs are both a stability and a security problem.
- **Push authorization down to the object level.** The most common API breach is an authenticated user reaching another user's resource — design every read and write to check ownership, not just identity (see [authentication vs authorization](../../efficiency/web/authentication_vs_authorization.md)).

## Why This Matters for Production Code

- **These decisions are nearly irreversible once clients integrate.** Changing your pagination model or error shape after partners depend on it is a coordinated migration, not a patch. The cost of getting them right is one design conversation; the cost of getting them wrong compounds with every integrator.
- **Idempotency is the difference between safe and dangerous retries.** Without it, every network blip risks duplicate orders, double charges, and reconciliation nightmares.
- **A documented, versioned contract is what lets teams move independently** — the original promise of an API. Without versioning discipline, every change becomes a cross-team fire drill.

## Technical Interview Context

Senior API-design interviews probe exactly these trade-offs. Expect "how would you make this `POST` safe to retry?" (idempotency keys), "how do you evolve an API without breaking clients?" (additive change, deprecation policy, versioning strategy and its costs), and "how would you paginate a billion-row endpoint?" (cursor/keyset over offset, and *why* — seek vs skip, stability under inserts). The signal interviewers look for is that you reason about the *client's* experience and the *failure modes*, not just the happy path — and that you can name what each REST constraint actually buys.

## Practice Problems

??? question "Practice Problem 1: Safe Retries"

    A mobile client creates an order with `POST /orders`. On flaky networks it sometimes times out, and the user taps "retry," occasionally producing duplicate orders. How do you fix this without removing the retry?

    ??? tip "Solution"

        Introduce an **idempotency key**. The client generates a unique key per logical order attempt and sends it as a header (e.g., `Idempotency-Key`). The server stores the key alongside the result of the first successful creation. A retry with the same key returns the *original* order instead of creating a second one. `POST` isn't idempotent by nature, so you engineer idempotency on top — and because the client must generate and reuse the key, this has to be designed into the contract up front.

??? question "Practice Problem 2: The Breaking Rename"

    Three external partners depend on `GET /v1/customers` returning a `phone` field. Product wants to split it into `mobile` and `landline`. How do you ship this without breaking the partners?

    ??? tip "Solution"

        Treat removal/rename of `phone` as a **breaking change**. The safe path: *add* `mobile` and `landline` as new fields in `v1` while *keeping* `phone` populated (additive change — non-breaking). Then introduce `v2` where `phone` is gone, document it, and announce a deprecation timeline for `v1`'s `phone` with a `Sunset` header. Partners migrate on their schedule. Never silently repurpose or drop a field clients depend on — that's a contract breach disguised as a refactor.

??? question "Practice Problem 3: Pagination at Scale"

    `GET /events` uses `?limit=&offset=`. It's fine in staging but in production, page 5,000 takes 8 seconds and users report events appearing twice or vanishing while scrolling. Diagnose and fix.

    ??? tip "Solution"

        Two classic offset problems. **Slowness:** deep offsets force the database to scan and discard all skipped rows, so latency grows with depth. **Duplicates/gaps:** new events inserted between page requests shift every subsequent offset, so items repeat or disappear. The fix is **cursor (keyset) pagination**: return an opaque cursor marking the last item, and have the next request seek *after* it (`?after=<cursor>`). Seeking is fast at any depth and stable under inserts. The trade-off — losing random page access — is almost always acceptable for large feeds.

## Key Takeaways

| Concept | What It Means |
| :--- | :--- |
| **REST constraints** | Resources, statelessness, uniform interface, cacheability — each buys something |
| **Resource modeling** | Plural nouns, shallow nesting, verbs in methods not paths |
| **Idempotency** | Repeating = same effect; engineer it for `POST` via idempotency keys |
| **Versioning** | Additive is safe; removals break; deprecate with a sunset, never silently drop |
| **Pagination** | Cursor/keyset beats offset at scale (seek vs skip, stable under inserts) |
| **Error contract** | Honest status codes + a consistent, machine-readable error shape |
| **Production guardrails** | Rate-limit headers + `429`, bounded inputs, object-level authorization |

## Further Reading

### Foundations (This Series)

- **[What an API Actually Is](../../essentials/what_is_an_api.md)** — the contract these principles protect.
- **[Authentication vs Authorization](../../efficiency/web/authentication_vs_authorization.md)** — the security model these designs assume.

### External Resources

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) — the standard for documenting your contract as a machine-readable spec.
- [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines) — a mature, opinionated production rulebook.
- [Stripe API reference](https://stripe.com/docs/api) — a widely-admired example of idempotency, versioning, and error design done well.
- [RFC 9457: Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457.html) — a standard error format worth adopting.

---

The difference between an API that works and an API that *lasts* is almost entirely in the decisions you can't take back: how you model resources, how you make failures safe to retry, how you evolve without breaking, and how you tell clients what went wrong. Make these deliberately, document them as a contract, and your API becomes something other teams can build on for years — which was the entire point of having an API in the first place.
