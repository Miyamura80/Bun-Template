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

export const TitleIntro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleScale = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 200 },
    });

    const taglineOpacity = interpolate(frame, [6, 14], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const taglineY = interpolate(frame, [6, 14], [15, 0], {
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
                    gap: 16,
                }}
            >
                {/* Title */}
                <div
                    style={{
                        fontFamily: FONTS.sans,
                        fontSize: 56,
                        fontWeight: 800,
                        color: COLORS.bunCream,
                        transform: `scale(${titleScale})`,
                        letterSpacing: -1,
                    }}
                >
                    {"🥟 Bun-Template"}
                </div>

                {/* Tagline */}
                <div
                    style={{
                        fontFamily: FONTS.sans,
                        fontSize: 22,
                        fontWeight: 400,
                        color: COLORS.textMuted,
                        opacity: taglineOpacity,
                        transform: `translateY(${taglineY}px)`,
                    }}
                >
                    Zero to production in 30 seconds
                </div>
            </div>
        </AbsoluteFill>
    );
};
