import { View, Text, StyleSheet, TouchableOpacity, Modal, ImageBackground } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import LoginForm from '../firebase/LoginForm'
import RegisterForm from '../firebase/RegisterForm'

export default function LoginScreen() {
    const navigation = useNavigation();
    

    return (
      
        <ImageBackground source={require('../assets/images/backgroundred.jpg')} 
        style={styles.image}
        imageStyle={{opacity: 0.5}}
       
        >
     <Text style={styles.appnameTxt}>CloverGames</Text>
            <View style={styles.container}>
                
                <View>
                    <LoginForm navigation={navigation} />
                </View>
                <View>
                    <RegisterForm navigation={navigation} />
                </View>
            </View>
        </ImageBackground>
     
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center',
     
        borderRadius: 20,
        padding: 20,
        borderColor: 'white',
        borderWidth: 2,
        marginTop: 20,
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        alignItems: 'center',
        backgroundColor: 'rgba(232, 142, 142, 0.2)',
        justifyContent: 'center',
        
    },
    appnameTxt: {
        fontSize: 40,
        fontFamily: 'pacifico-regular',
        marginBottom: 20,
        color: 'white',
        fontSize: 50,
        padding: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: { width: 3, height: 4 },
        textShadowRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'white',
        padding: 10,
        margin: 10,

       
    },
})