# ANSI color codes
GREEN=\033[0;32m
YELLOW=\033[0;33m
RED=\033[0;31m
BLUE=\033[0;34m
RESET=\033[0m

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
# Check dependencies
########################################################

check_bun:
	@echo "$(YELLOW)🔍Checking bun version...$(RESET)"
	@if ! command -v bun > /dev/null 2>&1; then \
		echo "$(RED)bun is not installed. Please install bun before proceeding.$(RESET)"; \
		exit 1; \
	else \
		bun --version; \
	fi

check_jq:
	@echo "$(YELLOW)🔍Checking jq version...$(RESET)"
	@if ! command -v jq > /dev/null 2>&1; then \
		echo "$(RED)jq is not installed. Please install jq before proceeding.$(RESET)"; \
		echo "$(RED)brew install jq$(RESET)"; \
		exit 1; \
	else \
		jq --version; \
	fi

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
	@sed -i.bak "s/\"name\": \"bun-template\"/\"name\": \"$(name)\"/" package.json && rm package.json.bak
	@sed -i.bak "s/\"description\": \"Bun TypeScript Template\"/\"description\": \"$(description)\"/" package.json && rm package.json.bak
	@sed -i.bak "s/# Bun-Template/# $(name)/" README.md && rm README.md.bak
	@sed -i.bak "s/<b>Opinionated Bun\/TypeScript project stack. 🚀 Batteries included. <\/b>/<b>$(description)<\/b>/" README.md && rm README.md.bak
	@echo "$(GREEN)✅ Updated project name and description.$(RESET)"

########################################################
# Run Main Application
########################################################

### Running
all: check_bun ## Run main application
	@echo "$(GREEN)🏁Running main application...$(RESET)"
	@bun start
	@echo "$(GREEN)✅ Main application run completed.$(RESET)"

docs: ## Run docs with bun
	@echo "$(GREEN)📚Running docs...$(RESET)"
	@cd docs && bun run dev
	@echo "$(GREEN)✅ Docs run completed.$(RESET)"

ralph: check_jq ## Run Ralph agent loop
	@echo "$(RED)⚠️  WARNING: Ralph is an autonomous agent that can modify your codebase.$(RESET)"
	@echo "$(RED)⚠️  It is HIGHLY RECOMMENDED to run Ralph in a sandboxed environment.$(RESET)"
	@printf "$(YELLOW)Are you sure you want to continue? [y/N] $(RESET)" && read ans && [ "$$ans" = "y" ] || (echo "$(RED)Aborted.$(RESET)"; exit 1)
	@echo "$(GREEN)🤖 Starting Ralph Agent...$(RESET)"
	@chmod +x scripts/ralph.sh
	@./scripts/ralph.sh $(ARGS)
	@echo "$(GREEN)✅ Ralph Agent finished.$(RESET)"

########################################################
# Run Tests
########################################################

### Testing
test: check_bun ## Run all tests
	@echo "$(GREEN)🧪Running Tests...$(RESET)"
	@bun test
	@echo "$(GREEN)✅Tests Passed.$(RESET)"

########################################################
# Code Quality
########################################################

### Code Quality
install_tools: check_bun ## Install dependencies
	@echo "$(YELLOW)🔧Installing dependencies...$(RESET)"
	@bun install
	@echo "$(GREEN)✅Dependencies installed.$(RESET)"

fmt: install_tools ## Format code
	@echo "$(YELLOW)✨Formatting project...$(RESET)"
	@bun run format
	@echo "$(GREEN)✅Formatting completed.$(RESET)"

lint: install_tools ## Run linter
	@echo "$(YELLOW)🔍Running linter...$(RESET)"
	@bun run lint
	@echo "$(GREEN)✅Lint completed.$(RESET)"

check_types: install_tools ## Run type checker
	@echo "$(YELLOW)🔍Running type checker...$(RESET)"
	@bun run check-types
	@echo "$(GREEN)✅Type check completed.$(RESET)"

ci: lint check_types test ## Run all CI checks
	@echo "$(GREEN)✅CI checks completed.$(RESET)"
