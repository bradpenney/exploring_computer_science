# Exploring Computer Science

**The CS theory behind the production code you write.**

A Material for MkDocs site that bridges the gap between practical engineering experience and formal Computer Science theory. This site serves as a teaching tool, portfolio, and personal reference for engineers filling CS knowledge gaps.

🌐 **Live Site:** [cs.bradpenney.io](https://cs.bradpenney.io)

---

## Who This Is For

**The Working Engineer**

This site is designed for back-end engineers, platform engineers, and software developers who:
- Write production code daily (Python, Go, Java, etc.)
- Have real-world experience shipping features and debugging issues
- **Lack formal CS training** or want to refresh their theoretical foundations
- Want to understand the *why* behind the tools they use

**What This Is NOT:**
- A traditional CS textbook
- "Hello World" programming tutorials
- Academic theory disconnected from practice

---

## Philosophy

**Ground Theory in Practice**

Every article starts with real-world engineering experience—debugging a stack trace, optimizing a database query, or designing an API—before introducing the underlying CS theory.

1.  **Start with Experience**: We open with scenarios you've encountered in production.
2.  **Bridge the Gap**: You know *how* it works practically; we teach *why* it works theoretically.
3.  **Make it Relevant**: We explain why understanding the theory makes you a better engineer.

---

## Site Structure

The content is organized into three progressive tiers:

- **📦 Essentials**: Core concepts that underpin every line of code (Big-O, Data Structures, Recursion).
- **⚡ Efficiency**: Algorithms, complexity analysis, and system performance.
- **🎯 Mastery**: Advanced topics, formal languages, compilation, and modern computing frontiers.

---

## Current Status: Under Development

This site is currently under active development. Articles are being written, reviewed, and published incrementally.

**Process:**
- Content is drafted in private branches.
- Articles undergo a rigorous quality review against the standards in `CLAUDE.md`.
- Only vetted, high-quality content appears in the navigation.

---

## Tech Stack

- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)**: Documentation framework
- **Python 3.11+**: Runtime environment
- **Poetry**: Dependency management
- **Mermaid**: Diagrams and visualizations

---

## Local Development

### Prerequisites

- Python 3.11+
- [Poetry](https://python-poetry.org/)

### Setup

```bash
# Install dependencies
poetry install

# Serve locally (http://localhost:8000)
poetry run mkdocs serve

# Build static site
poetry run mkdocs build --strict
```

---

## Contributing

See `CLAUDE.md` for comprehensive writing guidelines, including:
- Persona details and tone
- Multi-language code example requirements
- SEO and publication checklist
- Quality standards

---

## Author

**Brad Penney** - [bradpenney.io](https://bradpenney.io)