import React from "react";
import { Composition } from "remotion";
import { Demo } from "./compositions/demo";

export const RemotionRoot: React.FC = () => {
    return (
        <Composition
            id="Demo"
            component={Demo}
            durationInFrames={120}
            fps={12}
            width={800}
            height={450}
        />
    );
};
