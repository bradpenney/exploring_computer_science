---
date: "2026-07-09 12:00"
title: "Public-Key Cryptography: How Strangers Share Secrets"
description: "How do two machines agree on an encryption key while attackers watch every packet? The asymmetric crypto under TLS, SSH, and JWTs, minus the heavy math."
---

# Public-Key Cryptography: How Strangers Share Secrets

!!! tip "Part of a Learning Path"
    This article is part of the [Put Your Kubernetes App on the Internet](https://bradpenney.io/pathways/cluster-to-internet) pathway on [bradpenney.io](https://bradpenney.io) — a guided sequence through the topic. It also stands on its own.

An SSH public key gets pasted into GitHub without a second thought about it being, well, *public*. `RS256` gets picked from a dropdown to sign JWTs. A TLS handshake flies by in `curl -v`, unremarked. All of it works, teams ship on top of it daily, and underneath all of it sits one question most engineers have never had to answer:

**How can two machines that have never met agree on a secret, while an attacker reads every packet they exchange?**

That question was considered unsolvable for most of the history of cryptography. The answer, public-key (asymmetric) cryptography, is the theory this article covers, and it's less math-heavy than its reputation. You need three ideas and one worked example, and suddenly SSH keys, certificates, and token signing stop being ritual and start being obvious.

## Where You Might Have Seen This

Public-key cryptography is likely the theory you *use* most and understand least:

- **SSH keys** — `id_ed25519` and `id_ed25519.pub` are a private/public key pair; the server holding your public key can verify you without ever knowing a secret it could leak.
- **The HTTPS padlock** — every TLS handshake uses asymmetric crypto to establish trust and keys before a byte of application data moves.
- **JWT signing** — `RS256` means an auth service signs tokens with a private key and every other service verifies them with the public one.
- **Signed commits and packages** — `git tag -s`, Sigstore, apt/rpm repositories: a signature proves *who* published and that nothing changed since.
- **Your kubeconfig** — that `client-certificate-data` blob is a certificate for a key pair; it's how the cluster knows it's you.

One theory, five tools you touched this week.

## The Problem: Symmetric Keys Don't Scale to Strangers

Classical **symmetric** encryption uses one shared key for both directions: AES today, and everything from Caesar to Enigma historically. It's fast and battle-tested, and it has a bootstrap problem that no amount of engineering fixes:

- **Both sides need the key before they can talk securely**, but distributing the key *is itself* a secret message. You can't encrypt your way out; the first key has to travel unprotected or out-of-band.
- **It doesn't scale.** With *n* parties each needing a pairwise secret, you're managing $O(n^2)$ keys. Your browser talking to a thousand sites can't pre-share a thousand keys, and couriers with briefcases don't fit in a TLS handshake.

For centuries this was accepted as the nature of the problem: secure communication required a prior secure channel. Then in 1976, Whitfield Diffie and Martin Hellman published *New Directions in Cryptography* and showed the assumption was simply false — two parties can create a shared secret **entirely in public**. RSA followed a year later. (Mathematicians at GCHQ had quietly found the same results a few years earlier; classified, the discovery stayed secret for decades.)

## The Idea: Functions That Only Go One Way

Everything asymmetric rests on **one-way functions**: operations that are cheap to compute forward and impractical to reverse.

- Multiplying two large primes is instant; **factoring** the 2000-bit product back into those primes would take longer than you have (that asymmetry is RSA).
- Raising a base to a secret power in modular arithmetic is instant; recovering that secret exponent from the result — taking a **discrete logarithm** — would take longer than you have (that asymmetry is Diffie-Hellman).

A **key pair** is a matched set built on such a function: the **public key** can be handed to anyone (adversaries included), because going backward from it to the **private key** is the intractable direction. That one property splits into the two capabilities you use daily:

<div class="grid cards" markdown>

-   :material-lock: __Encrypt to a public key__

    ---

    **Why it matters:** anyone can *lock*; only the private key holder can *unlock*.

    Encrypt a message with someone's public key and only their private key decrypts it — no shared secret needed beforehand.

-   :material-draw-pen: __Sign with a private key__

    ---

    **Why it matters:** only the key holder can *produce* a signature; anyone can *check* one.

    A valid signature proves the holder of the private key produced this exact content — identity and integrity in one check.

</div>

And one more capability, the one that answers the opening question, deserves its own section.

## Key Exchange: Agreeing on a Secret in Public

Diffie-Hellman key exchange lets two parties *construct* a shared secret while an eavesdropper watches everything. With toy numbers (real ones are thousands of bits), here's the entire protocol. Alice and Bob publicly agree on two numbers anyone may see: a modulus of 23 and a base of 5 (the *p* and *g* in the table).

| Step | Alice | Bob | Eve sees |
| :--- | :--- | :--- | :--- |
| Pick a private number | $a = 6$ | $b = 15$ | — |
| Compute public value | $A = 5^6 \bmod 23 = 8$ | $B = 5^{15} \bmod 23 = 19$ | $A = 8$, $B = 19$ |
| Exchange public values | sends $A$, receives $B$ | sends $B$, receives $A$ | both values |
| Combine with own secret | $B^a = 19^6 \bmod 23 = 2$ | $A^b = 8^{15} \bmod 23 = 2$ | — |

Both arrive at **2** — the same number, guaranteed: raising the base to Alice's secret power and then Bob's lands in exactly the same place as doing it in the other order, so the two sides always compute the identical value. Eve holds the modulus, the base, and both public values (8 and 19), but combining them *without a private exponent* gets her nothing — she'd need to work a public value backward to its secret exponent, and that's the discrete logarithm: the one-way direction. At toy size she could brute-force it; at 2048 bits (or on the elliptic curves modern TLS actually uses, like X25519), she cannot.

The exchange is short enough to implement over coffee:

=== ":material-language-python: Python"

    ```python title="Diffie-Hellman with toy numbers" linenums="1"
    p, g = 23, 5              # (1)!

    a = 6                     # (2)!
    b = 15

    A = pow(g, a, p)          # (3)!
    B = pow(g, b, p)

    alice_secret = pow(B, a, p)
    bob_secret = pow(A, b, p)

    assert alice_secret == bob_secret == 2   # (4)!
    ```

    1. The public parameters — Eve knows these.
    2. The private exponents (Alice's `a`, Bob's `b`) are never transmitted. Everything Eve needs is exactly what neither party sends.
    3. `pow(base, exp, mod)` is Python's built-in modular exponentiation — the "easy direction." Alice sends `8`, Bob sends `19`.
    4. Both sides constructed the same secret; nothing secret ever crossed the wire.

=== ":material-language-javascript: JavaScript"

    ```javascript title="Diffie-Hellman with toy numbers" linenums="1"
    function modPow(base, exp, mod) {      // square-and-multiply
      let result = 1n;
      base %= mod;
      while (exp > 0n) {
        if (exp & 1n) result = (result * base) % mod;
        base = (base * base) % mod;
        exp >>= 1n;
      }
      return result;
    }

    const p = 23n, g = 5n;                 // public parameters
    const a = 6n, b = 15n;                 // private exponents

    const A = modPow(g, a, p);             // Alice sends 8
    const B = modPow(g, b, p);             // Bob sends 19

    console.log(modPow(B, a, p));          // 2n — Alice's secret
    console.log(modPow(A, b, p));          // 2n — Bob's secret, identical
    ```

=== ":material-language-go: Go"

    ```go title="Diffie-Hellman with toy numbers" linenums="1"
    package main

    import (
        "fmt"
        "math/big"
    )

    func main() {
        p, g := big.NewInt(23), big.NewInt(5) // public parameters
        a, b := big.NewInt(6), big.NewInt(15) // private exponents

        A := new(big.Int).Exp(g, a, p)        // Alice sends 8
        B := new(big.Int).Exp(g, b, p)        // Bob sends 19

        aliceSecret := new(big.Int).Exp(B, a, p)
        bobSecret := new(big.Int).Exp(A, b, p)

        fmt.Println(aliceSecret, bobSecret)   // 2 2
    }
    ```

=== ":material-language-rust: Rust"

    ```rust title="Diffie-Hellman with toy numbers" linenums="1"
    fn mod_pow(mut base: u128, mut exp: u128, modulus: u128) -> u128 {
        let mut result = 1;
        base %= modulus;
        while exp > 0 {
            if exp & 1 == 1 {
                result = result * base % modulus;
            }
            base = base * base % modulus;
            exp >>= 1;
        }
        result
    }

    fn main() {
        let (p, g) = (23u128, 5u128); // public parameters
        let (a, b) = (6u128, 15u128); // private exponents

        let big_a = mod_pow(g, a, p); // Alice sends 8
        let big_b = mod_pow(g, b, p); // Bob sends 19

        assert_eq!(mod_pow(big_b, a, p), mod_pow(big_a, b, p)); // both == 2
        println!("shared secret: {}", mod_pow(big_b, a, p));
    }
    ```

=== ":material-language-java: Java"

    ```java title="Diffie-Hellman with toy numbers" linenums="1"
    import java.math.BigInteger;

    public class DiffieHellman {
        public static void main(String[] args) {
            BigInteger p = BigInteger.valueOf(23); // public parameters
            BigInteger g = BigInteger.valueOf(5);
            BigInteger a = BigInteger.valueOf(6);  // private exponents
            BigInteger b = BigInteger.valueOf(15);

            BigInteger A = g.modPow(a, p);         // Alice sends 8
            BigInteger B = g.modPow(b, p);         // Bob sends 19

            System.out.println(B.modPow(a, p));    // 2 — Alice's secret
            System.out.println(A.modPow(b, p));    // 2 — Bob's, identical
        }
    }
    ```

=== ":material-language-cpp: C++"

    ```cpp title="Diffie-Hellman with toy numbers" linenums="1"
    #include <cstdint>
    #include <iostream>

    uint64_t mod_pow(uint64_t base, uint64_t exp, uint64_t mod) {
        uint64_t result = 1;
        base %= mod;
        while (exp > 0) {
            if (exp & 1) result = (__uint128_t)result * base % mod;
            base = (__uint128_t)base * base % mod;
            exp >>= 1;
        }
        return result;
    }

    int main() {
        const uint64_t p = 23, g = 5;  // public parameters
        const uint64_t a = 6, b = 15;  // private exponents

        uint64_t A = mod_pow(g, a, p); // Alice sends 8
        uint64_t B = mod_pow(g, b, p); // Bob sends 19

        std::cout << mod_pow(B, a, p) << " "   // 2
                  << mod_pow(A, b, p) << "\n"; // 2
    }
    ```

One production refinement worth knowing by name: TLS runs this exchange with **ephemeral** keys, fresh secret exponents for every connection, discarded afterward. That's **forward secrecy**: even if a server's long-term private key is stolen next year, recorded traffic from today can't be decrypted, because the session secrets were never derivable from that key.

And notice what just happened: the question this article opened with — *how do two machines agree on a secret while an attacker reads every packet?* — has a complete answer, and it fit on one screen.

## Signatures: The Same Trick, Run Backward

Encryption uses the public key to lock and the private key to unlock. A **digital signature** runs the asymmetry the other way: the private key *produces* something only it could produce, and the public key lets anyone *verify* it.

In practice the signer doesn't sign the whole document — it hashes the content to a fixed-size digest first, then signs the digest. Verification recomputes the hash and checks the signature against it. A valid signature therefore proves two things at once: the private key holder produced it (**authenticity**), and the content hasn't changed by a single bit since (**integrity**).

This is the primitive underneath the web's entire trust infrastructure: a TLS **certificate** is, at its core, a certificate authority's *signature* over the claim "this hostname is bound to this public key." Verifying a certificate chain is verifying signatures, link by link — which is why the mechanics live in [TLS Basics](https://networking.bradpenney.io/essentials/tls/tls_basics/) and the theory lives here.

## Why This Matters for Production Code

- **The `HS256` vs `RS256` dropdown is an architecture decision.** `HS256` is *symmetric*: the same secret signs and verifies, so every service that verifies tokens can also **mint** them: one compromised service forges identity for the fleet. `RS256` is asymmetric: services hold only the public key and can verify but never mint. In a microservices estate, that's the whole ballgame.
- **Hybrid systems are the norm, and now you know why.** Asymmetric operations are orders of magnitude slower than AES, so TLS uses them only to authenticate and establish a shared secret — then hands the actual traffic to symmetric encryption. Nobody encrypts gigabytes with RSA; anyone who claims to is describing a system that doesn't exist.
- **Public keys are public; private keys are the entire secret.** Committing `id_ed25519.pub` somewhere is harmless by design. The private key, the JWT signing key, the CA key — those are the crown jewels: an attacker holding one doesn't *break* your cryptography, they *become* you inside it. That asymmetry should drive where keys live, who can read them, and how fast you can rotate.
- **Cert errors become legible.** "Self-signed," "unknown issuer," "expired" are all the same event (a signature-verification step declining) at different links of the chain. You stop fearing the error and start reading it.

## Technical Interview Context

The questions here separate "has used TLS" from "understands it":

- *"Why does TLS use both asymmetric and symmetric encryption?"* — The layered answer: asymmetric solves key distribution but is too slow for bulk data; symmetric is fast but can't bootstrap between strangers. TLS uses each where it's strong: asymmetric to authenticate and agree on keys, symmetric for the payload. Volunteering *forward secrecy* (ephemeral key exchange, so recorded traffic stays safe even after a key theft) is the senior-level flourish.
- *"Your auth service signs JWTs. `HS256` or `RS256`, and why?"* — The trap is answering with performance. The real axis is *blast radius*: shared-secret verification means every verifier is also a minter. Asymmetric signing confines minting to the auth service and hands everyone else a public key.
- *"What does a certificate actually prove?"* — Weak answer: "the site is secure." Strong answer: a CA signed a binding between a *name* and a *public key*, so a client that trusts the CA can conclude it's talking to a holder of that name's private key. Nothing about the site being honest, competent, or safe — only that it is who it claims.

## Practice Problems

??? question "Practice Problem 1: Who Holds Which Key?"

    Your auth service issues `RS256` JWTs. Six other services verify those tokens. For each of the seven services: which key does it hold, and what's the impact if that service is fully compromised?

    ??? tip "Solution"

        The **auth service holds the private key** — it's the only service that can *sign* (mint) tokens. The **six verifiers hold only the public key**: enough to check signatures, useless for forging them. Compromise a verifier and the attacker gains that service's data and privileges, but **cannot mint tokens**; the incident stays local. Compromise the auth service and the attacker can issue arbitrary valid identities to the whole estate — which is exactly why signing keys get stricter storage, tighter access, and faster rotation than anything else in the system. (With `HS256`, all seven services would hold the *same* secret, and every one of them would be the worst case.)

??? question "Practice Problem 2: Why Hash Before Signing?"

    Signature schemes sign a *hash* of the message rather than the message itself. Give two reasons — one about performance, one about what the signature protects.

    ??? tip "Solution"

        **Performance:** asymmetric operations are slow and work on fixed-size inputs; hashing a 2 GB artifact down to 32 bytes and signing the digest costs almost nothing compared to running private-key math over gigabytes. **Protection:** a cryptographic hash changes completely if any bit of the input changes, so signing the digest binds the signature to the *entire* content: flip one byte anywhere and verification fails. The digest acts as a fixed-size fingerprint of everything, so integrity coverage is total even though the signature only ever touched 32 bytes.

??? question "Practice Problem 3: Two Thefts, Two Incidents"

    Incident A: an attacker exfiltrates your TLS *certificate* file. Incident B: an attacker exfiltrates your JWT signing *private key*. Rate the severity of each and justify it from the theory.

    ??? tip "Solution"

        **Incident A is a non-event.** A certificate is *public by design*: it's presented to every client in every handshake. Holding it without the matching private key lets the attacker do nothing: they can't complete a handshake as you, because the handshake requires *proving possession of the private key*, not merely showing the certificate. **Incident B is a full-blown breach.** The private key *is* the identity: the attacker can mint tokens that verify perfectly everywhere, indistinguishable from real ones, until the key is rotated and old tokens are rejected. Same file format, opposite worlds — the public/private asymmetry is the entire difference.

## Key Takeaways

| Concept | What It Means |
| :--- | :--- |
| **The key-distribution problem** | Symmetric crypto can't bootstrap between strangers; the first key has no safe channel |
| **One-way functions** | Easy forward, intractable backward (factoring, discrete log); the foundation of everything here |
| **Key pair** | Public key: share with adversaries freely. Private key: the entire secret |
| **Diffie-Hellman** | Two parties build a shared secret in full public view; eavesdroppers are stuck on the one-way direction |
| **Forward secrecy** | Ephemeral exchanges mean stolen long-term keys can't decrypt recorded traffic |
| **Signatures** | Private key produces, public key verifies: authenticity + integrity in one check |
| **Certificates** | A CA's signature binding a name to a public key; nothing more, nothing less |
| **Hybrid systems** | Asymmetric to authenticate and exchange keys; symmetric for the actual data |

The next time a TLS handshake scrolls past in `curl -v`, you'll know what's inside it: a signature check proving the server's identity, an ephemeral key exchange conjuring a shared secret in public, and a handoff to symmetric encryption for the real work. The math earned its reputation; the *ideas* never deserved theirs.

## What's Next

You have the three ideas — one-way functions, key exchange, signatures. **[TLS Basics: How HTTPS Actually Works](https://networking.bradpenney.io/essentials/tls/tls_basics/)** is where they stop being theory and become the handshake that puts a padlock in the browser.

---

## Further Reading

### Related Articles on This Site

- **[Authentication vs Authorization in APIs](../web/authentication_vs_authorization.md)** — the identity layer that rides *inside* the channels this article secures.

### On the Networking Site

- **[TLS Basics: Certificates, Handshakes, and the Chain of Trust](https://networking.bradpenney.io/essentials/tls/tls_basics/)** — this theory, operating in production: the handshake and chain verification.
- **[HTTPS for APIs: Where the Connection Gets Secured](https://networking.bradpenney.io/essentials/tls/https_for_apis/)** — where encryption terminates, and mTLS: certificates in both directions.

### External Resources

- [Crypto 101](https://www.crypto101.io/) — a free, engineer-friendly book covering everything here with the rigor turned up.
- [Cloudflare: A relatively easy to understand primer on elliptic curve cryptography](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/) — where the field went after modular arithmetic.
- [Diffie & Hellman, *New Directions in Cryptography* (1976)](https://ee.stanford.edu/~hellman/publications/24.pdf) — the paper that ended the couriers-with-briefcases era; the introduction is genuinely readable.
