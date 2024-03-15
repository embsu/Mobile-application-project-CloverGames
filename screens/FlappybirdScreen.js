import React from "react";
import { Canvas, useImage, Image} from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";


const FlappybirdScreen = () => {
  const { width, height } = useWindowDimensions()
  // load the images 
  const bg = useImage(require('../assets/FlappybirdSprites/background-day.png'));
  const bird = useImage(require('../assets/FlappybirdSprites/yellowbird-midflap.png'));
  const pipe = useImage(require('../assets/FlappybirdSprites/pipe-green.png'));
  const pipeTop = useImage(require('../assets/FlappybirdSprites/pipe-green-top.png'));


  const r = width * 0.33;
  return (
    <Canvas style={{ width, height}}>
      {/* Background */}
      <Image image ={bg}  width ={width} height ={height} fit = {'cover'} />
      {/* Pipes */}
      <Image 
      image ={pipe} 
      y ={height - 320}
      x={width/2}
      width ={104}
      height ={640}
       />
      <Image 
      image ={pipeTop} 
      y ={- 320}
      x={width/2}
      width ={104}
      height ={640}
       />
      {/* Bird */}
      <Image
       image ={bird}  
       x ={width/4 - 32} 
       y ={height/2 - 24} 
       width={64} 
       height={48} 
       />
    </Canvas>
  );
};

export default FlappybirdScreen;