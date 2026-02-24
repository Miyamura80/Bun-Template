# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Opinionated Bun/TypeScript stack for fast development. Bun >= 1.0 required.

## Common Commands

```bash
# Setup & Run
make install_tools  # Install dependencies
make all            # Run src/index.ts
make init name=... description=... # Initialize project name and description

# Testing
make test           # Run tests

# Code Quality
make fmt            # Run prettier formatter
make lint           # Run eslint
make check_types    # Run typescript check
make ci             # Run all CI checks

# Dependencies
bun add <pkg>       # Add new dependency
bun add -d <pkg>    # Add dev dependency
bun run <script>    # Run script from package.json
```

## Architecture

- **src/** - Source code
- **tests/** - Tests using `bun:test`
- **docs/** - Documentation site (Next.js/React)

## Code Style

- camelCase for functions/variables
- PascalCase for classes/interfaces/types
- 2-space indentation (Prettier default)
- Use `const` over `let`, avoid `var`
- Use TypeScript types explicitly where helpful

## Commit Message Convention

Use emoji prefixes indicating change type and magnitude:

- 🏗️ initial implementation
- 🔨 feature changes
- 🐛 bugfix
- ✨ formatting/linting only
- ✅ feature complete with tests
- ⚙️ config changes

## Git Workflow

- **Protected Branch**: `main` is protected. Do not push directly to `main`. Use PRs.
- **Merge Strategy**: Squash and merge.

## Automated Translation (Jules Sync)

Docs under `docs/content/` are auto-translated by the **Jules Translation Sync**
workflow. Do NOT manually translate doc files - edit the English source and the
workflow will update all locales (`es`, `ja`, `zh`).
See [`docs/translation-guide.md`](docs/translation-guide.md) for the full
glossary, file naming conventions, and translation rules.
