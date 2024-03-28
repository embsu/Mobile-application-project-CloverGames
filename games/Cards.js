// games/cards.js
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

const Cards = ({ content, style, color }) => {
  const [isFlipped, setIsFlipped] = useState(false); // Tilamuuttuja kortin kääntymiselle

  const handlePress = () => {
    setIsFlipped(!isFlipped); // Vaihdetaan kortin kääntymisen tilaa
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.card, style]}>
      {isFlipped ? ( // Näytetään kääntöpuolen sisältö, kun kortti on käännetty
        <View style={[styles.cardContent, { backgroundColor: color }]}>
          <Text style={styles.cardText}>{content}</Text>
        </View>
      ) : ( // Näytetään etupuolen sisältö, kun kortti ei ole käännetty
        <View style={[styles.cardContent, styles.cardFront]}></View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    aspectRatio: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray', // Kortin reunan väri
  },
  cardContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7ebacf', // Kortin sisällön väri
    borderRadius: 10,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: '',
    color: '#404040', // Tekstin väri
  },
  cardFront: {
    backgroundColor: '#7ebacf', // Etupuolen väri
  },
  cardBack: {
    backgroundColor: 'black', // Kääntöpuolen väri
  },
});

export default Cards;
