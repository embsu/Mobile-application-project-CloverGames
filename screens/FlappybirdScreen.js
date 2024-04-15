import React from "react";
import { Canvas, matchFont, Text} from "@shopify/react-native-skia";
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
import { useEffect, useState} from "react";
import { GestureHandlerRootView, GestureDetector, Gesture } from "react-native-gesture-handler"

import BackgroundComponent from '../games/flappybird/components/BackgroundComponent'
import PipeComponent from "../games/flappybird/components/PipeComponent"
import BirdComponent from "../games/flappybird/components/BirdComponent"
import ScoreComponent from "../games/flappybird/components/ScoreComponent"
//import RestartComponent from "../games/flappybird/components/RestartComponent"

const pipeWidth = 104
const pipeHeight = 640

const FlappybirdScreen = ({route}) => {

  const { difficulty } = route.params // saves the difficulty level from difficulty component
  
  // This is the gravity values for the different difficulties
  const gravityValues = {
    'Easy': 900,
    'Medium': 1000,
    'Hard': 2100
  } 

  // this is the jump force for the different difficulties
  const jumpForceValues = {
    'Easy': -400,
    'Medium': -500,
    'Hard': -800
  }

  const difficultyLevel = useSharedValue(difficulty) // This is the difficulty level

  const GRAVITY = useDerivedValue(() => gravityValues[difficultyLevel.value]) // This is the gravity value for the current difficulty
  const JUMP_FORCE = useDerivedValue(() => jumpForceValues[difficultyLevel.value]) // This is the jump force for the current difficulty

  console.log("Difficulty flapyssä: ", difficulty)
  console.log ("gravity: ", GRAVITY.value)
  console.log ("jumpforce: ", JUMP_FORCE.value)
  
  const { width, height } = useWindowDimensions()
  const [score, setScore] = useState(0)

  const gameOver = useSharedValue(false)
  const gameOverMenu = useSharedValue(false)
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

  //Lets change the gravity when the difficulty changes
  useAnimatedReaction(
    () => difficultyLevel.value,
    (currentDifficulty) => {
      GRAVITY.value = gravityValues[currentDifficulty]
    }
  )

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
        pipeOffset.value = Math.random() * 300 - 150 // To move up and down?? 
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

  // This function will stop the animation when the game is over
  useAnimatedReaction(
    () => gameOver.value, // This is the value we are watching
    (currentValue, previousValue) => {
      if (currentValue && !previousValue) {
        cancelAnimation(x) // Stops the animation
        gameOverMenu.value = true
        console.log("GameoverMenu " + gameOverMenu.value)
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
    birdYVelocity.value = birdYVelocity.value + GRAVITY.value * dt / 1000 // The gravity has been taken into account
    //console.log('Velocity:',birdYVelocity.value)
  })

  //Restart the game
  const restartGame = () => {
    'worklet';
    birdY.value = height / 3
    birdYVelocity.value = 0
    gameOver.value = false
    gameOverMenu.value = false
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
      birdYVelocity.value = JUMP_FORCE.value
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
          style={{ width, height}}
        >
          <BackgroundComponent />
          <PipeComponent x={x} topPipeY={topPipeY} bottomPipeY={bottomPipeY} pipeWidth={pipeWidth} pipeHeight={pipeHeight}/>
          <BirdComponent birdX={birdPos.x} birdY={birdY} birdTransform={birdTransform} birdOrigin={birdOrigin}/>
          <ScoreComponent score={score} width />
          </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  )
}

export default FlappybirdScreen;