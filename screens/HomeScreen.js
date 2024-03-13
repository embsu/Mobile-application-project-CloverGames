import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function homeScreen() {
  const navigation = useNavigation();

  return (

    <View>
      <TouchableOpacity
        style={{ backgroundColor: 'blue', width: 100, height: 100 }}
        onPress={() => navigation.navigate('flappybird')}
      >
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: 'red', width: 100, height: 100 }}
        onPress={() => navigation.navigate('minesweeper')}
      >
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: 'green', width: 100, height: 100 }}
        onPress={() => navigation.navigate('snakegame')}
      >
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: 'pink', width: 100, height: 100 }}
        onPress={() => navigation.navigate('Topinpeli')}
      >
      </TouchableOpacity>

    </View>
  )
}