import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';

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
        <View style={[styles.cardContent, styles.cardFront]}>
          <Text style={styles.cardText}>Käännä</Text>
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
    borderColor: 'gray',
  },
  cardContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7ebacf',
    borderRadius: 10,
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
    backgroundColor: '#7ebacf',
  },
});

export default memo(Cards);
