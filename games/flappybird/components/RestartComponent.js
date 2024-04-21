
import React from 'react';
import { useWindowDimensions, Platform } from 'react-native';
import { Canvas, matchFont, Text} from "@shopify/react-native-skia";

const RestartComponent = ({score}) => {

    console.log("Täällä ollaan RestartComponentissa")

    return (
        <>  
             <Text
                x={width / 2 - 35}
                y={100}
                text={'Game Over'}
                fontSize={500}
            />
         
        </>


    )
};
export default RestartComponent;
