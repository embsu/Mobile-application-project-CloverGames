import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

//gets props from index.js
const CustomAlert = ({ isVisible, message, onClose, reset }) => {

    return (
        <Modal isVisible={isVisible} animationIn="slideInUp" animationOut="slideOutDown">
            <View style={styles.alertContainer}>
                <Text style={styles.message}>{message}</Text>
                <View style={styles.modalButtonContainer}>
                    <TouchableOpacity
                        onPress={reset}
                        style={styles.modalBtns}
                    >
                        <Text style={{ color: 'white', fontFamily: 'comfortaa-variable', backgroundColor: 'black', }}>Restart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.modalBtns}
                    >
                        <Text style={{ color: 'white', fontFamily: 'comfortaa-variable', backgroundColor: 'black' }}>Close</Text>
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
        borderColor: 'black',
        borderWidth: 2,
        borderStyle: 'solid',
    },
    message: {
        fontSize: 18,
        marginBottom: 20,
        color: 'white',
        fontFamily: 'comfortaa-variable',
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