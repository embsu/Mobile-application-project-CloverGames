import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopinpeliScreen from './screens/Memory';
import FlappybirdScreen from './screens/FlappybirdScreen';
import MinesweeperScreen from './screens/MinesweeperScreen';
import SnakegameScreen from './screens/SnakegameScreen';
import HomeScreen from './screens/HomeScreen';
import { PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Flappybird" component={FlappybirdScreen} />
          <Stack.Screen name="Minesweeper" component={MinesweeperScreen} />
          <Stack.Screen name="Snakegame" component={SnakegameScreen} />
          <Stack.Screen name="Memory" component={TopinpeliScreen} />
        </Stack.Navigator>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
