import { View, Text } from 'react-native'
import React from 'react'
import { useEffect } from 'react';

const MemoryScreen = () => {
  useEffect(() => {
    // Aloita muistipeli täällä
    startMemoryGame();
  }, []);

  const startMemoryGame = () => {
    // Toteuta pelin aloituslogiikka täällä
    console.log('Muistipeli on käynnistetty!');
  };

  return (
    <>
      {/* Tässä voit lisätä komponentit ja näkymät, jotka liittyvät muistipeliin */}
    </>
  );
};

export default MemoryScreen;