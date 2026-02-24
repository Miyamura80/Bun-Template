# Contributing

## Getting Started

1.  **Prerequisites**:
    - [Bun](https://bun.sh) (latest)

2.  **Setup**:

    ```bash
    make install_tools
    ```

3.  **Run Tests**:
    ```bash
    make test
    ```

## Development Workflow

1.  Create a new branch for your feature/fix.
2.  Make your changes.
3.  Ensure code quality commands pass:
    ```bash
    make ci
    ```
    This runs formatting, linting, type checking, and tests.

## Code Style

- Follow the existing conventions.
- Use `prettier` and `eslint` for linting and formatting (handled by `make fmt` and `make lint`).
- Add tests for new features.

## Pull Requests

- Keep PRs focused on a single change.
- Update documentation if necessary.
