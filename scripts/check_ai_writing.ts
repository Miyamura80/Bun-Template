import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, extname } from "node:path";

const REPO_ROOT = join(import.meta.dir, "..");
const EM_DASH = "\u2014";

const ROOT_SKIP_DIRS = new Set([
    ".git",
    ".venv",
    ".uv_cache",
    ".uv-cache",
    ".uv_tools",
    ".uv-tools",
    ".cache",
    "node_modules",
    ".next",
]);

const RECURSIVE_SKIP_DIRS = new Set(["__pycache__", ".pytest_cache"]);

const SKIP_PATH_PREFIXES = [
    ["docs", ".next"],
    ["docs", "node_modules"],
];

const SKIP_SUFFIXES = new Set([
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".ico",
    ".mp4",
    ".mov",
    ".mp3",
    ".woff",
    ".woff2",
    ".ttf",
    ".otf",
    ".eot",
    ".pdf",
    ".zip",
    ".tar",
    ".gz",
    ".bz2",
    ".7z",
    ".ckpt",
    ".bin",
    ".pyc",
    ".pyo",
    ".db",
]);

async function* iterTextFiles(root: string): AsyncGenerator<string> {
    const entries = await readdir(root, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = join(root, entry.name);
        const relPath = relative(REPO_ROOT, fullPath);
        const parts = relPath.split("/");

        if (entry.isDirectory()) {
            if (parts.length === 1 && ROOT_SKIP_DIRS.has(entry.name))
                continue;
            if (RECURSIVE_SKIP_DIRS.has(entry.name)) continue;
            if (
                SKIP_PATH_PREFIXES.some(
                    (prefix) =>
                        parts.length >= prefix.length &&
                        prefix.every((p, i) => parts[i] === p),
                )
            )
                continue;
            yield* iterTextFiles(fullPath);
        } else if (entry.isFile()) {
            if (SKIP_SUFFIXES.has(extname(entry.name).toLowerCase()))
                continue;
            yield fullPath;
        }
    }
}

function findEmDashes(
    text: string,
): Array<{ lineno: number; line: string }> {
    const results: Array<{ lineno: number; line: string }> = [];
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(EM_DASH)) {
            results.push({ lineno: i + 1, line: lines[i].trim() });
        }
    }
    return results;
}

async function main(): Promise<number> {
    const violations: Array<{
        relPath: string;
        lineno: number;
        snippet: string;
    }> = [];

    for await (const filePath of iterTextFiles(REPO_ROOT)) {
        let text: string;
        try {
            text = await readFile(filePath, "utf-8");
        } catch {
            continue;
        }
        for (const { lineno, line } of findEmDashes(text)) {
            violations.push({
                relPath: relative(REPO_ROOT, filePath),
                lineno,
                snippet: line,
            });
        }
    }

    if (violations.length > 0) {
        console.log(
            `AI writing check failed: '${EM_DASH}' (em dash) detected in the repository`,
        );
        for (const { relPath, lineno, snippet } of violations) {
            console.log(`${relPath}:${lineno}: ${snippet}`);
        }
        console.log(
            "Please remove the em dash or explain why it is acceptable.",
        );
        return 1;
    }

    console.log("AI writing check passed (no em dash found).");
    return 0;
}

process.exit(await main());
