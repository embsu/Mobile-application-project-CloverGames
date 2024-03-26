import React from 'react';
import { View, StyleSheet } from 'react-native';
import MemoryGame from '../games/MemoryGame'; // Varmista, että polku on oikea

const MemoryScreen = () => {
  return (
    <View style={styles.container}>
      <MemoryGame />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray', // Taustaväri voi olla mikä tahansa
  },
});

export default MemoryScreen;
