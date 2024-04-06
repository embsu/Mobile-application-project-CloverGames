import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

const FallingSnow = ({ snowCount = 2, duration = 5000 }) => {
  const fallingAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(fallingAnimation, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      })
    ).start();
  }, [console.log('FallingSnow')]);

  // Luodaan kortit dynaamisesti
  const generateSnow = () => {
    const snows = [];
    const colors = ['#ffffff', '#f0f0f0', '#e0e0e0', '#d0d0d0', '#c0c0c0'];

    for (let i = 0; i < snowCount; i++) {
      const size = Math.random() * 10 + 10;
      const left = Math.random() * 100;
      const delay = Math.random() * duration;
      const color = colors[Math.floor(Math.random() * colors.length)];

      snows.push(
        <Animated.View
          key={i}
          style={[
            styles.snow,
            {
              width: size,
              height: size,
              left: `${left}%`,
              backgroundColor: color,
              transform: [
                {
                  translateY: fallingAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 1000],
                  }),
                },
              ],
            },
          ]}
        />
      );
    }

    return snows; // Palautetaan snows-taulukko
  }

  return (
    <View style={styles.container}>
      {generateSnow()} {/* Renderöidään lumihiutaleet */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  snow: {
    position: 'absolute',
  },
});

export default FallingSnow;
