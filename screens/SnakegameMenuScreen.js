import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import React, { useCallback, useState } from 'react'
import { IconButton } from 'react-native-paper';

import MusicPlayer from '../games/snakegame/components/MusicPlayer';


export default function SnakegameMenuScreen({ navigation }) {

    const [musicPlaying, setMusicPlaying] = useState(true);

    const handleStartPress = () => {
        navigation.navigate('actualgame');
    };

    const toggleMusic = () => {
        
        setMusicPlaying(!musicPlaying);
        console.log("Music playing: ", musicPlaying);


    }


    return (


        <View style={styles.container}>
            <StatusBar hidden={true} />
            <ImageBackground source={require('../games/snakegame/assets/mato2.jpg')}
                style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    // justifyContent: 'center',
                    alignItems: 'center',

                }}
                imageStyle={{ opacity: 0.4, }} //only to the background
            >

                <Text style={{
                    fontFamily: 'pacifico-regular',
                    fontSize: 40,
                    padding: 10,
                    color: '#EA8282',
                    textShadowColor: 'rgba(0, 0, 0, 0.9)',
                    textShadowOffset: { width: -1, height: 1.2 },
                    textShadowRadius: 4,

                }}>Snake Game</Text>

                <View style={styles.allButtons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleStartPress}
                    >
                        <Text style={styles.buttonTxt}>Start</Text>
                    </TouchableOpacity>
                    {/* <MusicPlayer source={require('../games/snakegame/assets/music/background.mp3')}/> */}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('SnakegameLeaderboard')}
                    >
                        <Text style={styles.buttonTxt}>Leaderboard</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.buttonTxt}>Exit</Text>
                    </TouchableOpacity>

                    <IconButton icon={musicPlaying ? "music" : "music-off"} 
                    iconColor="#EA8282" size={45} onPress={toggleMusic} />

                    {/* <MusicPlayer source={require('../games/snakegame/assets/music/background.mp3')} 
                    musicPlaying={musicPlaying} /> */}


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
        backgroundColor: '#F7C0D2',
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
        borderColor: '#EA8282',
        borderWidth: 2,
        borderStyle: 'dashed',
        position: 'absolute',
        bottom: 160,
    },
    button: {
        width: 200,
        height: 70,
        backgroundColor: '#EA8282',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#EC5E5E',
        borderWidth: 1,
        margin: 10,
    },
    buttonTxt: {
        color: 'white',
        fontFamily: 'comfortaa-variable',
        fontSize: 20,
    }
})