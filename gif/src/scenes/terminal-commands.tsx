import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Terminal } from "../components/terminal";
import { COLORS } from "../styles/colors";
import { FONTS } from "../styles/fonts";

type CommandLine = {
    command: string;
    output: string;
    startFrame: number;
};

const COMMANDS: CommandLine[] = [
    { command: "make onboard", output: "Project configured", startFrame: 0 },
    { command: "bun install", output: "Installed in 0.3s", startFrame: 8 },
    { command: "make all", output: "Server running", startFrame: 16 },
    { command: "make test", output: "6 tests passed", startFrame: 24 },
    { command: "make ci", output: "All checks green", startFrame: 32 },
    { command: "make dev", output: "Watching for changes", startFrame: 40 },
];

const CHARS_PER_FRAME = 1.2;

export const TerminalCommands: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill
            style={{
                backgroundColor: COLORS.bg,
                justifyContent: "center",
                alignItems: "center",
                padding: "24px 48px",
            }}
        >
            <Terminal title="bun-template">
                {COMMANDS.map((cmd) => {
                    const elapsed = frame - cmd.startFrame;
                    if (elapsed < 0) return null;

                    const typingFrames = cmd.command.length / CHARS_PER_FRAME;
                    const charCount = Math.min(
                        cmd.command.length,
                        Math.floor(elapsed * CHARS_PER_FRAME),
                    );
                    const typedText = cmd.command.slice(0, charCount);
                    const isDoneTyping = elapsed > typingFrames + 1;

                    return (
                        <div key={cmd.command} style={{ marginBottom: 4 }}>
                            {/* Prompt + command */}
                            <div style={{ display: "flex" }}>
                                <span style={{ color: COLORS.green }}>
                                    {"$ "}
                                </span>
                                <span style={{ color: COLORS.text }}>
                                    {typedText}
                                </span>
                                {!isDoneTyping && charCount < cmd.command.length && (
                                    <span
                                        style={{
                                            color: COLORS.bunCream,
                                            opacity:
                                                frame % 16 < 8 ? 1 : 0,
                                        }}
                                    >
                                        {"\u258C"}
                                    </span>
                                )}
                            </div>
                            {/* Output line */}
                            {isDoneTyping && (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                        fontFamily: FONTS.mono,
                                        fontSize: 13,
                                        color: COLORS.textMuted,
                                        marginBottom: 2,
                                    }}
                                >
                                    <span style={{ color: COLORS.green }}>
                                        {"  \u2714"}
                                    </span>
                                    <span>{cmd.output}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </Terminal>
        </AbsoluteFill>
    );
};
