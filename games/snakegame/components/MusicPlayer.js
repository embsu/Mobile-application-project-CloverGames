// MusicPlayer.js
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const MusicPlayer = ({ source, mute }) => {
  const [sound, setSound] = useState(null);

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(source);
    setSound(sound);
  };

  const playSound = async () => {
    if (!sound) {
      await loadSound();
    }
    await sound.playAsync();
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
    }
  };

  return null; // MusicPlayer component doesn't render anything visible
};

export default MusicPlayer;