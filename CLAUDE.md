# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Repository Overview

**Exploring Computer Science** teaches CS theory to working engineers. It transforms raw lecture notes from university CS coursework into structured, teaching-focused articles that bridge the gap between practical engineering experience and formal computer science theory.

**Target Audience:** Back-end engineers, platform engineers, and software developers who write production code daily but lack formal CS training. They know HOW to code—these articles teach them WHY things work the way they do.

**Teaching Philosophy:** Every article starts with real-world engineering experience (debugging, code review, production issues) before introducing CS theory. Theory is connected to tools they use daily (Python dicts, JSON parsing, stack traces, database queries, etc.).

The site serves as a teaching tool, portfolio, and personal reference for engineers filling CS knowledge gaps.

## Critical Persona Insight

**IMPORTANT**: This site has a unique audience assumption that sets it apart from typical CS educational content:

### The Persona: Working Engineer Learning CS Theory

**Who they are:**
- Back-end engineer / platform engineer / software developer
- Writes production code daily (Python, Go, Java, JavaScript, etc.)
- Has real-world experience shipping features and debugging production issues
- **Lacks formal CS training** and wants to fill that gap
- May be self-taught, bootcamp graduate, or career changer
- Taking university CS coursework while working full-time

**What they already know:**
- How to write code and ship features
- Git, testing, deployment, CI/CD, production concerns
- Frameworks, libraries, and tools of their trade
- How to debug issues and read stack traces
- Code patterns and best practices from experience

**What they want to learn:**
- The CS theory behind the tools they use daily
- Why some algorithms are faster than others
- Theoretical limits of computation (halting problem, complexity classes)
- How compilers, interpreters, and parsers actually work
- The math and formal definitions underlying their work
- How to answer theory questions in technical interviews

**What they DON'T need:**
- "Hello World" tutorials
- Basic programming concepts (they already code)
- Overly academic explanations disconnected from practice
- Theory without practical relevance

**Teaching approach:**
- **Ground theory in practice**: Connect every CS concept to real-world engineering problems
- **Start with their experience**: Open with a scenario they've encountered, THEN introduce the theory
- **Bridge the gap**: They know HOW things work practically—teach them WHY theoretically
- **Provide context**: Show where they've already used this concept without knowing the formal theory
- **Make it relevant**: Explain why understanding this theory makes them better engineers

### Article Opening Patterns

Every article should follow this pattern:

**❌ Don't start with abstract theory:**
```markdown
# Recursion

Recursion is when a function calls itself...
```

**✅ Start with their experience, then theory:**
```markdown
# Recursion: The Art of Self-Reference

You've written recursive functions in Python. You know they work. But when your colleague asked "Why recursion instead of a loop here?" you couldn't quite articulate it beyond "it felt cleaner."

**This is the theory you were missing.**

Recursion isn't just a coding trick—it's a fundamental computational pattern that's been around since before programming languages existed. Understanding the CS theory behind it will make you better at recognizing when to use it (and when not to).
```

### Required Sections for Persona

1. **Opening with real-world context** - Start with a scenario they've experienced
2. **"Where You've Seen This"** section - Connect theory to their daily work:
   - Stacks → "Every exception stacktrace you've debugged"
   - Trees → "Your JSON responses, your file system, your DOM"
   - Graphs → "Your database relationships, your microservices architecture"
3. **"Why This Matters for Production Code"** - Practical implications:
   - Big-O → "Why your O(n²) query times out at scale"
   - Space Complexity → "Why your recursive solution causes stack overflows"
   - Halting Problem → "Why linters can't catch every bug"
4. **"Technical Interview Context"** (when relevant) - What questions this helps answer
5. **Formal CS theory** - The mathematical definitions and rigorous explanations
6. **Real-world examples in their languages** - Python, JavaScript, Go especially

### Examples of Persona-Driven Connections

**Data Structures:**
- **Stacks**: "Every time you see a stacktrace, you're seeing this data structure. Here's the theory..."
- **Trees**: "Your JSON is a tree. Your file system is a tree. The DOM is a tree. Here's what CS says about trees..."
- **Graphs**: "Your microservices architecture? That's a directed graph. Database foreign keys? Graph edges. Here's the theory..."
- **Hash Tables**: "Python's `dict`, JavaScript's `Object`, Go's `map`—all hash tables. Here's how they actually work..."

**Algorithms:**
- **Big-O Notation**: "Your PR got rejected because the reviewer said it's O(n²). Here's how to analyze that formally..."
- **Sorting**: "You call `.sort()` without thinking. Here's what's happening underneath and why it matters..."
- **Search**: "Binary search is why database indexes are fast. Here's the CS behind it..."

