import { View, Text, StyleSheet } from 'react-native'
import React, { useState }from 'react'
import Snake from '../games/snakegame/index.js'




export default function SnakegameScreen() {


  return (
    <View style={styles.container}>
      <Snake />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'black', // Adjust as needed
  },
})