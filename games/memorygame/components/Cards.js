import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

const Cards = ({ id, content, imageSource, style, color, onPress, isFlipped }) => {
  const handlePress = () => {
    onPress(id);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.card, style]}>
      {isFlipped ? (
        <View style={[styles.cardContent, { backgroundColor: color }]}>
          {imageSource && <Image source={imageSource} style={styles.image} />}
          <Text style={styles.cardText}>{content}</Text>
        </View>
      ) : (
        <ImageBackground source={require('../assets/background_card.png')} style={styles.cardFront}>
        </ImageBackground>
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
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#131313',
  },
  cardContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#7ebacf',
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: '',
    color: '#404040',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  cardFront: {
    width: '102%',
    height: '102%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default memo(Cards);
