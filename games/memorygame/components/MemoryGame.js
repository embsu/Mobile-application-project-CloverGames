import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ToastAndroid } from 'react-native';
import Cards from './Cards';

const MemoryGame = () => {
  const initialCards = [
    { id: 1, imageSource: require('../assets/koretti.png') },
    { id: 2, imageSource: require('../assets/koretti.png') },
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

  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  const shuffleCards = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setCards(shuffleCards(initialCards));
  }, []);

  const handleCardPress = (cardId) => {
    // Jos kortti on jo valittu, älä tee mitään
    if (selectedCards.includes(cardId)) {
      return;
    }
  
    // Valitse kortti ja päivitä valittujen korttien tila
    setSelectedCards([...selectedCards, cardId]);
  
    // Jos valittuja kortteja on kaksi, tarkista ovatko ne pari
    if (selectedCards.length === 1) {
      const firstCard = cards.find((card) => card.id === selectedCards[0]);
      const secondCard = cards.find((card) => card.id === cardId);
  
      // Jos valitut kortit muodostavat parin, tyhjennä valitut kortit
      if (firstCard && secondCard && firstCard.content === secondCard.content) {
        setSelectedCards([]);
      } else {
        // Jos valitut kortit eivät muodosta paria, käännä kortit takaisin 3 sekunnin kuluttua
        setTimeout(() => {
          setSelectedCards([]);
        }, 3000);
      }
    } else if (selectedCards.length === 2) {
      // Jos valittuja kortteja on jo kaksi, käännä ne takaisin 3 sekunnin kuluttua
      setTimeout(() => {
        setSelectedCards([]);
      }, 3000);
    }
  };

  const renderCard = ({ item }) => (
    <Cards
      id={item.id}
      onPress={handleCardPress}
      content={item.content}
      imageSource={item.imageSource}
      style={styles.card}
      color="darkgray"
    />
  );

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
