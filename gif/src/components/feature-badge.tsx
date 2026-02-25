import type React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../styles/colors";
import { FONTS } from "../styles/fonts";

type FeatureBadgeProps = {
    emoji: string;
    label: string;
    accentColor: string;
    delay: number;
};

export const FeatureBadge: React.FC<FeatureBadgeProps> = ({
    emoji,
    label,
    accentColor,
    delay,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame,
        fps,
        delay,
        config: { damping: 12, stiffness: 200 },
    });

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: `${accentColor}15`,
                border: `1px solid ${accentColor}40`,
                borderRadius: 8,
                padding: "8px 14px",
                transform: `scale(${scale})`,
                opacity: scale,
            }}
        >
            <span style={{ fontSize: 18 }}>{emoji}</span>
            <span
                style={{
                    fontFamily: FONTS.sans,
                    fontSize: 14,
                    fontWeight: 600,
                    color: COLORS.text,
                }}
            >
                {label}
            </span>
        </div>
    );
};
