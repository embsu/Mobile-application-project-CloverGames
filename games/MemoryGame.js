// MemoryGame.js
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Cards from '../games/Cards';

const MemoryGame = () => {
  const cards = [
    { id: 1, content: 'Kortti 1' },
    { id: 2, content: 'Kortti 2' },
    { id: 3, content: 'Kortti 3' },
    { id: 4, content: 'Kortti 4' },
    { id: 5, content: 'Kortti 5' },
    { id: 6, content: 'Kortti 6' },
    { id: 7, content: 'Kortti 7' },
    { id: 8, content: 'Kortti 8' },
    { id: 9, content: 'Kortti 9' },
    { id: 10, content: 'Kortti 10' },
    { id: 11, content: 'Kortti 11' },
    { id: 12, content: 'Kortti 12' },
    { id: 13, content: 'Kortti 13' },
    { id: 14, content: 'Kortti 14' },
    { id: 15, content: 'Kortti 15' },
    { id: 16, content: 'Kortti 16' },
  ];

  const renderCard = ({ item }) => (
    <Cards
      onPress={() => handleCardPress(item.id)}
      content={item.content}
      style={styles.card}
      color="lightblue"
    />
  );

  const handleCardPress = (cardId) => {
    console.log(`Painoit korttia ${cardId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <FlatList
          data={cards}
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={4}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    },
    cardContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignContent: 'space-between', // Tasaa kortit sekä vaaka- että pystysuunnassa
      paddingHorizontal: 10,
      paddingVertical: 10,
      width: '100%', // Koko näytön leveys
      height: '100%', // Koko näytön korkeus
    },
    card: {
      alignItems: 'center',
      width: '22%',
      aspectRatio: 0.6,
      marginVertical: 5, // Väli korttien välillä
      marginHorizontal: 5, // Väli korttien välillä
    },
  });

export default MemoryGame;
