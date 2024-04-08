import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'


export default function Login() {
    const navigation = useNavigation();

    const [registerModalVisible, setRegisterModalVisible] = useState(false);


    const registerModal = () => {
        console.log("Register");
        setRegisterModalVisible(true);
    }

    const closeRegisterModal = () => {
        setRegisterModalVisible(false);
    }


  return (

    <View style={styles.container}>
        
     

      <TextInput
      label = "Email"
      style = {styles.inputField}
        />
        <TextInput
        label = "Password"
        style = {styles.inputField}
        />
        <TouchableOpacity
        style = {styles.button}
        onPress = {() => console.log("Login")}
        >
          <Text style = {styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text>Don't you have a username yet? Register now!</Text>
        <TouchableOpacity
        style = {styles.button}
        onPress = {registerModal}
        >
          <Text style = {styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <Modal
        animationType='slide'
        transparent={true}
        visible={registerModalVisible}
        onRequestClose={closeRegisterModal}
        style={styles.modalContainer}
        
        >

           
                <View style={styles.modalView}>
                    <Text>Register</Text>
                    <TextInput
                    label = "Email"
                    style = {styles.inputField}
                    />
                    <TextInput
                    label = "Password"
                    style = {styles.inputField}
                    />
                    <TouchableOpacity
                    style = {styles.button}
                    onPress = {() => console.log("Register")}
                    >
                        <Text style = {styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style = {styles.button}
                    onPress = {closeRegisterModal}
                    >
                        <Text style = {styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
           

        </Modal>
    




    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    inputField: {
        width: '80%',
        margin: 10
    },
    button: {
        backgroundColor: 'pink',
        padding: 10,
        margin: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5
    },


})