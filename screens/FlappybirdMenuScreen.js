import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import React, { useEffect } from 'react'

export default function FlappybirdMenuScreen({ navigation }) {

    const handleStartPress = () => {
        navigation.navigate('flappybirdgame');
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <ImageBackground source={require('../games/flappybird/assets/FlappybirdSprites/background-day.png')}
                style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    alignItems: 'center',
                }}
                imageStyle={{ opacity: 0.8, }} //only to the background
            >
                <Text style={{
                    marginTop: 150,
                    fontSize: 60,
                    padding: 10,
                    color: '#FFCC00',
                    textShadowColor: 'rgba(0, 0, 139, 0.9)',
                    textShadowOffset: { width: -1, height: 1.2 },
                    textShadowRadius: 4,
                }}>Flappy Bird</Text>

                <View style={styles.allButtons}>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleStartPress}
                    >
                        <Text style={styles.buttonTxt}>Start</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('flappybirdLeaderboard')}
                    >
                        <Text style={styles.buttonTxt}>Leaderboard</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('flappybirdSettings', { navigation })}
                    >
                        <Text style={styles.buttonTxt}>Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.buttonTxt}>Exit</Text>
                    </TouchableOpacity>
                </View>
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