import type { KnipConfig } from "knip";

const config: KnipConfig = {
    entry: ["src/index.ts"],
    project: ["src/**/*.ts"],
    ignoreDependencies: ["markdown-link-check"],
};

export default config;
