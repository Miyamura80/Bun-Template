# Bun-Template

<p align="center">
<b>Opinionated Bun/TypeScript project stack. 🚀 Batteries included. </b>
</p>

<p align="center">
<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#credits">Credits</a>
</p>

</p>

--- 

## Key Features

Opinionated Bun stack for fast development.

| Feature | `main` |
|---------|:------:|
| Bun + TypeScript | ✅ |
| CI/Linters (ESLint, Prettier) | ✅ |
| Pre-commit hooks | ✅ |
| Ralph Wiggum Agent Loop | ✅ |

## Quick Start

- `make init name=my-project description="My project description"` - initialize project
- `make all` - runs `src/index.ts`
- `make fmt` - runs `prettier` + JSON formatting
- `make test` - runs all tests
- `make ci` - runs all CI checks (lint, types, tests)

## Credits

This software uses the following tools:
- [Bun: A fast all-in-one JavaScript runtime](https://bun.sh)
- [TypeScript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
