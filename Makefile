# ANSI color codes
GREEN=\033[0;32m
YELLOW=\033[0;33m
RED=\033[0;31m
BLUE=\033[0;34m
RESET=\033[0m

PROJECT_ROOT=.

.DEFAULT_GOAL := help

########################################################
# Help
########################################################

### Help
.PHONY: help
help: ## Show this help message
	@echo "$(BLUE)Available Make Targets$(RESET)"
	@echo ""
	@awk 'BEGIN {FS = ":.*?## "; category=""} \
		/^### / {category = substr($$0, 5); next} \
		/^[a-zA-Z_-]+:.*?## / { \
			if (category != last_category) { \
				if (last_category != "") print ""; \
				print "$(GREEN)" category ":$(RESET)"; \
				last_category = category; \
			} \
			printf "  $(YELLOW)%-23s$(RESET) %s\n", $$1, $$2 \
		}' $(MAKEFILE_LIST)

########################################################
# Initialization
########################################################

### Initialization
.PHONY: init
init: ## Initialize project (usage: make init name=my-project description="my description")
	@if [ -z "$(name)" ] || [ -z "$(description)" ]; then \
		echo "$(RED)Error: Both 'name' and 'description' parameters are required$(RESET)"; \
		echo "Usage: make init name=<project_name> description=<project_description>"; \
		exit 1; \
	fi
	@echo "$(YELLOW)🚀 Initializing project $(name)...$(RESET)"
	@jq '.name = "$(name)" | .description = "$(description)"' package.json > package.json.tmp && mv package.json.tmp package.json
	@sed -i.bak "s/# Bun-Template/# $(name)/" README.md && rm README.md.bak
	@echo "$(GREEN)✅ Updated project name and description.$(RESET)"

########################################################
# Check dependencies
########################################################

check_bun:
	@if ! command -v bun > /dev/null 2>&1; then \
		echo "$(RED)bun is not installed. Please install bun before proceeding.$(RESET)"; \
		exit 1; \
	else \
		bun --version; \
	fi

########################################################
# Setup
########################################################

### Setup & Dependencies
setup: check_bun ## Install dependencies
	@echo "$(YELLOW)🔄 Installing dependencies...$(RESET)"
	@bun install
	@echo "$(GREEN)✅ Dependencies installed.$(RESET)"

setup_githooks: ## Set up git hooks with prek
	@echo "$(YELLOW)🔨 Setting up githooks with prek...$(RESET)"
	@git config --unset-all core.hooksPath || true
	@uv tool install prek
	@prek install

########################################################
# Run
########################################################

### Running
all: setup setup_githooks ## Setup and run main application
	@echo "$(GREEN)🏁 Running main application...$(RESET)"
	@bun run start
	@echo "$(GREEN)✅ Main application run completed.$(RESET)"

dev: check_bun ## Run in watch mode
	@bun run dev

########################################################
# Testing
########################################################

### Testing
test: check_bun ## Run all tests
	@echo "$(GREEN)🧪 Running tests...$(RESET)"
	@bun test
	@echo "$(GREEN)✅ Tests passed.$(RESET)"

test_fast: check_bun ## Run fast tests (5s timeout)
	@echo "$(GREEN)🧪 Running fast tests...$(RESET)"
	@bun test --timeout 5000
	@echo "$(GREEN)✅ Fast tests passed.$(RESET)"

test_watch: check_bun ## Run tests in watch mode
	@bun test --watch

########################################################
# Code Quality
########################################################

### Code Quality
fmt: check_bun ## Format code with Biome
	@echo "$(YELLOW)✨ Formatting with Biome...$(RESET)"
	@bunx biome check --write
	@echo "$(GREEN)✅ Formatting completed.$(RESET)"

lint: check_bun ## Run Biome linter
	@echo "$(YELLOW)🔍 Running Biome linter...$(RESET)"
	@bunx biome check
	@echo "$(GREEN)✅ Linting completed.$(RESET)"

deadcode: check_bun ## Find dead code and unused deps with knip
	@echo "$(YELLOW)🔍 Running knip (dead code + unused deps)...$(RESET)"
	@bunx knip
	@echo "$(GREEN)✅ Dead code check completed.$(RESET)"

typecheck: check_bun ## Run TypeScript type checker
	@echo "$(YELLOW)🔍 Running TypeScript type checker...$(RESET)"
	@bunx tsc --noEmit
	@echo "$(GREEN)✅ Type check completed.$(RESET)"

lint_links: check_bun ## Check markdown links
	@echo "$(YELLOW)🔍 Linting markdown links...$(RESET)"
	@find . -name "*.md" -not -path "./node_modules/*" | xargs bunx markdown-link-check --quiet --config .markdown-link-check.json
	@echo "$(GREEN)✅ Link linting completed.$(RESET)"

ci: lint deadcode typecheck lint_links ## Run all CI checks (lint, deadcode, typecheck, lint_links)
	@echo "$(GREEN)✅ CI checks completed.$(RESET)"
