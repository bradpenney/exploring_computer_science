# Exploring Computer Science

A Material for MkDocs site documenting Computer Science concepts learned during my CS degree program. This site serves as a teaching tool, portfolio, and personal reference.

## About

This project synthesizes knowledge from coursework into teaching-focused articles. Writing to teach reinforces learning and creates a public-facing record of my CS journey.

## Site Structure

- **Fundamentals** - Core CS concepts: computational thinking, finite state machines, parsers, BNF, regex
- **Algorithms** - Big-O notation, Turing machines, sorting, searching, recursion (planned)
- **Programming** - Paradigms, OOP, interpreters vs compilers (planned)
- **Systems** - Operating systems, networks, databases (planned)
- **Modern Topics** - AI, security, ethics in computing (planned)

## Tech Stack

- Python 3.11+
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- Poetry for dependency management
- Mermaid for diagrams

## Local Development

```bash
# Install dependencies
poetry install

# Serve locally at http://localhost:8000
poetry run mkdocs serve

# Build static site
poetry run mkdocs build
```

## Deployment

The site deploys to GitHub Pages at [cs.bradpenney.io](https://cs.bradpenney.io).

```bash
poetry run mkdocs gh-deploy
```

## Author

Brad Penney - [bradpenney.io](https://bradpenney.io)
