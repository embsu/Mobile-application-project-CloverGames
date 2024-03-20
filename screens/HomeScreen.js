import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (

    <View>
      <TouchableOpacity
        style={{ backgroundColor: 'blue', width: 100, height: 100 }}
        onPress={() => navigation.navigate('Flappybird')}
      >
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: 'red', width: 100, height: 100 }}
        onPress={() => navigation.navigate('Minesweeper')}
      >
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: 'green', width: 100, height: 100 }}
        onPress={() => navigation.navigate('Snakegame')}
      >
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: 'pink', width: 100, height: 100 }}
        onPress={() => navigation.navigate('Memory')}
      >
      </TouchableOpacity>

    </View>
  )
}