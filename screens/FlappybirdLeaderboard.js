import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, firestore, collection, getDocs } from '../firebase/Config';
import { orderBy, query, limit, where } from 'firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native'

export default function FlappybirdLeaderboard() {
  const navigation = useNavigation();
  const [highestScore, setHighestScore] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('Easy'); // Default difficulty is easy

  useEffect(() => {
    fetchHighestScore(selectedDifficulty).then(score => {
      setHighestScore(score);
    });
    fetchGlobalLeaderboard(selectedDifficulty).then(leaderboardData => {
      setLeaderboard(leaderboardData);
    });
  }, [selectedDifficulty]);

  const fetchHighestScore = async (difficulty) => {
    try {
      const currentUser = auth.currentUser;
      // Query the scores collection to get the highest score from current user
      const scoresQuery = query(
        collection(firestore, 'leaderboard_flappybird'),
        where('userId', '==', currentUser.uid), // Filter by current user ID
        where('difficulty', '==', difficulty), // Filter by selected difficulty
        orderBy('score', 'desc'), // Order by score in ascending order
        limit(1) // Limit to 1 document
      );
      const querySnapshot = await getDocs(scoresQuery);
      if (!querySnapshot.empty) {
        // Get the highest score from the first document
        const highestScoreData = querySnapshot.docs[0].data();
        console.log('Highest score from:', currentUser.displayName, 'is', highestScoreData.score);
        return highestScoreData.score;
      } else {
        // No scores found
        return null;
      }
    } catch (error) {
      console.error('Error fetching highest score:', error);
      return null;
    }
  };

  const fetchGlobalLeaderboard = async (difficulty) => {
    try {
      // Query the scores collection to get the top 10 scores from different users
      const scoresQuery = query(
        collection(firestore, 'leaderboard_flappybird'),
        where('difficulty', '==', difficulty), // Filter by selected difficulty
        orderBy('score', 'desc'), // Order by score in ascending order
        limit(10) // Limit to 10 documents
      );
      const querySnapshot = await getDocs(scoresQuery);
      const leaderboard = querySnapshot.docs.map(doc => {
        return {
          username: doc.data().username,
          score: doc.data().score,
          difficulty: doc.data().difficulty
        };
      });
      console.log('Global leaderboard:', leaderboard);
      return leaderboard;
    } catch (error) {
      console.error('Error fetching global leaderboard:', error);
      return null;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.yourHSContainer}>
        <MaterialCommunityIcons name="trophy" color="gold" size={50} />
        <Text style={styles.yourHS}>Select difficulty:</Text>
        <RNPickerSelect
          style={{ inputAndroid: { color: 'white' }, inputIOS: { color: 'white' }, textalign: 'center' }}
          placeholder={{ label: 'Select difficulty', value: 'Easy', }}
          onValueChange={(value) => setSelectedDifficulty(value)}
          items={[
            { label: 'Easy', value: 'Easy', color: 'green' },
            { label: 'Medium', value: 'Medium', color: 'orange' },
            { label: 'Hard', value: 'Hard', color: 'red' },
          ]}
        />
        <Text style={styles.yourHS}>Your highscore:</Text>
        <Text style={styles.yourHS}>{highestScore}</Text>
      </View>

      <View style={styles.globalLeadersContainer}>
        <Text style={styles.yourHS}>Global leaderboard:</Text>

        {leaderboard ? (
          leaderboard.map((entry, index) => (
            <View key={index} style={styles.leaderboardEntry}>
              <Text style={styles.LBusername}>{entry.username}</Text>
              <Text style={styles.LBscore}>{entry.score}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.LBusername}>Loading...</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('flappybird')}
      >
        <Text style={styles.buttonTxt}>Exit</Text>
      </TouchableOpacity>
   
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  yourHS: {
    fontSize: 30,
    fontFamily: 'comfortaa-variable',
    color: 'white',
  },
  yourHSContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  globalLeadersContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  leaderboardEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    margin: 10,
  },
  LBusername: {
    fontSize: 20,
    color: 'white',
  },
  LBscore: {
    fontSize: 20,
    color: 'white',
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

});