**Language Theory:**
- **Parsing**: "You work with JSON, YAML, XML, and config files daily. Here's how parsers actually work..."
- **Regular Expressions**: "You've used regex for validation. Here's the formal language theory behind it..."
- **Compilers vs Interpreters**: "Python is 'interpreted,' Go is 'compiled'—what does that actually mean?"

**Systems:**
- **Operating Systems**: "Every time you spawn a process or thread, this is what's happening..."
- **Virtual Machines**: "Docker containers, JVM, Python's interpreter—all virtual machines. Here's the theory..."
- **Networking**: "REST APIs, WebSockets, gRPC—here's the networking fundamentals underneath..."

### The Transformation

This site is NOT:
- ❌ "Here's what I learned in CS class"
- ❌ A traditional textbook for CS students
- ❌ Beginner programming tutorials

This site IS:
- ✅ "Here's the CS theory behind the production code you write"
- ✅ A working engineer's guide to filling CS knowledge gaps
- ✅ Theory with practical relevance and real-world connections

## Important Preferences

**Git Operations**: The user handles all git operations (commits, pushes, etc.) themselves. Do not commit or push changes.

**MkDocs Operations**: The user handles running `mkdocs serve` and `mkdocs build` themselves. Do not run these commands.

## SEO Strategy and Publication Process

**CRITICAL**: This site uses a draft/publish workflow to ensure only vetted content appears in search engines and the sitemap.

### SEO Configuration Overview

The site has comprehensive SEO optimization:

1. **Sitemap**: Auto-generated by MkDocs at `/sitemap.xml` when `site_url` is configured
2. **robots.txt**: Located at `docs/robots.txt`, points to sitemap
3. **Meta plugin**: Injects canonical URLs to prevent duplicate content
4. **Social cards**: Open Graph images auto-generated for social media sharing
5. **Google Analytics**: Configured with tracking ID
6. **Exclude plugin**: Prevents unpublished content from appearing in builds and sitemap

### Required Metadata for Every Article

**MANDATORY**: Every article MUST have frontmatter metadata before being published:

```yaml
---
title: Clear, Descriptive Title (50-60 chars ideal)
description: Compelling description for search results (150-160 chars ideal)
---
```

**Rules:**

- **Title**: Should be unique across the site, descriptive, include key terms
- **Description**: Summarize what the reader will learn, compelling call-to-action
- **No keywords needed**: Modern search engines don't rely on keyword meta tags
- **Check length**: Titles >60 chars and descriptions >160 chars get truncated in search results

### The Exclude Plugin Strategy

**Problem**: MkDocs by default includes ALL `.md` files in builds and sitemaps, even draft/unpublished content.

**Solution**: The `mkdocs-exclude` plugin configured in `mkdocs.yaml` excludes unpublished directories from:
- Site builds
- Sitemap generation
- Search indexing
- Navigation (even if accidentally uncommented)

**Current exclude configuration** (as of 2026-02-16):

```yaml
plugins:
  - search
  - meta
  - exclude:
      glob:
        - "level_1/*"
        - "level_2/*"
        - "level_3/*"
        - "level_4/*"
        - "level_5/*"
        - "level_6/*"
  # ... other plugins
```

**What this means:**
- Draft articles can exist in these directories without appearing in search results
- Articles can be worked on incrementally without affecting SEO
- Only vetted, published content appears in sitemap and builds

### How to Publish an Article

When an article is ready for publication (passes all quality checks), follow these steps **in order**:

#### 1. Pre-Publication Checklist

