import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Cards from './Cards';

const MemoryGame = () => {
  const initialCards = [
    { id: 1, imageSource: require('../assets/nelio_persikka.png'), content: 1 },
    { id: 2, imageSource: require('../assets/nelio_persikka.png'), content: 1 },
    { id: 3, imageSource: require('../assets/nelio_kiivi.png'), content: 2 },
    { id: 4, imageSource: require('../assets/nelio_kiivi.png'), content: 2 },
    { id: 5, imageSource: require('../assets/nelio_luumu.png'), content: 3 },
    { id: 6, imageSource: require('../assets/nelio_luumu.png'), content: 3 },
    { id: 7, imageSource: require('../assets/nelio_lime.png'), content: 4 },
    { id: 8, imageSource: require('../assets/nelio_lime.png'), content: 4 },
    { id: 9, imageSource: require('../assets/nelio_paaryna.png'), content: 5 },
    { id: 10, imageSource: require('../assets/nelio_paaryna.png'), content: 5 },
    { id: 11, imageSource: require('../assets/nelio_vesimeloni.png'), content: 6 },
    { id: 12, imageSource: require('../assets/nelio_vesimeloni.png'), content: 6 },
    { id: 13, imageSource: require('../assets/nelio_viinirypale.png'), content: 7 },
    { id: 14, imageSource: require('../assets/nelio_viinirypale.png'), content: 7 },
    { id: 15, imageSource: require('../assets/nelio_mustikka.png'), content: 8 },
    { id: 16, imageSource: require('../assets/nelio_mustikka.png'), content: 8 },
  ];

  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]); // Lisätty matchedCards-tilamuuttuja
  const [attempts, setAttempts] = useState(0); // Yritysten määrä
  const [points, setPoints] = useState(0); // Pisteiden määrä
  const [gameStarted, setGameStarted] = useState(false); // Pelin aloitus

  const shuffleCards = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setCards(shuffleCards(initialCards));
  }, []);

  // useEffect(() => {
    
  //   if (gameStarted) {
  //     console.log(isFlipped);
  //     // Aseta kortit käännettyinä 2 sekunnin kuluttua pelin alkaessa
  //     const timer = setTimeout(() => {
  //       setCards(cards.map(card => ({ ...card, isFlipped: true })));
  //       console.log(isFlipped);
  //     }, 2000);
  
  //     // Palauta tyhjennystoiminto componentWillUnmount-metodilla
  //     return () => clearTimeout(timer);
  //   }
  // }, [gameStarted, cards, isFlipped]);
  

  const handleCardPress = (cardId) => {
    //console.log(selectedCards)
    // Jos kortti on jo valittu tai kortti muodostaa jo parin, älä tee mitään
    if (selectedCards.includes(cardId) || matchedCards.includes(cardId)) {
      return;
    }
  
    // Jos valittuja kortteja on kaksi, estä uusien korttien valinta
    if (selectedCards.length === 2) {
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
    }
  };
  
  // const handleCardPress = (cardId) => {
  //   // Jos kortti on jo valittu tai kortti muodostaa jo parin, älä tee mitään
  //   if (selectedCards.includes(cardId) || matchedCards.includes(cardId)) {
  //     return;
  //   }
  
  //   // Valitse kortti ja päivitä valittujen korttien tila
  //   setSelectedCards([...selectedCards, cardId]);
  
  //   // Jos valittuja kortteja on kaksi, tarkista ovatko ne pari
  //   if (selectedCards.length === 1) {
  //     const firstCard = cards.find((card) => card.id === selectedCards[0]);
  //     const secondCard = cards.find((card) => card.id === cardId);
  
  //     // Jos valitut kortit muodostavat parin, tyhjennä valitut kortit
  //     if (firstCard && secondCard && firstCard.content === secondCard.content) {
  //       setMatchedCards([...matchedCards, firstCard.id, secondCard.id]);
  //       setSelectedCards([])
  //       setAttempts(attempts + 1); // Päivitetään yritysten määrä
  //       console.log('yritysten määrä:', attempts); // Päivitetään yritysten määrä
  //       setPoints(points + 1); // Päivitetään pisteiden määrä
  //       console.log('pisteiden määrä:', points);
  //     } else {
  //       // Jos valitut kortit eivät muodosta paria, käännä kortit takaisin 1,5 sekunnin kuluttua
  //       setTimeout(() => {
  //         setSelectedCards([]);
  //       }, 1500);
  //       setAttempts(attempts + 1)
  //       console.log('yritysten määrä:', attempts); // Päivitetään yritysten määrä
  //     }
  //   } else if (selectedCards.length === 2) {
  //     // Jos valittuja kortteja on jo kaksi, käännä ne takaisin 1,5 sekunnin kuluttua
  //     setTimeout(() => {
  //       setSelectedCards([]);
  //     }, 1500);
  //   }
  // };

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
      //content={item.content}
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
