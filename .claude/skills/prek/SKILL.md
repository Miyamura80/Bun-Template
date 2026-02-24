---
name: prek
description: Instructions for managing git hooks using prek.
---
# Prek Skill

This skill provides instructions for managing git hooks using `prek`.

## Commands

- `prek run`: Run hooks on changed files.
- `prek run --all-files`: Run hooks on all files.
- `prek install`: Install git hooks.
- `prek run <hook_id>`: Run a specific hook.

## Configuration

Configuration is stored in `prek.toml`.

## Workflow

1. **Before Committing**: `prek` hooks run automatically on commit.
2. **Manual Check**: Run `prek run` to check changes manually.
