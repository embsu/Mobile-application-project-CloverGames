import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import FontLoader from './appComponents.js/FontLoader';

// import * as SplashScreen from 'expo-splash-screen';


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
import { auth } from './firebase/Config';

const Stack = createNativeStackNavigator();


export default function App() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();


    // // FONTS 
    // const [fontsLoaded] = useFonts({
    //   'comfortaa-variable': require('./assets/fonts/Comfortaa-VariableFont_wght.ttf'),
    // 'pacifo-regular': require('./assets/fonts/Pacifico-Regular.ttf'),
    // });
  
    // const [loading, setLoading] = useState(true);
  
    // if (!fontsLoaded) {
    //   return null; // You may return a loading indicator here
    // }
    // // Once fonts have loaded, set loading state to false
    // if (loading) {
    //   setLoading(false);
    // }
  
  //logic for checking if user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => { //listener for user state changes
      setUser(user);
      //if user is logged in, set user to user, if not, set user to null
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) return null; //if initializing is true, return null


  return (

    <NavigationContainer>
      {/* you can use fontloader to use custom fonts anywhere in the app */}
     <FontLoader>
      <Stack.Navigator>
        {/* if user is logged in, show HomeScreen, if not, show LoginScreen */}
        {user ? (
          <Stack.Screen name="Home" component={HomeScreen}
            options={({ navigation }) => ({
              title: 'Home',
              headerTitleAlign: 'center',
              headerLeft: () => (
                <IconButton
                  icon="logout"
                  color="black"
                  size={30}
                  onPress={async () => {
                    handleSignOut();
                  }}/>),})}/>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen}
            options={{
              headerShown: false,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'black',
                


              },
              headerTitleStyle: {
                fontFamily: 'comfortaa-variable',
                color: 'white',
                
              },
              
            }
            
          } 

          
          
          />
        )}
       
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
