import React from "react";
import { Canvas, useImage, Image, Group, Text, matchFont, Circle} from "@shopify/react-native-skia";
import { useWindowDimensions, Platform, Alert} from "react-native";
import { 
  useSharedValue, 
  withTiming, 
  Easing, 
  withSequence, 
  withRepeat, 
  useFrameCallback, 
  useDerivedValue, 
  interpolate, 
  Extrapolation, 
  useAnimatedReaction,
  runOnJS,
  cancelAnimation
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { GestureHandlerRootView, GestureDetector, Gesture} from "react-native-gesture-handler";

// Lets add GRAVITY to the world
//Here cause gravity does not change
const GRAVITY = 900
const JUMP_FORCE = -400

const FlappybirdScreen = () => {

  const { width, height } = useWindowDimensions()
  const [score, setScore] = useState(0)

  // load the images 
  const bg = useImage(require('../assets/FlappybirdSprites/background-day.png'));
  const bird = useImage(require('../assets/FlappybirdSprites/yellowbird-midflap.png'));
  const pipeBottom = useImage(require('../assets/FlappybirdSprites/pipe-green.png'));
  const pipeTop = useImage(require('../assets/FlappybirdSprites/pipe-green-top.png'));
  const base = useImage(require('../assets/FlappybirdSprites/base.png'));

  const gameOver = useSharedValue(false)
  const x = useSharedValue(width)

  const birdY = useSharedValue(height/3)
  const birdYVelocity = useSharedValue(100)
  const birdPos = {
    x: width / 4}

  const birdCenterX = useDerivedValue(() => birdPos.x + 32)

  const birdCenterY = useDerivedValue(() => birdY.value + 24)

  //Background animation
  useEffect(() => {
    moveTheMap()
  }, [])

  const moveTheMap = () => {
    x.value = withRepeat(
      withSequence(
        withTiming(-200, { duration: 3000, easing: Easing.linear }), // This is the animation for pipes moving from right to left
        withTiming(width, { duration: 0 }) // this returns the pipes to the right side of the screen, duration is 0 so it happens instantly
      ), 
      -1
    )
  }

  //Scoring system
  useAnimatedReaction(
    () =>  x.value,
    (currentValue, previousValue ) => {
      const middle = birdPos.x
      if(
        currentValue !== previousValue &&
        previousValue &&
        currentValue <= middle &&
        previousValue > middle
        ){
        //Do something
        runOnJS(setScore)(score +1) //This is just cause we are using state. We need to use runOnJS to run the function
        console.log('Score ++')

    }
  }
  )

  // Collision detection
  useAnimatedReaction(
  () => birdY.value, //This is the birdY value we are watching
  (currentValue, previousValue ) => {
    // Ground and sky collision detection (game over if bird hits the ground or the sky tohigh)
    if(currentValue > height - 150 || currentValue < 0){
      gameOver.value = true
    }

    // Pipe collision detection
    if(birdPos.x >= x.value){
      gameOver.value = true
    }
  })

  // Mikä tämän idea oikein olikaan? No selvitä maanantaina
    useAnimatedReaction(
    () => gameOver.value, // This is the value we are watching
    (currentValue, previousValue ) => {
      if(currentValue && !previousValue){
        cancelAnimation(x) // Stops the animation
      }
    })

  // This is pshysics for the bird
  // dt is the time since the last frame
  // We use this to calculate the new position of the bird
  // dividing by 1000 to convert from milliseconds to seconds
  useFrameCallback(({timeSincePreviousFrame: dt}) => {
    if(!dt || gameOver.value){
      return}
    birdY.value = birdY.value + birdYVelocity.value * dt / 1000
    birdYVelocity.value = birdYVelocity.value + GRAVITY * dt / 1000 // The gravity has been taken into account
    //console.log('Velocity:',birdYVelocity.value)
  })

//Restart the game
const restartGame = () => {
  'worklet'; 
  birdY.value = height / 3
  birdYVelocity.value = 0
  gameOver.value = false
  x.value = width
  runOnJS(moveTheMap)()
  runOnJS(setScore)(0)
  

}


  //This is for the tap gesture. So when we tap the bird will jump
  const gesture = Gesture.Tap().onStart(() => {
    if(gameOver.value){
      //restart
      restartGame()
    }
    else {
      //Jump
      birdYVelocity.value = JUMP_FORCE
    }
  })

  //This is for the rotation of the bird
  const birdTransform = useDerivedValue(() =>{
    return [
      {
    rotate: interpolate(
      birdYVelocity.value,
      [-500, 500], // This is the range of the birdYVelocity
      [-0.5, 0.5], // This is how much the bird will rotate
      Extrapolation.CLAMP // This is to make sure the rotation is clamped between -0.5 and 0.5, not over that
      ) 
    }
    ]
  })

//This is for the origin of the bird
  const birdOrigin = useDerivedValue(() => {
    return { x: width / 4 + 32, y: birdY.value + 24}
  })



  //Let's set the pipe offset. If offset is -100 pipe is upper and otherwise. Toppipe: offset - x, bottonpipe x + offset. 
  //Thats cause we dont want to move the pipes same direction. 
  const pipeOffset = 0

  const fontFamily = Platform.select({ios: 'Helvetica',default: 'serif'})
  const fontStyle = {
    fontFamily,
    fontSize: 40,
    fontWeight: 'bold'
  }

  const font = matchFont(fontStyle)

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
      transform={birdTransform} origin={birdOrigin}
      >
      {/* Bird */}
      <Image
        image={bird}
        x={birdPos.x}
        y={birdY}
        width={64}
        height={48}
      />
     
       </Group>
       {/* Simulation*/}
       <Circle cx={birdCenterX} cy={birdCenterY} r={25} width={64} height={48} color={'red'} />
       
       {/* Score */}
        <Text
        x={width / 2 -30}
        y={100}
        text= {score.toString()}
        font={font}
        
        />

       
    </Canvas>
    </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default FlappybirdScreen;