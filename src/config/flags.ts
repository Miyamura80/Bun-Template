import type { Config } from "./schemas";

/** Get a feature flag value, checking env vars first then config. */
export function getFlag(
    config: Config,
    flagName: string,
    defaultValue = false,
): boolean {
    // Check env var override: FEATURES__FLAG_NAME=true
    const envKey = `FEATURES__${flagName.toUpperCase()}`;
    const envVal = process.env[envKey];
    if (envVal !== undefined) {
        return envVal === "true" || envVal === "1";
    }
    // Fall back to config
    const configVal = config.features[flagName];
    if (typeof configVal === "boolean") return configVal;
    if (typeof configVal === "string") return configVal === "true" || configVal === "1";
    return defaultValue;
}
