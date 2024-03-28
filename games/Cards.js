// games/cards.js
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';

const Cards = ({ content, imageSource, style, color }) => {
  const [isFlipped, setIsFlipped] = useState(false); // Tilamuuttuja kortin kääntymiselle

  const handlePress = () => {
    setIsFlipped(!isFlipped); // Vaihdetaan kortin kääntymisen tilaa
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.card, style]}>
      {isFlipped ? ( // Näytetään kääntöpuolen sisältö, kun kortti on käännetty
        <View style={[styles.cardContent, { backgroundColor: color }]}>
          {imageSource && <Image source={imageSource} style={styles.image} />}
          <Text style={styles.cardText}>{content}</Text>
        </View>
      ) : ( // Näytetään etupuolen sisältö, kun kortti ei ole käännetty
        <View style={[styles.cardContent, styles.cardFront]}>
          <Text style={styles.cardText}>Käännä kortti</Text>
        </View>
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
    position: 'relative',
    overflow: 'hidden', // Tämä rajausta varmistaa, että kuva ei mene kortin reunan yli
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: '',
    color: '#404040', // Tekstin väri
    marginTop: 10,
  },
  image: {
    width: '100%', // Kuva peittää koko kortin leveyden
    height: '100%', // Kuva peittää koko kortin korkeuden
    position: 'absolute',
    top: 0, // Sijoitetaan kuva yläreunaan
    left: 0, // Sijoitetaan kuva vasempaan reunaan
    bottom: 0, // Sijoitetaan kuva alareunaan
    right: 0, // Sijoitetaan kuva oikeaan reunaan
  },
  cardFront: {
    backgroundColor: '#7ebacf', // Etupuolen väri
  },
  cardBack: {
    backgroundColor: 'black', // Kääntöpuolen väri
  },
});

export default Cards;
