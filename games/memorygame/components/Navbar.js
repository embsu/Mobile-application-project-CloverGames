import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function Navbar({ points, attempts }) {
    const navigation = useNavigation();

    const backOnPress = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.topbar}>
            <MaterialIcon name="arrow-back" size={40} color="#7cff00" onPress={backOnPress} />    
            <Text style={styles.txtStyle}>Attempts: {attempts}</Text>   
        </View>
    );
}
//<Text style={styles.txtStyle}>Pisteet: {points}</Text>
//<Image source={require('../assets/Image1.png')} style={{ width: 55, height: 55 }} />

const styles = StyleSheet.create({
    topbar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000000',
        padding: 10,
        marginTop: 100,
    },
    txtStyle: {
        fontFamily: 'comfortaa-variable',
        fontSize: 24,
        color: '#80ff00',
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
        backgroundColor: '#000000',
        borderRadius: 16,
    },
});
