import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: jetBrainsMono } = loadJetBrainsMono("normal", {
    weights: ["400", "700"],
    subsets: ["latin"],
});

const { fontFamily: inter } = loadInter("normal", {
    weights: ["400", "600", "700", "800"],
    subsets: ["latin"],
});

export const FONTS = {
    mono: jetBrainsMono,
    sans: inter,
} as const;
