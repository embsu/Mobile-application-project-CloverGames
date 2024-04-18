import React from 'react';
import { Group, Image, useImage } from '@shopify/react-native-skia';

const BirdComponent = ({birdX, birdY, birdTransform, birdOrigin }) => {
    const bird = useImage(require('../assets/FlappybirdSprites/yellowbird-midflap.png'))
  return (
    <Group transform={birdTransform} origin={birdOrigin}>
      <Image image={bird} x={birdX} y={birdY} width={64} height={48} />
    </Group>
  );
};

export default BirdComponent;
