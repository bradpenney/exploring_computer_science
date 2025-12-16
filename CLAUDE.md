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

### Tone and Style

Articles must balance **playfulness with professionalism** and be **technically accurate** while remaining **accessible**. The goal: meaningful for beginners, yet useful for intermediate computer scientists.

**Core Principles:**

- **Strong openings**: Ground in real-world scenarios that readers experience (compilers, grammar checkers, everyday systems)
- **Professional yet engaging**: Use wit in parentheticals and asides, not emoji spam (limit to 1-3 per article, used strategically)
- **Technical rigor**: Include formal definitions (5-tuples, mathematical notation), historical context (who invented it, when, why), and precise terminology
- **Structured learning**: Build from simple to complex examples; use clear section headers
- **Thoughtful closings**: Tie concepts to broader CS themes; avoid jokey endings
- **Direct voice**: Address reader as "you"; be confident but not arrogant; educational but not preachy

**Required Sections:**

1. Opening paragraph(s) - hook with real-world relevance
2. Formal definition (if applicable) - table format for mathematical notation
3. Simple examples building to complex
4. Historical context - who, when, why (when relevant)
5. "Why [Topic] Matters" section
6. Practice Problems with full solutions (use `??? question` and `??? tip`)
7. "Key Takeaways" table
8. "Further Reading" section with links
9. Closing paragraph(s) - thoughtful reflection on broader significance

**Examples of Good Tone:**
- "That's not hyperbole—it's history." (confident assertion)
- "(Pack a lunch.)" (playful aside in parenthetical)
- "This compact representation says 'one or more digits'—a pattern that would require infinitely many states if we tried to enumerate every possible number explicitly." (precise yet accessible)

**Avoid:**
- Excessive emojis (🍝✨🎮😄 scattered everywhere)
- Over-the-top phrases like "amazing!", "incredible!", "mind-blowing!"
- Condescending language or talking down to readers
- Jokey closings that undermine the technical content
- Creating files unless absolutely necessary

### Content Structure

- Articles should be teaching-focused, not just notes
- Use mermaid diagrams for visual concepts (already configured)
- Include practice problems with expandable solutions (`??? question`)
- Cross-link related articles using markdown links
- Use admonitions for tips and callouts:
  - Prefer `??? tip` (collapsible tips) for helpful insights
  - **Avoid** `??? note` or `!!! note` (the "note" style doesn't render well in Material for MkDocs)
- **Code examples must include titles, line numbers, and annotations**:
  - Format: ` ```language title="Descriptive Title" linenums="1" `
  - Example: ` ```python title="Recursive Descent Parser" linenums="1" `
  - The title should describe what the code demonstrates
  - Material for MkDocs provides copy button automatically
  - **Add code annotations** to explain key concepts:
    - Use `# (1)!`, `# (2)!`, etc. for inline annotations
    - After the code block, provide numbered explanations
    - Annotate important lines that explain algorithms, data structures, or non-obvious logic
    - Example:
      ```python
      def tokenize(text):
          tokens = []
          pos = 0  # (1)!
          while pos < len(text):  # (2)!
              # ... processing logic
          return tokens
      ```

      1. Track current position in the input string
      2. Process each character until we reach the end
- **Markdown list formatting**: Always add a blank line before lists that follow text/bold headers
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
