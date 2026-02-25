import type React from "react";
import { COLORS } from "../styles/colors";
import { FONTS } from "../styles/fonts";

type TerminalProps = {
    children: React.ReactNode;
    title?: string;
};

export const Terminal: React.FC<TerminalProps> = ({
    children,
    title = "Terminal",
}) => {
    return (
        <div
            style={{
                background: COLORS.bgTerminal,
                borderRadius: 12,
                border: `1px solid ${COLORS.border}`,
                overflow: "hidden",
                width: "100%",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
        >
            {/* Title bar */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 16px",
                    background: "#1c2128",
                    borderBottom: `1px solid ${COLORS.border}`,
                    gap: 8,
                }}
            >
                {/* Traffic lights */}
                <div style={{ display: "flex", gap: 6 }}>
                    <div
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            background: COLORS.trafficRed,
                        }}
                    />
                    <div
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            background: COLORS.trafficYellow,
                        }}
                    />
                    <div
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            background: COLORS.trafficGreen,
                        }}
                    />
                </div>
                <div
                    style={{
                        flex: 1,
                        textAlign: "center",
                        fontFamily: FONTS.sans,
                        fontSize: 13,
                        color: COLORS.textMuted,
                        marginRight: 42,
                    }}
                >
                    {title}
                </div>
            </div>
            {/* Terminal body */}
            <div
                style={{
                    padding: "16px 20px",
                    fontFamily: FONTS.mono,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: COLORS.text,
                    minHeight: 180,
                }}
            >
                {children}
            </div>
        </div>
    );
};
