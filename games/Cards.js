// Cards.js
import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const Cards = ({ onPress, content, style, color }) => (
  <TouchableOpacity onPress={onPress} style={[styles.card, style, { backgroundColor: color }]}>
    <Text style={styles.cardText}>{content}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 10,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Cards;
