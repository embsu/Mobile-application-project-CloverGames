import { View, Text, StyleSheet, Image, ImageBackground} from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { auth } from '../firebase/Config'; // Adjust the import path as needed


export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const username = route.params?.username;


  // const [username, setUsername] = useState('');
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchUsername();
  // }, [username]);

  // // Function to fetch the username of the currently logged-in user
  // const fetchUsername = async () => { // Same as the display name (set in registration)
  //   // Retrieve the current user from Firebase Authentication
  //   const currentUser = auth.currentUser;

  //   // Check if a user is logged in
  //   if (currentUser) {
  //     try {
  //       const username = currentUser.displayName;
  //       setUsername(username);
  //       setLoading(false);
  //       console.log('User data fetched:', username);
  //     }
  //     catch (error) {
  //       console.error('Error fetching user data:', error);
  //       // Handle erro 

  //     }
  //   };
  // }

  return (

    <View>
      <View style={styles.appnameAndImage}>
        <Text style={styles.appnameTxt}>CloverGames</Text>
        <Image source={require('../assets/images/clover3.png')} style={{ width: 50, height: 55, }} />
      </View>

      <View style={styles.welcomecontainer}>

        <Text style={styles.welcomeTxt}>Welcome, {username}! </Text>
        <Text style={styles.welcomeTxt}>Choose a game to play!</Text>
      </View>

      <View style={styles.gameAppsContainer}>

        <View style={styles.gameAppAndText}>
          <TouchableOpacity style={styles.gameApp}
            onPress={() => navigation.navigate('flappybird')}>
            <ImageBackground source={require('../assets/images/flappy.jpg')} style={styles.gameAppImage} />
          </TouchableOpacity>
          <Text style={styles.gameAppText}>Flappy Bird</Text>
        </View>

        <View style={styles.gameAppAndText}>
          <TouchableOpacity style={styles.gameApp}
            onPress={() => navigation.navigate('minesweeper')}>
            <ImageBackground source={require('../assets/images/minesweep.jpg')} style={styles.gameAppImage} />
          </TouchableOpacity>
          <Text style={styles.gameAppText}>Minesweeper</Text>
        </View>

        <View style={styles.gameAppAndText}>
          <TouchableOpacity style={styles.gameApp}
            onPress={() => navigation.navigate('snakegame')}>
            <ImageBackground source={require('../assets/images/mato2.jpg')} style={styles.gameAppImage} />
          </TouchableOpacity>
          <Text style={styles.gameAppText}>Snake Game</Text>
        </View>

        <View style={styles.gameAppAndText}>
          <TouchableOpacity style={styles.gameApp}
            onPress={() => navigation.navigate('Topinpeli')}>
            <ImageBackground source={require('../assets/images/memorygame.jpg')} style={styles.gameAppImage} />
          </TouchableOpacity>
          <Text style={styles.gameAppText}>Memory Game</Text>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appnameAndImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  appnameTxt: {
    fontSize: 40,
    fontFamily: 'pacifico-regular',

    color: '#EA8282',
    fontSize: 42,
    padding: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: -1, height: 1.2 },
    textShadowRadius: 4,
  },
  welcomecontainer: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTxt: {
    fontSize: 20,
    fontFamily: 'comfortaa-variable',
    color: 'black',
    alignContent: 'center',
    justifyContent: 'center',
  },
  gameAppsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 20,
    gap: 20,
    backgroundColor: 'rgba(234, 130, 130, 0.9)',
    borderRadius: 20,
    margin: 20,
    padding: 20,
    height: 400,
    borderColor: '#EA8282',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  gameApp: {
    overflow: 'hidden',
    borderRadius: 20,
    borderColor: '#EA8282',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  gameAppImage: {
    width: 120,
    height: 120,
  },
  gameAppText: {
    fontSize: 16,
    fontFamily: 'comfortaa-variable',
    color: 'white',
    backgroundColor: '#EA8282',
    borderRadius: 10,
    padding: 2,
    marginTop: 5,

  },
  gameAppAndText: {

    justifyContent: 'center',
    alignItems: 'center',

  },


})