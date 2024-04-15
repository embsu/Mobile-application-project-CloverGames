
import React from 'react';
import { useWindowDimensions, Platform } from 'react-native';
import { Canvas, matchFont, Text} from "@shopify/react-native-skia";

const RestartComponent = () => {

    const { width, height } = useWindowDimensions()

    const fontFamily = Platform.select({ ios: 'Helvetica', default: 'serif' })
    const fontStyle = {
        fontFamily,
        fontSize: 40,
        fontWeight: 'bold'
    }

    const handleRestart = () =>{
        console.log('Restarting game')
    }

    return (
        <>  
             <Text
                x={width / 2 - 35}
                y={100}
                text={'Game Over'}
                fontSize={500}
            />
            <Text
                x={width / 2 - 30}
                y={150}
                text={'Restart'}
                fontSize={30}
                
            />
        </>


    )
};
export default RestartComponent;
