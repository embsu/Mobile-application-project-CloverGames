import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useFonts } from 'expo-font';


//gets props from index.js
const CustomAlert = ({ isVisible, message, onClose, reset}) => {

    useFonts({
        'comfortaa-regular': require('../assets/fonts/Comfortaa-VariableFont_wght.ttf'),

    });
    
    
    return (
        <Modal isVisible={isVisible} animationIn="slideInUp" animationOut="slideOutDown">
            <View style={styles.alertContainer}>
                <Text style={styles.message}>{message}</Text>

                <View style={styles.modalButtonContainer}>
                <TouchableOpacity 
                onPress={onClose }
                style={styles.modalBtns}
                
                >
                    <Text style={{ color: 'white', fontFamily: 'comfortaa-regular', backgroundColor: 'black' }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={reset}
                style={styles.modalBtns}
                >
                    <Text style={{ color: 'white', fontFamily: 'comfortaa-regular', backgroundColor: 'black', }}>Restart</Text>
                </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    alertContainer: {
        backgroundColor: '#EA8282',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        marginBottom: 20,
        color: 'white',
        fontFamily: 'comfortaa-regular',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
       gap: 40,
    },
    modalBtns: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        margin: 10,
    },
});

export default CustomAlert;