Complete the [Quality Standards Checklist](#quality-standards-checklist) below. Do NOT proceed until all items are checked.

#### 2. Remove from Exclude List

Edit `mkdocs.yaml` and remove the directory from the exclude plugin:

**Before (draft):**
```yaml
- exclude:
    glob:
      - "level_1/*"  # Article is excluded
      - "level_2/*"
```

**After (published):**
```yaml
- exclude:
    glob:
      # - "level_1/*"  # REMOVED - now published
      - "level_2/*"
```

**IMPORTANT**:
- Remove the ENTIRE line, don't just comment it
- If publishing individual files (not whole directories), use specific paths:
  ```yaml
  - "level_1/overview.md"  # Still draft
  - "level_1/pods.md"      # Still draft
  # level_1/services.md is published (not in exclude list)
  ```

#### 3. Add to Navigation

Uncomment the article in the `nav:` section of `mkdocs.yaml`:

**Before:**
```yaml
# - Level 1 - Core Primitives:
#     - Overview: level_1/overview.md
#     - Pods Deep Dive: level_1/pods.md
```

**After:**
```yaml
- Level 1 - Core Primitives:
    - Overview: level_1/overview.md
    - Pods Deep Dive: level_1/pods.md
    # - Services: level_1/services.md  # Still in draft
```

#### 4. Verify Publication

Run these commands to verify:

```bash
# Build the site
poetry run mkdocs build --strict

# Check sitemap includes the new article
grep -o '<loc>[^<]*</loc>' site/sitemap.xml | grep level_1

# Verify the article appears in search index
grep -i "pods deep dive" site/search/search_index.json
```

**Expected results:**
- Sitemap includes the new article URL
- Search index contains the article
- No build errors from htmlproofer
- All internal links work

#### 5. Update CLAUDE.md Exclude List

Update the "Current exclude configuration" section above to reflect what's NOW excluded (for future reference).

### SEO Checklist for Published Articles

Before removing an article from the exclude list, verify:

- [ ] **Frontmatter metadata present** - Title and description in YAML frontmatter
- [ ] **Title is unique** - Not duplicated across other published articles
- [ ] **Description is compelling** - 150-160 chars, summarizes value
- [ ] **All images have alt text** - Check with `grep -r '!\[' article.md`
- [ ] **All links work** - Internal links point to published articles only
- [ ] **No "coming soon" dead links** - Replace with plain text or link to overview
- [ ] **External links are valid** - Use WebFetch to verify important URLs
- [ ] **Headings are hierarchical** - One H1, logical H2-H6 structure
- [ ] **No duplicate content** - Cross-link instead of repeating other articles

### Common SEO Mistakes to Avoid

1. **Linking to unpublished articles** - Always check if target article is in exclude list before linking
2. **Forgetting to update exclude list** - When publishing, remove from exclude glob
3. **Missing metadata** - Every article needs title and description
4. **Publishing incomplete articles** - Follow full quality checklist before publishing
5. **Leaving articles in navigation but excluded** - Navigation and exclude list must align

### SEO Monitoring

After publication, verify search engine indexing:

1. **Check Google Search Console** - Verify pages are indexed
2. **Monitor sitemap errors** - Search Console reports sitemap issues
3. **Verify canonical URLs** - Use browser dev tools to check `<link rel="canonical">`
4. **Test social cards** - Share on social media to verify Open Graph images

## CRITICAL: No Repetition - Respect Reader's Time

**This is an absolute deal-breaker for content quality.**

### The Principle

Avoid duplication and repetition at all costs. Every time we repeat information, we waste the reader's time and make the content feel bloated.

### The Rules

1. **Cross-link instead of repeating** - If a concept is explained elsewhere, link to it
2. **Only repeat for significantly different perspectives** - Brief intro vs. deep dive is acceptable; same explanation twice is not
3. **Progressive depth, not repetition** - Each article builds WITHOUT re-explaining previous articles
4. **Audit before publishing** - Search for repeated concepts across published articles

### Before Explaining Any Concept, Ask:

1. Have we explained this elsewhere in this section?
2. If yes, is my perspective SIGNIFICANTLY different?
3. If no, add a cross-link: "Remember X from [Article]? Now let's see how..."
4. If yes, explicitly state the new angle: "Earlier we covered X practically - now let's understand the theory"

### Required: Pre-Publication Repetition Audit

Before marking any article complete, use the Explore agent to search for repeated concepts across published articles in the same section. If found, consolidate and cross-link.

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

Articles must balance **playfulness with professionalism** and be **technically accurate** while remaining **accessible**. The goal: bridge the gap between practical engineering experience and formal CS theory.

**Core Principles (Persona-Driven):**

- **Start with their experience**: Open with a scenario they've encountered in production code, THEN introduce theory
- **Connect theory to practice**: Every concept must link to real-world engineering (databases, APIs, debugging, frameworks)
- **Professional yet engaging**: Use wit in parentheticals and asides, not emoji spam (limit to 1-3 per article, used strategically)
- **Technical rigor with relevance**: Include formal definitions (5-tuples, mathematical notation), but explain WHY they matter for production code
- **Structured learning**: Build from familiar concepts (their code) to formal theory; use clear section headers
- **Thoughtful closings**: Tie concepts to their work as engineers; avoid jokey endings
- **Direct voice**: Address reader as "you"—a working engineer; be confident but not arrogant; educational but not preachy
- **Make it useful**: Every article should make them better at their job or technical interviews

**Required Sections (Updated for Persona):**

1. **Opening paragraph(s)** - Start with their engineering experience (debugging, code review, production issue), THEN introduce theory
2. **"Where You've Seen This"** - Connect to tools/code they use daily (Python dicts, JSON parsing, stack traces, etc.)
3. **Formal definition** (if applicable) - Table format for mathematical notation with practical examples
4. **Simple examples building to complex** - Use languages they know (Python, JavaScript, Go)
5. **"Why This Matters for Production Code"** - Practical implications (performance, debugging, design decisions)
6. **Historical context** - Who invented it, when, why (when relevant and interesting)
7. **"Technical Interview Context"** (when relevant) - What questions this helps answer
8. **Practice Problems with full solutions** (use `??? question` and `??? tip`)
9. **"Key Takeaways"** table - What they should remember for their work
10. **"Further Reading"** section with links
11. **Closing paragraph(s)** - How understanding this theory makes them better engineers

**Examples of Good Tone (Persona-Driven):**
- "You've written recursive functions in Python. You know they work. But when your colleague asked 'Why recursion instead of a loop here?' you couldn't quite articulate it..." (starts with their experience)
- "Every time you see a stacktrace, you're seeing this data structure in action." (connects theory to their daily work)
- "Your PR got rejected because the reviewer said it's O(n²). Here's how to analyze that formally..." (practical motivation)
- "That's not hyperbole—it's history." (confident assertion)
- "(Pack a lunch.)" (playful aside in parenthetical)
- "This is why your recursive solution caused a stack overflow in production." (real consequence, not abstract)

**Avoid:**
- Excessive emojis (🍝✨🎮😄 scattered everywhere)
- Over-the-top phrases like "amazing!", "incredible!", "mind-blowing!"
- Starting with abstract theory before establishing relevance
- Writing for CS students instead of working engineers
- Explaining basic programming concepts they already know
- Theory without practical connections to production code
- Condescending language or talking down to readers
- Jokey closings that undermine the technical content

### Content Structure

**Technical Terms and Commands in Prose:**

ALWAYS wrap technical terms, command names, and function names in backticks when mentioned in regular text:

- ✅ Correct: "Use `grep` to search files"
- ✅ Correct: "The `malloc()`, `free()`, and `realloc()` functions"
- ✅ Correct: "Algorithm names like `quicksort` and `mergesort`"
- ❌ Wrong: "Use grep to search files"
- ❌ Wrong: "The malloc(), free(), and realloc() functions"

**Common items to wrap:** Unix commands (`ls`, `grep`, `find`), programming functions, algorithm names, data structure operations (`push`, `pop`, `enqueue`), system calls, technical terms when used as code references

**Exceptions:**
- Code inside code blocks (already formatted)
- Terms in mermaid diagrams
- Casual use of technical terms in normal prose (e.g., "sorting algorithms" vs "`quicksort`" specifically)

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

## Quality Standards Checklist

Before publishing an article:

**✅ Content Quality:**

- [ ] Opening hooks with real-world engineering experience (persona-driven)
- [ ] "Where You've Seen This" section connecting theory to daily work
- [ ] "Why This Matters for Production Code" section
- [ ] "Technical Interview Context" (when relevant)
- [ ] Clear learning objectives
- [ ] Code examples in multiple languages (Python, JavaScript, Go, Java)
- [ ] Practice exercises with nested solutions
- [ ] Key takeaways or quick recap
- [ ] Further Reading organized into categories

**✅ Formatting:**

- [ ] All code blocks have `title=` attribute
- [ ] **CRITICAL: Blank lines before ALL lists** (recurring issue - check every list in article)
- [ ] Code tabs properly indented (4 spaces for content, more for nested elements)
- [ ] Admonitions used appropriately
- [ ] Mermaid diagrams follow site color scheme
- [ ] Internal links use relative paths
- [ ] **External links validated with WebFetch before publishing** (URLs break over time)

**✅ Integration and Links:**

- [ ] Pre-publication link audit completed
- [ ] **NEVER link to unpublished articles** - only link to articles uncommented in mkdocs.yaml
- [ ] Cross-links to related articles
- [ ] Navigation uncommented in `mkdocs.yaml`
- [ ] No broken links

**✅ Persona Alignment:**

- [ ] Article starts with engineering experience, not abstract theory
- [ ] Connects CS theory to tools reader uses daily
- [ ] Appropriate for working engineer, not CS student
- [ ] Answers "why does this make me a better engineer?"
