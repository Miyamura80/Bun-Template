import React from "react";
import { AbsoluteFill } from "remotion";
import { FeatureBadge } from "../components/feature-badge";
import { COLORS } from "../styles/colors";
import { FONTS } from "../styles/fonts";

const FEATURES = [
    { emoji: "🥟", label: "Bun runtime", color: COLORS.bunCream },
    { emoji: "🛡️", label: "Zod config", color: COLORS.blue },
    { emoji: "🎨", label: "Biome lint", color: COLORS.purple },
    { emoji: "🔍", label: "Dead code", color: COLORS.orange },
    { emoji: "🧪", label: "Bun test", color: COLORS.green },
    { emoji: "📚", label: "Fumadocs", color: COLORS.cyan },
    { emoji: "⚛️", label: "Vite + React", color: COLORS.blue },
    { emoji: "🔒", label: "Pre-commit", color: COLORS.yellow },
];

const STAGGER_FRAMES = 3;

export const FeatureGrid: React.FC = () => {
    return (
        <AbsoluteFill
            style={{
                backgroundColor: COLORS.bg,
                justifyContent: "center",
                alignItems: "center",
                padding: "24px 60px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 20,
                }}
            >
                {/* Header */}
                <div
                    style={{
                        fontFamily: FONTS.sans,
                        fontSize: 28,
                        fontWeight: 700,
                        color: COLORS.text,
                    }}
                >
                    Batteries Included
                </div>

                {/* Grid */}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 12,
                        maxWidth: 600,
                    }}
                >
                    {FEATURES.map((feature, i) => (
                        <FeatureBadge
                            key={feature.label}
                            emoji={feature.emoji}
                            label={feature.label}
                            accentColor={feature.color}
                            delay={i * STAGGER_FRAMES}
                        />
                    ))}
                </div>
            </div>
        </AbsoluteFill>
    );
};
