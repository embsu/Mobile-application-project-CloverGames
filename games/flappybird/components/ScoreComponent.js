import React from 'react';
import { Text, matchFont} from '@shopify/react-native-skia';
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
        <>
            <Text
                x={width / 2 - 35}
                y={100}
                text={'Score:'}
                fontSize={30}
            />
            <Text
                x={width / 2 - 30}
                y={150}
                text={score.toString()}
                font={font}
            />
      </>
    )
};
export default ScoreComponent;
