import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { IconButton } from 'react-native-paper'
import { MusicPlayer } from './MusicPlayer'
import { useState } from 'react'





export default function Navbar(props) {

    const { score } = props; // Destructure the props object to get the score
    const { reset } = props; // Destructure the props object to get the reset function

    const [muteMusic, setMuteMusic] = useState(false);

    const navigation = useNavigation();

    const backOnPress = () => {
        // setMuteMusic(true); // Mute the music when navigating back
        navigation.navigate('snakegame');

    }

    return (
        <View style={styles.topbar} >

            <MaterialIcon name="arrow-back" size={30} color="#EC5E5E"
                onPress={backOnPress}
            />
         

            <Text
                style={styles.txtStyle}>Score: {score}</Text>

            <IconButton
                icon="restart"
                iconColor="#EC5E5E"
                size={30}


                onPress={reset}
            />

            <IonIcon name="settings-sharp" size={30} color="#EC5E5E"
                onPress={() => navigation.navigate('snakeSettings')}
            />

        </View>
    )
}

const styles = StyleSheet.create({

    txtStyle: {
        fontFamily: 'comfortaa-variable',
        fontSize: 20,
        padding: 10,
        color: '#EA8282',
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
        backgroundColor: '#000000',
        borderRadius: 16,
    
    },

    topbar: {
        width: '100%',
        height: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingLeft: 10,
        paddingRight: 10,

    },

})