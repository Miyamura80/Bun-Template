import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { COLORS } from "../styles/colors";
import { FONTS } from "../styles/fonts";

export const EndCard: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const ctaScale = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 200 },
    });

    const urlOpacity = interpolate(frame, [6, 14], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: COLORS.bg,
                justifyContent: "center",
                alignItems: "center",
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
                {/* CTA */}
                <div
                    style={{
                        fontFamily: FONTS.sans,
                        fontSize: 36,
                        fontWeight: 700,
                        color: COLORS.bunCream,
                        transform: `scale(${ctaScale})`,
                    }}
                >
                    Get started in 30 seconds
                </div>

                {/* GitHub URL */}
                <div
                    style={{
                        fontFamily: FONTS.mono,
                        fontSize: 18,
                        color: COLORS.blue,
                        opacity: urlOpacity,
                    }}
                >
                    github.com/Miyamura80/Bun-Template
                </div>

                {/* Star prompt */}
                <div
                    style={{
                        fontFamily: FONTS.sans,
                        fontSize: 16,
                        color: COLORS.textMuted,
                        opacity: urlOpacity,
                    }}
                >
                    {"Star \u2B50 if you find it useful!"}
                </div>
            </div>
        </AbsoluteFill>
    );
};
