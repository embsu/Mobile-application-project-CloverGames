import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

const MemoryScreen = () => {
  const navigation = useNavigation();
  const [backgroundMusic, setBackgroundMusic] = useState(null);
  const [isMusicLoaded, setIsMusicLoaded] = useState(false);

  useEffect(() => {
    const loadBackgroundMusic = async () => {
      if (!isMusicLoaded) {
        const soundObject = new Audio.Sound();
        try {
          await soundObject.loadAsync(require('../games/memorygame/assets/background_music_menu.mp3'));
          await soundObject.setIsLoopingAsync(true);
          await soundObject.playAsync();
          setBackgroundMusic(soundObject);
          setIsMusicLoaded(true);
        } catch (error) {
          console.error('Virhe taustaäänen toistossa:', error);
        }
      }
    };

    loadBackgroundMusic();

    return () => {
      if (backgroundMusic) {
        backgroundMusic.stopAsync(); // Pysäytä äänilooppi komponentin purkamisen yhteydessä
        backgroundMusic.unloadAsync(); // Vapauta resurssit
      }
    };
  }, []);

  const handleNewGame = () => {
    if (backgroundMusic) {
      backgroundMusic.stopAsync(); // Pysäytä äänilooppi
    }
    navigation.navigate('MemoryGame');
  };

  const handleOptions = () => {
    if (backgroundMusic) {
      backgroundMusic.stopAsync(); // Pysäytä äänilooppi
    }
    navigation.navigate('Options');
  };

  const handleExit = () => {
    if (backgroundMusic) {
      backgroundMusic.stopAsync(); // Pysäytä äänilooppi
    }
    navigation.navigate('Home');
  };

  return (
    <ImageBackground source={require('../games/memorygame/assets/background_container.png')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNewGame} style={styles.button}>
          <ImageBackground source={require('../games/memorygame/assets/background_button.png')} style={styles.imageBackground} borderRadius={10} borderWidth={4} borderColor="#121212" resizeMode="cover">
            <Text style={styles.buttonText}>New Game</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOptions} style={styles.button}>
          <ImageBackground source={require('../games/memorygame/assets/background_button.png')} style={styles.imageBackground} borderRadius={10} borderWidth={4} borderColor="#121212" resizeMode="cover">
            <Text style={styles.buttonText}>Options</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleExit} style={styles.button}>
          <ImageBackground source={require('../games/memorygame/assets/background_button.png')} style={styles.imageBackground} borderRadius={10} borderWidth={4} borderColor="#121212" resizeMode="cover">
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
