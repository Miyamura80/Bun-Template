import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type TypingTextProps = {
    text: string;
    startFrame?: number;
    charsPerFrame?: number;
    color?: string;
    showCursor?: boolean;
};

export const TypingText: React.FC<TypingTextProps> = ({
    text,
    startFrame = 0,
    charsPerFrame = 0.8,
    color = "#e6edf3",
    showCursor = true,
}) => {
    const frame = useCurrentFrame();
    const elapsed = Math.max(0, frame - startFrame);
    const charCount = Math.min(text.length, Math.floor(elapsed * charsPerFrame));
    const displayText = text.slice(0, charCount);
    const isDone = charCount >= text.length;

    const cursorOpacity = interpolate(
        frame % 16,
        [0, 8, 16],
        [1, 0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

    return (
        <span style={{ color }}>
            {displayText}
            {showCursor && !isDone && (
                <span style={{ opacity: cursorOpacity }}>{"\u258C"}</span>
            )}
        </span>
    );
};
