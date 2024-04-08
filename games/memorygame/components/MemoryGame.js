import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Cards from './Cards';

const MemoryGame = () => {
  const initialCards = [
    { id: 1, imageSource: require('../assets/koretti.png'), content: 'Kortti 1' },
    { id: 2, imageSource: require('../assets/koretti.png'), content: 'Kortti 1' },
    { id: 3, imageSource: null, content: 'Kortti 2' },
    { id: 4, imageSource: null, content: 'Kortti 2' },
    { id: 5, imageSource: null, content: 'Kortti 3' },
    { id: 6, imageSource: null, content: 'Kortti 3' },
    { id: 7, imageSource: null, content: 'Kortti 4' },
    { id: 8, imageSource: null, content: 'Kortti 4' },
    { id: 9, imageSource: null, content: 'Kortti 5' },
    { id: 10, imageSource: null, content: 'Kortti 5' },
    { id: 11, imageSource: null, content: 'Kortti 6' },
    { id: 12, imageSource: null, content: 'Kortti 6' },
    { id: 13, imageSource: null, content: 'Kortti 7' },
    { id: 14, imageSource: null, content: 'Kortti 7' },
    { id: 15, imageSource: null, content: 'Kortti 8' },
    { id: 16, imageSource: null, content: 'Kortti 8' },
  ];

  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]); // Lisätty matchedCards-tilamuuttuja
  const [attempts, setAttempts] = useState(0); // Yritysten määrä
  const [points, setPoints] = useState(0); // Pisteiden määrä

  const shuffleCards = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setCards(shuffleCards(initialCards));
  }, []);

  const handleCardPress = (cardId) => {
    // Jos kortti on jo valittu tai kortti muodostaa jo parin, älä tee mitään
    if (selectedCards.includes(cardId) || matchedCards.includes(cardId)) {
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
        setMatchedCards([...matchedCards, firstCard.id, secondCard.id]);
        setSelectedCards([])
        setAttempts(attempts + 1); // Päivitetään yritysten määrä
        console.log('yritysten määrä:', attempts); // Päivitetään yritysten määrä
        setPoints(points + 1); // Päivitetään pisteiden määrä
        console.log('pisteiden määrä:', points);
      } else {
        // Jos valitut kortit eivät muodosta paria, käännä kortit takaisin 1,5 sekunnin kuluttua
        setTimeout(() => {
          setSelectedCards([]);
        }, 1500);
        setAttempts(attempts + 1)
        console.log('yritysten määrä:', attempts); // Päivitetään yritysten määrä
      }
    } else if (selectedCards.length === 2) {
      // Jos valittuja kortteja on jo kaksi, käännä ne takaisin 1,5 sekunnin kuluttua
      setTimeout(() => {
        setSelectedCards([]);
      }, 1500);
    }
  };

  useEffect(() => {
    // Tarkista, onko valittuna kaksi korttia
    if (selectedCards.length === 2) {
      // Haetaan valitut kortit
      const [firstCardId, secondCardId] = selectedCards;
      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === secondCardId);
  
      // Jos valitut kortit muodostavat parin, lisätään ne matchedCards-tilamuuttujaan
      if (firstCard && secondCard && firstCard.content === secondCard.content) {
        setMatchedCards([...matchedCards, firstCardId, secondCardId]);
      }
  
      // Tyhjennä valitut kortit
      setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
    }
  }, [matchedCards]); // Liitetty matchedCards riippuvuutena
  

  const renderCard = ({ item }) => (
    <Cards
      id={item.id}
      onPress={handleCardPress}
      content={item.content}
      imageSource={item.imageSource}
      style={styles.card}
      color="darkgray"
      isFlipped={selectedCards.includes(item.id) || matchedCards.includes(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Yritykset: {attempts}</Text>
        <Text style={styles.headerText}>Pisteet: {points}</Text>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: 'black',
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 140,
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
