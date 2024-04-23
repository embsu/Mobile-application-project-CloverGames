import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, ImageBackground } from 'react-native';
import Cards from './Cards';
import Navbar from './Navbar';
import CustomAlert from './CustomAlert';
import { saveScoreToFirebase } from './ScoreToFirebase'

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
    { id: 17, imageSource: require('../assets/nelio_vadelma.png'), content: 9 },
    { id: 18, imageSource: require('../assets/nelio_vadelma.png'), content: 9 },
    { id: 19, imageSource: require('../assets/nelio_banaani.png'), content: 10 },
    { id: 20, imageSource: require('../assets/nelio_banaani.png'), content: 10 },
    { id: 21, imageSource: require('../assets/nelio_appelsiini.png'), content: 11 },
    { id: 22, imageSource: require('../assets/nelio_appelsiini.png'), content: 11 },
    { id: 23, imageSource: require('../assets/nelio_ananas.png'), content: 12 },
    { id: 24, imageSource: require('../assets/nelio_ananas.png'), content: 12 },
  ];

  const [cards, setCards] = useState([]); // Kortit
  const [selectedCards, setSelectedCards] = useState([]); // Valitut kortit
  const [matchedCards, setMatchedCards] = useState([]); // Tilamuuttuja parille
  const [attempts, setAttempts] = useState(0); // Yritysten määrä
  const [points, setPoints] = useState(10000); // Pisteiden määrä
  const [isGameWon, setIsGameWon] = useState(false);

  const totalPairs = 12; // Parit yhteensä
  const [foundPairs, setFoundPairs] = useState(0); // Löydetyt parit

  // Tarkista, ovatko kaikki parit löydetty
  useEffect(() => {
    if (foundPairs === totalPairs) {
  // Aseta peli voitetuksi
      saveScoreToFirebase(points)
    
      setIsGameWon(true);
    }
  }, [foundPairs]);

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
        setFoundPairs(foundPairs + 1); // Päivitetään löydettyjen parien määrä
        
      } else {
        // Jos valitut kortit eivät muodosta paria, käännä kortit takaisin 1,5 sekunnin kuluttua
        setPoints(points - 150);
        setTimeout(() => {
          setSelectedCards([]);
        }, 1500);
        setAttempts(attempts + 1) // Päivitetään yritysten määrä
      }
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
  }, [matchedCards]);
  
  const renderCard = ({ item }) => (
    <Cards
      id={item.id}
      onPress={handleCardPress}
      imageSource={item.imageSource}
      style={styles.card}
      color="darkgray"
      isFlipped={selectedCards.includes(item.id) || matchedCards.includes(item.id)}
    /> 
  );

  return (
    <View style={styles.container}>  
        <ImageBackground source={require('../assets/background_game.png')} style={styles.imageBackground}>
            <View style={styles.header}>
                <Navbar points={points} attempts={attempts} />
            </View>
            <View style={styles.cardContainer}>
                <FlatList
                    data={cards}
                    renderItem={renderCard}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={4}
                />       
            </View>
            <CustomAlert
          isVisible={isGameWon}
          message={`Congratulations! You won!`}
          points={points}
          onClose={() => setIsGameWon(false)}
          reset={() => {
            setCards(shuffleCards(initialCards)); // Aseta kortit uudelleen sekoitettuna
            setSelectedCards([]); // Tyhjennä valitut kortit
            setMatchedCards([]); // Tyhjennä löydetyt parit
            setAttempts(0); // Nollaa yritysten määrä
            setPoints(10000); // Palauta pisteet alkuperäiseen arvoon
            setFoundPairs(0); // Nollaa löydetyt parit
            setIsGameWon(false); // Aseta peli voitetuksi
          }}
        />
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: "cover",
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
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%',
    height: '100%',
  },
  card: {
    alignItems: 'center',
    width: '22%',
    aspectRatio: 0.95,
    marginVertical: 5,
    marginHorizontal: 5,
  },
});

export default MemoryGame;