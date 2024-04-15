import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import DifficultyComponent from '../games/flappybird/components/DifficultyComponent'

export default function FlappybirdSettings({ route }) {

    const navigation = route.params.navigation

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <ImageBackground
                source={require('../games/flappybird/assets/FlappybirdSprites/background-day.png')}
                style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    alignItems: 'center',
                }}
                imageStyle={{ opacity: 0.8, }} //only to the background
            >
                <DifficultyComponent navigation={navigation} />
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        alignItems: 'center',
    },

    allButtons: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(253, 253, 253, 0.4)',
        borderRadius: 20,
        width: 300,

        gap: 20,
        padding: 20,
        borderColor: '#FFCC00',
        borderWidth: 2,
        borderStyle: 'dashed',
        position: 'absolute',
        bottom: 160,
    },
    button: {
        width: 200,
        height: 70,
        backgroundColor: '#FFF999',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2,
        margin: 10,
    },
    buttonTxt: {
        color: 'gray',
        fontSize: 20,
    }
})