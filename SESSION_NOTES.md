# Session Notes - 2026-02-22

## What Was Accomplished

### 1. Site Restructure: Essentials / Efficiency / Mastery
Reorganized the entire site from academic categories to a practical value-based structure:

- **📦 Essentials** — "The CS you need for interviews and understanding performance"
- **⚡ Efficiency** — "CS that makes you better at debugging and system design"
- **🎯 Mastery** — "Deep theory for understanding the limits of computation"

### 2. Directory Structure Created
```
docs/
├── essentials/           # 9 articles (1 published, 8 drafts)
├── efficiency/           # 22 articles (all drafts)
│   ├── oop/
│   └── systems/
├── mastery/              # 17 articles (all drafts)
│   ├── formal_languages/
│   ├── computability/
│   ├── functional_programming/
│   ├── systems/
│   ├── security/
│   └── modern/
```

### 3. Old Directories Deleted
Removed: `building_blocks/`, `algorithms_complexity/`, `data_structures/`, `programming_languages/`, `systems_architecture/`, `data_security/`, `modern_topics/`, `deep_dives/`, `git/`

### 4. Published Content
- **index.md** — Rewritten with persona-driven homepage
- **essentials/big_o_notation.md** — NEW flagship article (fully written)

### 5. Persona Clarification
Target audience: **Working engineers learning CS theory** (back-end, platform, software devs who code daily but lack formal CS training)

Key insight confirmed: **Same topic can appear at different depths across tiers** (e.g., sorting basics in Essentials, specific sort algorithms in Efficiency, sorting theory in Mastery)

## What's Published vs Draft

### Published (in nav, not in exclude):
- `index.md`
- `essentials/big_o_notation.md`

### Draft (excluded, commented in nav):
Everything else — all existing articles need persona rewrites before publishing

## Technical Notes

### CSS Added
Table centering CSS added to `docs/stylesheets/extra.css` (copied from tools site)

### LaTeX
- MathJax already configured
- Use `$O(n^2)$` for inline math
- **Don't use LaTeX in headers** — breaks right-side nav
- Use Unicode superscripts in headers instead (O(n²))

### mkdocs-exclude Plugin
Added to dependencies. Exclude patterns in mkdocs.yaml use `**` glob for directories.

## Next Steps (Priority Order)

### Quick Wins — Republish Existing Articles
These articles exist and just need persona rewrites:

1. `essentials/what_is_computer_science.md` — Add engineering hooks, "Where You've Seen This"
2. `efficiency/finite_state_machines.md` — Already strong, minor updates
3. `efficiency/regular_expressions.md` — Already strong, minor updates
4. `efficiency/computational_thinking.md` — Needs persona rewrite

### New Articles to Write (Essentials)
- `essentials/arrays_and_lists.md`
- `essentials/hash_tables.md` — Connect to Python dicts, JS objects
- `essentials/recursion.md` — Rewrite existing draft with persona

### Persona Checklist for Each Article
- [ ] Opening hooks with real-world engineering experience
- [ ] "Where You've Seen This" section
- [ ] "Why This Matters for Production Code" section
- [ ] Multi-language code examples (Python, JS, Go, Rust, Java, C++)
- [ ] Practice problems with solutions
- [ ] Key takeaways table

## CLAUDE.md Updates Needed
The CLAUDE.md still references old directory structure and needs updating to reflect:
- New essentials/efficiency/mastery structure
- Updated exclude patterns
- Persona emphasis (already present but should be primary)
