# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Repository Overview

This is a Material for MkDocs site documenting Computer Science concepts learned during the CS degree program. The site serves as a teaching tool, portfolio, and personal reference.

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
- Embed YouTube videos at the bottom of articles in a "Video Summary" section using the responsive wrapper class:
  ```markdown
  ## Video Summary

  <div class="video-wrapper">
    <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Descriptive Title" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </div>
  ```
  Replace `VIDEO_ID` with the YouTube video ID (from `https://youtu.be/VIDEO_ID`) and provide a descriptive title.

  The `video-wrapper` class is defined in `docs/stylesheets/extra.css` and provides:
  - Full-width responsive embedding (100% width, max 800px)
  - Automatic 16:9 aspect ratio
  - Rounded corners and no border
  - Proper spacing above and below the video
