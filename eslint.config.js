import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {ignores: ["docs/", "frontend/", "node_modules/", ".dependency-cruiser.cjs", ".venv/", ".ruff_cache/", "dist/", "build/"]},
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
];
