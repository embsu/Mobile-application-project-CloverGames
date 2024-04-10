import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Snowfall from '../games/memorygame/components/Snowfall';

const MemoryScreen = () => {
  const navigation = useNavigation();

  const handleNewGame = () => {
    navigation.navigate('MemoryGame');
    console.log("Siirry peliin");
  };

  const handleOptions = () => {
    navigation.navigate('Options');
    console.log("Siirry optionssiin");
  };

  const handleExit = () => {
    navigation.navigate('Home');
    console.log("Siirry asetusnäyttöön");
  };

  return (
    <ImageBackground source={require('../games/memorygame/assets/containerbackground.png')} style={styles.background}>
    <View style={styles.container}>
    <TouchableOpacity onPress={handleNewGame} style={styles.button}>
      <ImageBackground source={require('../games/memorygame/assets/background.png')} style={styles.imageBackground} borderRadius={10} borderWidth={4} borderColor="#121212" resizeMode="cover">
        <Text style={styles.buttonText}>New Game</Text>
      </ImageBackground>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleOptions} style={styles.button}>
      <ImageBackground source={require('../games/memorygame/assets/background.png')} style={styles.imageBackground} borderRadius={10} borderWidth={4} borderColor="#121212" resizeMode="cover">
        <Text style={styles.buttonText}>Options</Text>
      </ImageBackground>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleExit} style={styles.button}>
      <ImageBackground source={require('../games/memorygame/assets/background.png')} style={styles.imageBackground} borderRadius={10} borderWidth={4} borderColor="#121212" resizeMode="cover">
        <Text style={styles.buttonText}>Exit</Text>
      </ImageBackground>
    </TouchableOpacity>
    
  </View>
  
  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'relative',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 0,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});

export default MemoryScreen;

//<Snowfall />n