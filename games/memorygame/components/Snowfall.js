import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Snowfall = ({ frameRate = 60 }) => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    // Alustetaan lumihiutaleet
    const initialSnowflakes = Array.from({ length: 50 }, () => ({
      y: Math.random() * height, // Satunnainen aloituskorkeus
      x: Math.random() * width, // Satunnainen x-koordinaatti
      size: Math.random() * 5 + 2, // Satunnainen koko
      speed: Math.random() * 3 + 1, // Satunnainen nopeus
    }));
    setSnowflakes(initialSnowflakes);

    // Päivitetään lumihiutaleiden sijainti ja liike
    const animationInterval = setInterval(() => {
      setSnowflakes(prevSnowflakes => {
        return prevSnowflakes.map(flake => {
          // Päivitetään lumihiutaleen sijaintia
          let newY = flake.y + flake.speed;
          // Jos hiutale on pudonnut näytön alapuolelle, asetetaan se takaisin ylös
          if (newY > height) {
            newY = 0;
          }
          return {
            ...flake,
            y: newY,
            x: flake.x + Math.random() * 2 - 1, // Lisätään hieman vaakasuuntaista liikettä
          };
        });
      });
    }, 1000 / frameRate);

    // Tyhjennetään interval kun komponentti puretaan
    return () => clearInterval(animationInterval);
  }, [frameRate]);

  return (
    <View pointerEvents="none" style={styles.container}>
      {snowflakes.map((flake, index) => (
        <Animated.View
          key={index}
          style={[styles.snowflake, {
            width: flake.size,
            height: flake.size,
            borderRadius: flake.size / 2,
            backgroundColor: 'white',
            opacity: 0.8,
            transform: [
              { translateY: flake.y }, // Alkaa ylhäältä näytön ulkopuolelta
              { translateX: flake.x }, // Lisää hieman vaakasuuntaista liikettä
            ],
          }]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  snowflake: {
    position: 'absolute',
  },
});

export default Snowfall;