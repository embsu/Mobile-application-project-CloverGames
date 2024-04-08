import React from 'react';
import { Text, matchFont } from '@shopify/react-native-skia';
import { useWindowDimensions, Platform } from 'react-native';

const ScoreComponent = ({ score }) => {
    const { width, height } = useWindowDimensions()
    const fontFamily = Platform.select({ ios: 'Helvetica', default: 'serif' })
    const fontStyle = {
        fontFamily,
        fontSize: 40,
        fontWeight: 'bold'
    }
    const font = matchFont(fontStyle)

    return (
        <Text
            x={width / 2 - 30}
            y={100}
            text={score.toString()}
            font={font}
        />
    )
};
export default ScoreComponent;
