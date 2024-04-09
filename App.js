import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//____SCREENS____
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import TopinpeliScreen from './screens/Memory';
import FlappybirdScreen from './screens/FlappybirdScreen';
import MinesweeperScreen from './screens/MinesweeperScreen';

// Snakegame
import SnakegameMenuScreen from './screens/SnakegameMenuScreen';
import SnakegameScreen from './screens/SnakegameScreen';
import SnakegameSettings from './screens/SnakegameSettings';
import SnakegameLeaderboard from './screens/SnakegameLeaderboard';

// for Firebase
import { handleSignOut } from './firebase/Logout';
import { signOut } from './firebase/Config';



import { PaperProvider } from 'react-native-paper';



const Stack = createNativeStackNavigator();

export default function App() {

const [userLogged, setUserLogged] = useState(false);


  // //if user has logged in, set loggedIn to true
  // const login = () => {
  //   setLoggedIn(true);
  //   useNavigation().navigate('Home');
  // }


  return (

    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}
          options={{
            headerTitleAlign: 'center',
          }}
        />


        <Stack.Screen name="Home" component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Home',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <IconButton
                icon="logout"
                color="black"
                size={30}
                onPress={async() => {
                  handleSignOut();  
                  navigation.navigate('Login');
                }}
              />
            ),})
          }
        />


        <Stack.Screen name="flappybird" component={FlappybirdScreen} />
        <Stack.Screen name="minesweeper" component={MinesweeperScreen} />

        {/* mato */}
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
