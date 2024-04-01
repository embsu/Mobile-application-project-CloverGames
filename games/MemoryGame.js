import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Cards from './Cards';

const kuvat = {
 koretti: require('./assets/koretti.png')
};

const MemoryGame = () => {
  // Määritä alkuperäiset kortit
    const initialCards = [
    { id: 1, imageSource: require('./assets/koretti.png') },
    { id: 2, imageSource: require('./assets/koretti.png') },
    { id: 3, content: 'Kortti 2' },
    { id: 4, content: 'Kortti 2' },
    { id: 5, content: 'Kortti 3' },
    { id: 6, content: 'Kortti 3' },
    { id: 7, content: 'Kortti 4' },
    { id: 8, content: 'Kortti 4' },
    { id: 9, content: 'Kortti 5' },
    { id: 10, content: 'Kortti 5' },
    { id: 11, content: 'Kortti 6' },
    { id: 12, content: 'Kortti 6' },
    { id: 13, content: 'Kortti 7' },
    { id: 14, content: 'Kortti 7' },
    { id: 15, content: 'Kortti 8' },
    { id: 16, content: 'Kortti 8' },
  ];

  // Tilamuuttuja korttien säilyttämiseksi
  const [cards, setCards] = useState([]);

  // Funktio sekoittaa kortit satunnaisesti
  const shuffleCards = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    // Sekoita kortit ennen niiden asettamista tilamuuttujaan
    setCards(shuffleCards(initialCards));
  }, []);

  const renderCard = ({ item }) => (
    <Cards
      onPress={() => handleCardPress(item.id)}
      content={item.content}
      imageSource={item.imageSource}
      style={styles.card}
      color="darkgray"
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
    backgroundColor: 'black', //taustaväri
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%',
    height: '100%',
  },
  card: {
    alignItems: 'center',
    width: '22%',
    aspectRatio: 0.6,
    marginVertical: 5,
    marginHorizontal: 5,
  },
});

export default MemoryGame;
