# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Repository Overview

This is a Material for MkDocs site documenting Computer Science concepts learned during the CS degree program (starting with COMP200). The site serves as a teaching tool, portfolio, and personal reference.

## Important Preferences

**Git Operations**: The user handles all git operations (commits, pushes, etc.) themselves. Do not commit or push changes.

## Project Structure

- `docs/` - Markdown content organized by section
  - `fundamentals/` - Core CS concepts (complete)
  - `algorithms/` - Algorithm theory (planned)
  - `programming/` - Programming concepts (planned)
  - `systems/` - Systems architecture (planned)
  - `modern/` - Modern CS topics (planned)
- `mkdocs.yaml` - Site configuration and navigation
- `pyproject.toml` - Poetry dependencies

## Common Commands

```bash
# Install dependencies
poetry install

# Serve locally (http://localhost:8000)
poetry run mkdocs serve

# Build static site
poetry run mkdocs build
```

## Content Guidelines

- Articles should be teaching-focused, not just notes
- Use mermaid diagrams for visual concepts (already configured)
- Include practice problems with expandable solutions (`??? question`)
- Cross-link related articles
- Use admonitions for tips, notes, warnings (`??? tip`, `!!! note`)
- Code examples should include titles and line numbers
