import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore, auth, collection, getDoc, doc } from '../firebase/Config'; // Adjust the import path as needed


export default function HomeScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');

 


  useEffect(() => {
    fetchUsername();
  }, []);

  // Function to fetch the username of the currently logged-in user
const fetchUsername = async () => { // Same as the display name (set in registration)
  // Retrieve the current user from Firebase Authentication

  const currentUser = auth.currentUser;

  // Check if a user is logged in
  if (currentUser) {
      try {
          // Get the UID of the logged-in user
          const username = currentUser.displayName;

          // Set the username in the state
          setUsername(username);
      }
      catch (error) {
          console.error('Error fetching user data:', error);
          // Handle error
      }
  }
};



  // const fetchUsername = async () => {
  //   const currentUser = auth.currentUser;

  //   if (currentUser) {
  //       try {
  //           // Retrieve the user document based on the UID
  //           const userDoc = await collection(firestore, 'users').doc(currentUser.uid).get();
            
  //           if (userDoc.exists()) {
  //               // Get the username from the user's document
  //               const userData = userDoc.data();
  //               setUsername(userData.username);
  //           } else {
  //               console.log('User document does not exist');
  //               // Handle case when user document doesn't exist
  //           }
  //       } catch (error) {
  //           console.error('Error fetching user data:', error);
  //           // Handle error
  //       }
  //   }
  // };

  return (

    <View>
      <Text>Welcome, {username} </Text>
      {/* <Button title="Logout" onPress={handleSignOut} /> */}


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
    </View>
  )
}