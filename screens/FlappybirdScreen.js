import React from "react";
import { Canvas, useImage, Image, Group, Text, matchFont, Circle, Rect, rect } from "@shopify/react-native-skia";
import { useWindowDimensions, Platform, Alert } from "react-native";
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
import { GestureHandlerRootView, GestureDetector, Gesture } from "react-native-gesture-handler";

// Lets add GRAVITY to the world
//Here cause gravity does not change
const GRAVITY = 900
const JUMP_FORCE = -400

const pipeWidth = 104
const pipeHeight = 640

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

  const birdY = useSharedValue(height / 3)
  const birdYVelocity = useSharedValue(100)
  const birdPos = {
    x: width / 4
  }

  const birdCenterX = useDerivedValue(() => birdPos.x + 32)
  const birdCenterY = useDerivedValue(() => birdY.value + 24)
  //Let's set the pipe offset. If offset is -100 pipe is upper and otherwise. Toppipe: offset - x, bottonpipe x + offset. 
  //Thats cause we dont want to move the pipes same direction. 
  const pipeOffset = useSharedValue(0)
  const topPipeY = useDerivedValue(() => pipeOffset.value - 320)
  const bottomPipeY = useDerivedValue(() => height - 320 + pipeOffset.value)


  //Lets do multiple obstacles
  const obstacles = useDerivedValue(() => {
    const allObstacles = []
    // add bottom pipe
    allObstacles.push({
      x: x.value,
      y: bottomPipeY.value,
      h: pipeHeight,
      w: pipeWidth
    })

    // add top pipe
    allObstacles.push({
      x: x.value,
      y: topPipeY.value,
      h: pipeHeight,
      w: pipeWidth
    })

    return allObstacles

  })

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
    () => x.value,
    (currentValue, previousValue) => {
      const middle = birdPos.x

      // Lets change the pipe offset when the pipe is out of the screen, so that there is different pipes in the screen
      if(previousValue && currentValue < -100 && previousValue > -100) {
        pipeOffset.value = Math.random() * 400 - 200 // To move up and down?? 
      }

      if (
        currentValue !== previousValue &&
        previousValue &&
        currentValue <= middle &&
        previousValue > middle
      ) {
        runOnJS(setScore)(score + 1) //This is just cause we are using state. We need to use runOnJS to run the function
      }
    }
  )

  const isPointCollingWithRect = (point, rect) => {
    'worklet';
    return (
      point.x >= rect.x && // right of the left edge AND
      point.x <= rect.x + rect.w && // left of the right edge AND
      point.y >= rect.y && // below the top AND
      point.y <= rect.y + rect.h // above the bottom
    )
  }

  // Collision detection
  useAnimatedReaction(
    () => birdY.value, //This is the birdY value we are watching
    (currentValue, previousValue) => {
      // Ground and sky collision detection (game over if bird hits the ground or the sky tohigh)
      if (currentValue > height - 150 || currentValue < 0) {
        gameOver.value = true
      }

      const isColliding = obstacles.value.some((rect) => 
        isPointCollingWithRect(
          { x: birdCenterX.value, y: birdCenterY.value }, 
          rect)
      )

      if (isColliding) {
        gameOver.value = true
      }
    })

  // Mikä tämän idea oikein olikaan? No selvitä maanantaina
  useAnimatedReaction(
    () => gameOver.value, // This is the value we are watching
    (currentValue, previousValue) => {
      if (currentValue && !previousValue) {
        cancelAnimation(x) // Stops the animation
      }
    })

  // This is pshysics for the bird
  // dt is the time since the last frame
  // We use this to calculate the new position of the bird
  // dividing by 1000 to convert from milliseconds to seconds
  useFrameCallback(({ timeSincePreviousFrame: dt }) => {
    if (!dt || gameOver.value) {
      return
    }
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
    if (gameOver.value) {
      //restart
      restartGame()
    }
    else {
      //Jump
      birdYVelocity.value = JUMP_FORCE
    }
  })

  //This is for the rotation of the bird
  const birdTransform = useDerivedValue(() => {
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
    return { x: width / 4 + 32, y: birdY.value + 24 }
  })
  const fontFamily = Platform.select({ ios: 'Helvetica', default: 'serif' })
  const fontStyle = {
    fontFamily,
    fontSize: 40,
    fontWeight: 'bold'
  }

  const font = matchFont(fontStyle)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Canvas
          style={{ width, height }}
        >
          {/* Background */}
          <Image image={bg} width={width} height={height} fit={'cover'} />
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
            y={height - 150}
            x={0}
            fit={'cover'}
          />
          <Group
            transform={birdTransform} origin={birdOrigin}>
            {/* Bird */}
            <Image
        image={bird}
        x={birdPos.x}
        y={birdY}
        width={64}
        height={48}
  />

          </Group>
          {/* Score */}
          <Text
            x={width / 2 - 30}
            y={100}
            text={score.toString()}
            font={font}

          />


        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default FlappybirdScreen;