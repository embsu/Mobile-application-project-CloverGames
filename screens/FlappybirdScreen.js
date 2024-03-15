import React from "react";
import { Canvas, useImage, Image, Group } from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";
import { useSharedValue, withTiming, Easing, withSequence, withRepeat, useFrameCallback, useDerivedValue, interpolate, Extrapolation} from "react-native-reanimated";
import { useEffect } from "react";
import { GestureHandlerRootView, GestureDetector, Gesture} from "react-native-gesture-handler";

// Lets add GRAVITY to the world
//Here cause gravity does not change
const GRAVITY = 900
const JUMP_FORCE = -400

const FlappybirdScreen = () => {

  
  const { width, height } = useWindowDimensions()

  // load the images 
  const bg = useImage(require('../assets/FlappybirdSprites/background-day.png'));
  const bird = useImage(require('../assets/FlappybirdSprites/yellowbird-midflap.png'));
  const pipeBottom = useImage(require('../assets/FlappybirdSprites/pipe-green.png'));
  const pipeTop = useImage(require('../assets/FlappybirdSprites/pipe-green-top.png'));
  const base = useImage(require('../assets/FlappybirdSprites/base.png'));

  const x = useSharedValue(width)
  const birdY = useSharedValue(height/3)
  const birdYVelocity = useSharedValue(100)

  //This is the bird rotation 
  const birdTransform = useDerivedValue(() =>{
    return [
      {
    rotate: interpolate(
      birdYVelocity.value,
      [-500, 500],
      [-0.5, 0.5],
      Extrapolation.CLAMP
      ) 
    }
    ]
  })

  const birdOrigin = useDerivedValue(() => {
    return { x: width / 4 + 32, y: birdY.value + 24}
  })

  // This is animation for the bird
  // dt is the time since the last frame
  // We use this to calculate the new position of the bird
  // dividing by 1000 to convert from milliseconds to seconds

  useFrameCallback(({timeSincePreviousFrame: dt}) => {
    if(!dt){
      return}
    birdY.value = birdY.value + birdYVelocity.value * dt / 1000
    birdYVelocity.value = birdYVelocity.value + GRAVITY * dt / 1000 // The gravity has been taken into account
    //console.log('Velocity:',birdYVelocity.value)
  })

  useEffect(() => {
    x.value = withRepeat(
      withSequence(
        withTiming(-200, { duration: 3000, easing: Easing.linear }), // This is the animation for pipes moving from right to left
        withTiming(width, { duration: 0 }) // this returns the pipes to the right side of the screen, duration is 0 so it happens instantly
      ), 
      -1
    )
  }, [])

  //Katotaanpa mitä tällä nyt tehdään
  const gesture = Gesture.Tap().onStart(() => {
    console.log('Tapped')
    birdYVelocity.value = JUMP_FORCE
  })

  //Let's set the pipe offset. If offset is -100 pipe is upper and otherwise. Toppipe: offset - x, bottonpipe x + offset. 
  //Thats cause we dont want to move the pipes same direction. 
  const pipeOffset = 0

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture = {gesture}>
    <Canvas 
    style={{ width, height }}
    >
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
      <Group 
      transform={birdTransform} 
      origin={birdOrigin}
     
      >
      {/* Bird */}
      <Image
        image={bird}
        x={width / 4 - 32}
        y={birdY}
        width={64}
        height={48}
      />
       </Group>
    </Canvas>
    </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default FlappybirdScreen;