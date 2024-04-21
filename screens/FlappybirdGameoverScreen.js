import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { set } from 'firebase/database';

const FlappybirdGameoverScreen = ({ route }) => {
    const score = route.params.score
    const difficulty = route.params.difficulty
    console.log('FlappybirdGameoverScreen: score:', score);

    const navigation = useNavigation();

    const handleRestart = () => {
        console.log('Restarting game from game over screen');
        navigation.navigate('flappybirdgame', { restartPressed: true });
    }

    return (
        <View style={styles.container}>
              <ImageBackground source={require('../games/flappybird/assets/FlappybirdSprites/background-day.png')}
                style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    alignItems: 'center',
                }}
                imageStyle={{ opacity: 0.8, }}
         >
            <Image source={require('../games/flappybird/assets/FlappybirdSprites/gameover.png')} style={styles.image} />
            <Text style={styles.score}>Score: {score}</Text>
            <Text style={styles.score}> Difficulty: {difficulty}</Text>
            <Text style={styles.info}>Your score and difficulty level have been saved!</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={handleRestart}
            >
                <Text style={styles.buttonTxt}>New Game</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={()=>navigation.navigate('flappybird')}
            >
                <Text style={styles.buttonTxt}>Exit</Text>
            </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    info: {
        fontSize: 30,
        padding: 10,
        color: 'black',
        textShadowColor: 'rgba(0, 0, 139, 0.9)',
        textShadowOffset: { width: -1, height: 1.2 },
        textShadowRadius: 4,
        marginBottom: 20,
    },
    title: {
        marginTop: 100,
        fontSize: 60,
        padding: 10,
        color: 'red',
        textShadowColor: 'rgba(0, 0, 139, 0.9)',
        textShadowOffset: { width: -1, height: 1.2 },
        textShadowRadius: 4,
    },
    score: {
        fontSize: 40,
        padding: 10,
        color: '#FFCC00',
        textShadowColor: 'rgba(0, 0, 139, 0.9)',
        textShadowOffset: { width: -1, height: 1.2 },
        textShadowRadius: 4,
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
        fontSize: 30,
    },
    image: {
        width: 350,
        height: 150,
        resizeMode: 'contain',
        marginTop: 100,
    }
})

export default FlappybirdGameoverScreen;
