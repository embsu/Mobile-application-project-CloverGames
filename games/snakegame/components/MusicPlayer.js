// MusicPlayer.js
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const MusicPlayer = ({ source, musicPlaying }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(musicPlaying);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(source, { shouldPlay: isPlaying });
      setSound(sound);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [source]);

  useEffect(() => {
    if (sound) {
      isPlaying ? sound.playAsync() : sound.pauseAsync();
    }
  }, [isPlaying]);

  return null;
}

export default MusicPlayer;