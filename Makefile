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
.PHONY: help docs
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
# Run Main Application
########################################################

docs: ## Run docs with bun
	@echo "$(GREEN)📚Running docs...$(RESET)"
	@cd docs && bun run dev
	@echo "$(GREEN)✅ Docs run completed.$(RESET)"

########################################################
# Cleaning
########################################################

### Code Quality
install_tools: ## Install dependencies
	@echo "$(YELLOW)🔧Installing tools...$(RESET)"
	@bun install
	@cd docs && bun install
	@echo "$(GREEN)✅Tools installed.$(RESET)"

fmt: install_tools ## Format code with prettier
	@echo "$(YELLOW)✨Formatting project with Prettier...$(RESET)"
	@bun x prettier --write .
	@echo "$(GREEN)✅Formatting completed.$(RESET)"

lint: install_tools ## Run eslint
	@echo "$(YELLOW)🔍Running eslint...$(RESET)"
	@bun x eslint .
	@echo "$(GREEN)✅Eslint completed.$(RESET)"

dead_code: install_tools ## Find dead code with knip
	@echo "$(YELLOW)🔍Running Knip...$(RESET)"
	@bun x knip
	@echo "$(GREEN)✅Knip completed.$(RESET)"

boundary_check: install_tools ## Enforce module boundaries with dependency-cruiser
	@echo "$(YELLOW)🔍Running Dependency Cruiser...$(RESET)"
	@bun x depcruise src
	@echo "$(GREEN)✅Dependency Cruiser completed.$(RESET)"

typecheck: install_tools ## Run type checker
	@echo "$(YELLOW)🔍Running TypeScript Compiler...$(RESET)"
	@bun x tsc --noEmit
	@echo "$(GREEN)✅Typecheck completed.$(RESET)"

docs_lint: ## Lint docs links
	@echo "$(YELLOW)🔍Linting docs links...$(RESET)"
	@cd docs && bun run lint:links
	@echo "$(GREEN)✅Docs linting completed.$(RESET)"

lint_links: ## Lint all markdown links using markdown-link-check
	@echo "$(YELLOW)🔍Linting all markdown links with markdown-link-check...$(RESET)"
	@find . -name "*.md" -not -path "./node_modules/*" -not -path "./docs/node_modules/*" -not -path "./.venv/*" -print0 | xargs -0 -n1 bun x markdown-link-check -q -c .markdown-link-check.json
	@echo "$(GREEN)✅Link linting completed.$(RESET)"

unused_deps: install_tools ## Check for unused dependencies (alias for dead_code as knip does both)
	@echo "$(YELLOW)🔍Checking unused dependencies with Knip...$(RESET)"
	@bun x knip
	@echo "$(GREEN)✅Dependency check completed.$(RESET)"

ci: lint dead_code boundary_check typecheck docs_lint lint_links ## Run all CI checks
	@echo "$(GREEN)✅CI checks completed.$(RESET)"
