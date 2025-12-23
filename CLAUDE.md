# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Repository Overview

This is a Material for MkDocs site documenting Computer Science concepts learned during the CS degree program. The site serves as a teaching tool, portfolio, and personal reference.

## Important Preferences

**Git Operations**: The user handles all git operations (commits, pushes, etc.) themselves. Do not commit or push changes.

**MkDocs Operations**: The user handles running `mkdocs serve` and `mkdocs build` themselves. Do not run these commands.

## Project Structure

- `docs/` - Markdown content organized by category (matches site navigation)
  - `building_blocks/` - Core CS theory and concepts (published)
  - `data_structures/` - Data structures and ADTs
  - `algorithms_complexity/` - Algorithms and complexity theory
  - `programming_languages/` - Programming paradigms and languages
  - `systems_architecture/` - OS, networking, virtualization
  - `data_security/` - Databases, security, cryptography
  - `modern_topics/` - AI, graphics, ethics
  - `deep_dives/` - Advanced theoretical topics
- `mkdocs.yaml` - Site configuration and navigation
- `pyproject.toml` - Poetry dependencies

**Important:** Directory structure mirrors site navigation. Articles reference each other using relative paths (e.g., `../building_blocks/filename.md`).

## Course Materials & References

**Current Course: COMP200** (This will change when moving to the next course)

**COMP200 Source Materials Location:**
- `/home/brad/notes/slip-box/01_source_material/athabasca/comp200/`
- Contains all course unit PDFs, readings, and assignments
- `comp200.md` file has course overview and unit breakdowns

**Key Reference Books:**
- **Introduction to Computing** by David Evans (COMP200 textbook)
  - Location: `/home/brad/notes/slip-box/01_source_material/books/introduction_to_computing_david_evans.pdf`
  - Used throughout COMP200 (Units 1-4)

**COMP200 Unit Mapping:**
- Unit 1: Computational Thinking (Chapters 1-5)
- Unit 2: Algorithms & Problem-Solving (Chapters 6-8)
- Unit 3: Languages & Programming (Chapters 10-11)
- Unit 4: Virtual Machines & Applications (Reading 3, Sections 1-8)

## Common Commands

```bash
# Install dependencies
poetry install

# Serve locally (http://localhost:8000)
poetry run mkdocs serve

# Build static site (ALWAYS use --strict for link validation)
poetry run mkdocs build --strict

# Validate all internal and external links
# The htmlproofer plugin is configured to:
# - Validate all internal links (raise_error: true)
# - Skip external URL validation (validate_external_urls: false)
# - Treat warnings as errors (--strict flag)
```

**Link Validation:** The project uses `mkdocs-htmlproofer-plugin` to validate all internal links. Always build with `--strict` flag to catch broken links.

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
- Use mermaid diagrams for visual concepts. **Follow the project's 'Slate' color scheme for consistency:**
  - **Standard Node (Slate 800):** `fill:#2d3748,stroke:#cbd5e0,stroke-width:2px,color:#fff`
  - **Highlighted Node (Slate 700):** `fill:#4a5568,stroke:#cbd5e0,stroke-width:2px,color:#fff`
  - **Darker Node (Slate 900):** `fill:#1a202c,stroke:#cbd5e0,stroke-width:2px,color:#fff`
  - **Accent Node (Green):** `fill:#48bb78,stroke:#cbd5e0,stroke-width:2px,color:#fff`
  - *Always explicitly style nodes using these hex codes to ensure readability in the dark theme.*
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

### Multi-Language Code Examples

**CRITICAL REQUIREMENT:** All code examples in published articles MUST be provided in tabs with implementations in the following languages (in this order):

1. **:material-language-python: Python** - Always first (most accessible)
2. **:material-language-javascript: JavaScript** - Second (web developers)
3. **:material-language-go: Go** - Third (modern systems programming)
4. **:material-language-rust: Rust** - Fourth (safety-focused systems programming)
5. **:material-language-java: Java** - Fifth (enterprise/academic standard)
6. **:material-language-cpp: C++** - Sixth (performance-critical applications)

**When to Provide Multi-Language Examples:**

- ✅ **DO** provide multi-language tabs for:
  - Algorithm implementations (lexers, parsers, sorting, searching, etc.)
  - Data structure implementations (trees, stacks, queues, etc.)
  - Complete working code examples (functions, classes, programs)
  - Language-specific feature demonstrations (regex flags, pattern matching, etc.)

- ❌ **DO NOT** provide multi-language tabs for:
  - Pseudocode examples (these are language-agnostic by design)
  - Language-specific features that only exist in one language (e.g., Scheme S-expressions)
  - Mathematical notation or formal definitions
  - Command-line examples or shell commands
  - Conceptual diagrams or ASCII art

**Tab Format for Multi-Language Examples:**

```markdown
=== ":material-language-python: Python"

    ```python title="Descriptive Title" linenums="1"
    # Python implementation
    def example():
        pass
    ```

=== ":material-language-javascript: JavaScript"

    ```javascript title="Descriptive Title" linenums="1"
    // JavaScript implementation
    function example() {
        // ...
    }
    ```

=== ":material-language-go: Go"

    ```go title="Descriptive Title" linenums="1"
    // Go implementation
    func example() {
        // ...
    }
    ```

=== ":material-language-rust: Rust"

    ```rust title="Descriptive Title" linenums="1"
    // Rust implementation
    fn example() {
        // ...
    }
    ```

=== ":material-language-java: Java"

    ```java title="Descriptive Title" linenums="1"
    // Java implementation
    public class Example {
        public void example() {
            // ...
        }
    }
    ```

=== ":material-language-cpp: C++"

    ```cpp title="Descriptive Title" linenums="1"
    // C++ implementation
    void example() {
        // ...
    }
    ```
```

**Quality Standards:**

- Each language implementation must be **functionally equivalent** to the others
- Code must be **idiomatic** for that language (use language-specific conventions)
- Include necessary imports/includes at the top of each example
- Add comments to explain language-specific idioms when helpful
- Test that implementations would actually compile/run (conceptually)
- **Draft articles** do not require multi-language examples yet; add them during review/publication

**Examples of Proper Multi-Language Implementation:**

- Regex flag syntax (completed) - Shows language-specific API differences
- Lexer implementation (completed) - Full working code in all 6 languages
- Parser implementation (in progress) - Complex algorithm with proper error handling

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
