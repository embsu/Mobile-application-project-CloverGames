import React from 'react';
import { Image, useImage } from '@shopify/react-native-skia';
import { useWindowDimensions } from 'react-native';

const PipeComponent = ({ x, topPipeY, bottomPipeY, pipeWidth, pipeHeight }) => {
    const { width, height } = useWindowDimensions();
    const pipeBottom = useImage(require('../assets/FlappybirdSprites/pipe-green.png'));
    const pipeTop = useImage(require('../assets/FlappybirdSprites/pipe-green-top.png'));
    const base = useImage(require('../assets/FlappybirdSprites/base.png'));

    return (
        <>
            {/* Pipes */}
            <Image
                image={pipeTop}
                y={topPipeY}
                x={x}
                width={pipeWidth}
                height={pipeHeight}
            />
            <Image
                image={pipeBottom}
                y={bottomPipeY}
                x={x}
                width={pipeWidth}
                height={pipeHeight}
            />
            {/* Base  */}
            <Image
                image={base}
                width={width}
                height={150}
                y={height - 120}
                x={0}
                fit={'cover'}
            />
        </>
    );
};

export default PipeComponent;
