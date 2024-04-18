import React, { useState } from 'react';
import { View, Text, TouchableOpacity,StyleSheet, StatusBar, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function DifficultyComponent({ navigation }) {

        const [selectedDifficulty, setSelectedDifficulty] = useState('');
    
        const handleDifficultySelection = (difficulty) => {
          setSelectedDifficulty(difficulty)
        saveDifficultyToStorage(difficulty)

          console.log("Difficulty selected: ", difficulty)
          
            // Navigate to the game screen with the selected difficulty

            // Ei navigoida ihan vielä!
            //navigation.navigate('flappybirdgame', {difficulty:difficulty});
        }

        const saveDifficultyToStorage = async (difficulty) => {
            try {
                await AsyncStorage.setItem('difficulty', difficulty)
                console.log("Difficulty saved to storage: ", difficulty)
            } catch (e) {
                console.log("Error saving difficulty to storage: ", e)
            }
            }

    return(
        <View>
        <Text style={styles.title}>Select difficulty:</Text>
        <TouchableOpacity
          style={[styles.button, selectedDifficulty === 'Easy' && styles.selectedButton]}
          onPress={() => handleDifficultySelection('Easy')}>
          <Text style={styles.buttonText}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedDifficulty === 'Medium' && styles.selectedButton]}
          onPress={() => handleDifficultySelection('Medium')}>
          <Text style={styles.buttonText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedDifficulty === 'Hard' && styles.selectedButton]}
          onPress={() => handleDifficultySelection('Hard')}>
          <Text style={styles.buttonText}>Hard</Text>
        </TouchableOpacity>
       
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
        marginBottom: 30,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
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
