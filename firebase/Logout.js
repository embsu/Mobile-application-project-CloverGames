import { signOut, auth } from './Config';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function Logout({ navigation }) {


  const handleLogout = async () => {
    try {
      const username = auth.currentUser.displayName;
      // Sign out the current user from Firebase Authentication
      await signOut(auth);
      // Remove the user token from async storage
      await AsyncStorage.removeItem('userToken');
      // Navigate to the login screen
      navigation.navigate('Login');
      // Reset the username state
      
      console.log({username}, 'logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View styles={styles.exitContainer}>

      <TouchableOpacity onPress={handleLogout} style={styles.touchable}>
        <Icon style={styles.icon} name="logout" size={20} color="black" />
        <Text style={{ fontSize: 10 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

styles = StyleSheet.create({
  exitContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  touchable: {

    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,

  },

})

