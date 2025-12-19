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

### Interactive Elements: Tabs and Cards

Material for MkDocs supports tabs and cards for organizing content interactively. Use these to enhance engagement and readability.

**When to Use Cards:**

Use `<div class="grid cards">` for **brief, scannable content** (3-6 items):
- Comparing similar concepts or categories
- Overview of subfields or components
- Short definitions or descriptions
- Independent items that don't require detailed explanation

**Cards work best when:**
- Each item is 2-4 lines of text
- Content is self-contained and doesn't need expansion
- Reader should see all options at a glance

**Card Format:**
```markdown
<div class="grid cards" markdown>

-   :material-icon-name: __Card Title__

    ---

    **Item 1** — Brief description

    **Item 2** — Brief description

    **Item 3** — Brief description

</div>
```

**Important formatting rules:**
- Use em-dashes (`—`) not tables inside cards
- Add blank lines between each item for proper rendering
- Keep content concise (cards look cluttered with long text)

**When to Use Tabs:**

Use `=== "Tab Name"` syntax for **detailed, related content**:
- Code examples in different languages
- Step-by-step procedures or strategies
- Domain-specific examples (real-world parsing scenarios)
- Comparing/contrasting approaches with detailed explanations
- Content with code blocks, warnings, or nested admonitions

**Tabs work best when:**
- Each tab contains 1-2 paragraphs or code blocks
- Content is related but distinct (different approaches, examples, scenarios)
- Reader should explore options individually

**Tab Format:**
```markdown
=== ":material-icon-name: Tab Title"

    Content here with 4-space indentation.

    **All content** must be indented to stay within the tab.

    ```python title="Code Example" linenums="1"
    # Code must also be indented
    def example():
        pass
    ```

=== ":material-icon-name: Another Tab"

    Second tab content, also indented.
```

**Critical tab formatting rules:**
- Tab declarations (`===`) start at column 0
- ALL content inside tabs must be indented with 4 spaces
- Code blocks need indentation: ` ```language` line AND all code content
- Blank line between tabs (but not required)
- Admonitions inside tabs need 8-space indentation for their content

**Choosing Between Tabs and Cards:**

| Use Case | Tabs or Cards? | Why? |
|:---------|:---------------|:-----|
| Major CS subfields overview | Cards | Brief, scannable, independent |
| Historical timeline | Tabs | Chronological, detailed context |
| Parsing strategies comparison | Tabs | Detailed code, warnings, explanations |
| Real-world examples | Tabs | Code blocks, domain-specific context |
| Practical regex examples | Tabs | Tables, warnings, detailed breakdowns |
| "Why [concept] matters" | Tabs | Multiple detailed scenarios |

**Examples from the site:**
- Cards: What is CS - Major Subfields (6 brief areas)
- Tabs: What is CS - Brief History (5 chronological eras)
- Tabs: FSM - Real-World Examples (traffic lights, games, TCP, lexing)
- Tabs: Regex - Practical Examples (email, phone, IP, log parsing)
- Tabs: RTN - Expression Hierarchy (Expression, Term, Factor)
- Tabs: Parsers - Parsing Strategies (Top-Down, Bottom-Up)
- Tabs: Parsers - Real-World Parsing (JSON, HTML, Programming Languages)
