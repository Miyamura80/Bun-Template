import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { EndCard } from "../scenes/end-card";
import { FeatureGrid } from "../scenes/feature-grid";
import { TerminalCommands } from "../scenes/terminal-commands";
import { TitleIntro } from "../scenes/title-intro";

// 12 FPS, 120 total frames = 10 seconds
// Scene layout:
//   Title Intro:      frames  0-17  (1.5s)
//   Terminal Commands: frames 18-65  (4.0s)
//   Feature Grid:     frames 66-101 (3.0s)
//   End Card:         frames 102-119 (1.5s)

const TITLE_START = 0;
const TITLE_DURATION = 18;

const TERMINAL_START = 18;
const TERMINAL_DURATION = 48;

const FEATURES_START = 66;
const FEATURES_DURATION = 36;

const END_START = 102;
const END_DURATION = 18;

export const Demo: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#0d1117" }}>
            <Sequence
                from={TITLE_START}
                durationInFrames={TITLE_DURATION}
                premountFor={0}
            >
                <TitleIntro />
            </Sequence>

            <Sequence
                from={TERMINAL_START}
                durationInFrames={TERMINAL_DURATION}
                premountFor={6}
            >
                <TerminalCommands />
            </Sequence>

            <Sequence
                from={FEATURES_START}
                durationInFrames={FEATURES_DURATION}
                premountFor={6}
            >
                <FeatureGrid />
            </Sequence>

            <Sequence
                from={END_START}
                durationInFrames={END_DURATION}
                premountFor={6}
            >
                <EndCard />
            </Sequence>
        </AbsoluteFill>
    );
};
