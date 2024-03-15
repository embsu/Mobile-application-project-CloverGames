import React from "react";
import { Canvas, useImage, Image } from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";
import { useSharedValue, withTiming, Easing, withSequence, withRepeat } from "react-native-reanimated";
import { useEffect } from "react";


const FlappybirdScreen = () => {
  const { width, height } = useWindowDimensions()

  // load the images 
  const bg = useImage(require('../assets/FlappybirdSprites/background-day.png'));
  const bird = useImage(require('../assets/FlappybirdSprites/yellowbird-midflap.png'));
  const pipeBottom = useImage(require('../assets/FlappybirdSprites/pipe-green.png'));
  const pipeTop = useImage(require('../assets/FlappybirdSprites/pipe-green-top.png'));
  const base = useImage(require('../assets/FlappybirdSprites/base.png'));


  const x = useSharedValue(width - 50)

  useEffect(() => {
    x.value = withRepeat(
      withSequence(
        withTiming(-200, { duration: 3000, easing: Easing.linear }), // This is the animation for pipes moving from right to left
        withTiming(width, { duration: 0 }) // this returns the pipes to the right side of the screen, duration is 0 so it happens instantly
      ), 
      -1
    )
  }, [])



  //Let's set the pipe offset. If offset is -100 pipe is upper and otherwise. Toppipe: offset - x, bottonpipe x + offset. 
  //Thats cause we dont want to move the pipes same direction. 
  const pipeOffset = 0

  return (
    <Canvas style={{ width, height }}>
      {/* Background */}
      <Image image={bg} width={width} height={height} fit={'cover'} />
      {/* Pipes */}
      <Image
        image={pipeTop}
        y={pipeOffset - 320}
        x={x}
        width={104}
        height={640}
      />
      <Image
        image={pipeBottom}
        y={height - 320 + pipeOffset}
        x={x}
        width={104}
        height={640}
      />
      {/* Base  */}
      <Image
        image={base}
        width={width}
        height={150}
        y={height - 150}
        x={0}
        fit={'cover'}
      />

      {/* Bird */}
      <Image
        image={bird}
        x={width / 4 - 32}
        y={height / 2 - 24}
        width={64}
        height={48}
      />
    </Canvas>
  );
};

export default FlappybirdScreen;