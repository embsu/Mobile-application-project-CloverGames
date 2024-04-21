import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { set } from 'firebase/database';

const FlappybirdGameoverScreen = ({ score}) => {

    const [restartPressed, setRestartPressed] = useState(false);

    const navigation = useNavigation();

   const handleRestart = () => {
        console.log('Restarting game from game over screen');
        navigation.navigate('flappybirdgame', { restartPressed: true});

    }
  

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Game Over</Text>
            <Text style={styles.score}>Score: {score}</Text>
            <Button title="Restart" onPress={handleRestart} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    score: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default FlappybirdGameoverScreen;
