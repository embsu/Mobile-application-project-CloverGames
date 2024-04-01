import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FallingSnow from '../games/FallingSnow'; // Tuodaan FallingSnow-komponentti

const MemoryScreen = () => {
  const navigation = useNavigation();

  const handleNewGame = () => {
    navigation.navigate('MemoryGame'); // Navigoi MemoryGameen
  };

  const handleOptions = () => {
    // Tähän voit lisätä toiminnallisuuden siirtymiseksi asetusnäyttöön
    console.log("Siirry asetusnäyttöön");
  };

  const handleExit = () => {
    navigation.navigate('Home');
    console.log("Siirry asetusnäyttöön");
  };

  return (
    <View style={styles.container}>
      {/* Tähän lisätään FallingSnow-komponentti */}
      <FallingSnow />
      
      <TouchableOpacity style={styles.button} onPress={handleNewGame}>
        <Text style={styles.buttonText}>New Game</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleOptions}>
        <Text style={styles.buttonText}>Options</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleExit}>
        <Text style={styles.buttonText}>Exit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#05a6f7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#f705e7',
    textShadowColor: 'black', // Varjon väri
    textShadowOffset: { width: -1, height: 4 }, // Varjon offset (x, y)
    textShadowRadius: 10, // Varjon leveys
    fontSize: 18,
  },
});

export default MemoryScreen;
