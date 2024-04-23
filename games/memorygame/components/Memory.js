import React from 'react';
import { View, StyleSheet } from 'react-native';
import MemoryGame from './MemoryGame';

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
    backgroundColor: 'lightgray',
  },
});

export default MemoryScreen;
