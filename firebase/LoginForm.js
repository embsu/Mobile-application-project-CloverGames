import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native-paper'
import { auth, signInWithEmailAndPassword } from './Config';


export default function LoginForm({ navigation }) {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [loginError, setLoginError] = useState(null); // wrong email / password
    const [loginErrorTMR, setLoginErrorTMR] = useState(null); // too many requests


    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // setLoading(true);
            navigation.navigate('Home');
            console.log("User logged in");

            console.log(auth.currentUser.uid);
        }
        catch (error) {
            if (
                error.code === 'auth/wrong-password' ||
                error.code === 'auth/user-not-found' ||
                error.code === 'auth/invalid-credential' ||
                error.code === 'auth/invalid-email') {
                console.log("Wrong password or user not found");
                setLoginError("Wrong password or user not found");
            }
            else if ((error.code === 'auth/too-many-requests')) {
                console.log("Too many requests. Try again later.")
                setLoginErrorTMR("Too many requests. Try again later.");
            } else {
                console.log("Error: ", error);

            }
        }
    }

    return (
        <View style={styles.container}>
            {loginError && <Text style={styles.errorTxt}>{loginError}</Text>}
            {loginErrorTMR && <Text style={styles.errorTxt}>{loginErrorTMR}</Text>}
            
            <TextInput
                style={styles.inputField}
                label="Email"
                onChangeText={setEmail}
                value={email}
                keyboardType='email-address'

            />

            <TextInput
                style={styles.inputField}
                label="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}

            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        // backgroundColor: 'rgba(255,255,255,0.7)',
        // alignItems: 'center',
        // justifyContent: 'center',
        // borderRadius: 20,
        // padding: 20,
        // borderColor: 'white',
        // borderWidth: 2,
        // marginBottom: 20,
       
    },

    inputField: {
        width: 200,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,

        
    },
    button: {
        backgroundColor: '#2A2A2A',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000000',
        borderWidth: 1,
        elevation: 5,
        
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'comfortaa-variable',
        
    },
    errorTxt: {
        color: 'red',
        fontSize: 20,
        fontFamily: 'comfortaa-variable',
    },


});