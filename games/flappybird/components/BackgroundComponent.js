import React from 'react';
import { Image, useImage } from '@shopify/react-native-skia';
import { useWindowDimensions } from 'react-native';

const BackgroundComponent = () => {
  const { width, height } = useWindowDimensions();
  const bg = useImage(require('../assets/FlappybirdSprites/background-day.png'));
  const bg2 = useImage(require('../assets/FlappybirdSprites/background-night.png'));

  return (
    <>
    {/* Background */}
       <Image 
       image={bg} 
       width={width} 
       height={height} 
       fit={'cover'} />
    </>
  );
};

export default BackgroundComponent;
