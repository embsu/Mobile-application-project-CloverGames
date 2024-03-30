import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopinpeliScreen from './screens/TopinpeliScreen';
import FlappybirdScreen from './screens/FlappybirdScreen';
import MinesweeperScreen from './screens/MinesweeperScreen';
import SnakegameScreen from './screens/SnakegameScreen';
import SnakegameStart from './screens/SnakegameStart';
import HomeScreen from './screens/HomeScreen';
import SnakegameLeaderboard from './screens/SnakegameLeaderboard';
import { PaperProvider } from 'react-native-paper';

import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="flappybird" component={FlappybirdScreen} />
        <Stack.Screen name="minesweeper" component={MinesweeperScreen} />

        {/* mato */}
        <Stack.Screen
          name="snakegame"
          component={SnakegameStart}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="snakegameLeaderboard"
          component={SnakegameLeaderboard} />
        <Stack.Screen
          name="actualgame"
          component={SnakegameScreen} />
        {/* mato ends */}

        <Stack.Screen name="Topinpeli" component={TopinpeliScreen} />
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
