import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { IconButton } from 'react-native-paper'

export default function Navbar(props) {

    const navigation = useNavigation();
    const { score } = props; // Destructure the props object to get the score
    const { reset } = props; // Destructure the props object to get the reset functio

    const backOnPress = () => {
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
            <Image source={require('../assets/snakeiconnav.png')}
                style={{ width: 55, height: 55 }}
            
            />
        </View>
    )
}

const styles = StyleSheet.create({
    topbar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000000',
        padding: 10,

    },
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
})