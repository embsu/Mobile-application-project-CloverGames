import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import FontLoader from './appComponents.js/FontLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import * as SplashScreen from 'expo-splash-screen';


//____SCREENS____
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import TopinpeliScreen from './screens/Memory';
import FlappybirdScreen from './screens/FlappybirdScreen';
import MinesweeperScreen from './screens/MinesweeperScreen';
import LoadingScreen from './screens/LoadingScreen';

// Snakegame
import SnakegameMenuScreen from './screens/SnakegameMenuScreen';
import SnakegameScreen from './screens/SnakegameScreen';
import SnakegameSettings from './screens/SnakegameSettings';
import SnakegameLeaderboard from './screens/SnakegameLeaderboard';

// for Firebase

import { auth } from './firebase/Config';
import LoginForm from './firebase/LoginForm';
import Logout from './firebase/Logout';

const Stack = createNativeStackNavigator();

export default function App() {

  


  return (

    <NavigationContainer>
      {/* you can use fontloader to use custom fonts anywhere in the app */}
      <FontLoader>
        <Stack.Navigator>

          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{
              headerShown: false,
            }}
          />

            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({navigation}) => ({
                title: 'Home',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontFamily: 'comfortaa-variable',
                },

                headerLeft: () => (
                  <Logout navigation={navigation} />
                ),
              })}
            />
 
          
            <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={({ navigation }) => ({
              headerShown: false,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTitleStyle: {
                fontFamily: 'comfortaa-variable',
                color: 'white',
              },
            })}
          >
            
          </Stack.Screen>
    


          <Stack.Screen name="flappybird" component={FlappybirdScreen} />
          <Stack.Screen name="minesweeper" component={MinesweeperScreen} />

          {/* snake */}
          <Stack.Screen
            name="snakegame"
            component={SnakegameMenuScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="snakegameLeaderboard"
            component={SnakegameLeaderboard} />
          <Stack.Screen
            name="actualgame"
            component={SnakegameScreen}
            options={
              {
                headerShown: false
              }
            } />
          <Stack.Screen
            name="snakeSettings"
            component={SnakegameSettings}
            options={{
              title: 'Settings',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily: 'comfortaa-regular',

              },
            }} />
          {/* snake ends */}

          <Stack.Screen name="Topinpeli" component={TopinpeliScreen} />

        </Stack.Navigator>
      </FontLoader>
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
