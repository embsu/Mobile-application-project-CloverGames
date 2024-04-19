import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import RNPickerSelect from 'react-native-picker-select';  
import React, { useState, useEffect } from 'react'
import { auth, firestore, collection, getDocs } from '../firebase/Config';
import { orderBy, query, limit, where } from 'firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Minesweeper leaderboard component
export default function MinesweeperLeaderboard() {

  const [highestScore, setHighestScore] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy'); // Default difficulty is easy

  // Fetch the highest personal score and global leaderboard
  useEffect(() => { 
    fetchHighestScore(selectedDifficulty).then(score => {
      setHighestScore(score);
    });
    fetchGlobalLeaderboard(selectedDifficulty).then(leaderboardData => {
      setLeaderboard(leaderboardData);
    });
  }, [selectedDifficulty]);

  // Function to fetch the highest score from Firestore
  const fetchHighestScore = async (difficulty) => {
    try {
      const currentUser = auth.currentUser;
      // Query the scores collection to get the highest score and choosed difficulty for the current user
      const scoresQuery = query(
        collection(firestore, 'leaderboard_minesweeper'),
        where('userId', '==', currentUser.uid), // Filter by current user ID
        where('difficulty', '==', difficulty), // Filter by selected difficulty
        orderBy('score', 'asc'), // Order by score in ascending order
        limit(1) // Limit to 1 document
      );

      // Get the query snapshot and check if it's empty or not
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

  // Function to fetch the global leaderboard from Firestore
  const fetchGlobalLeaderboard = async (difficulty) => {
    try {
      // Query the scores collection to get the top 6 scores from different users
      const scoresQuery = query(
        collection(firestore, 'leaderboard_minesweeper'),
        where('difficulty', '==', difficulty), // Filter by selected difficulty
        orderBy('score', 'asc'), // Order by score in ascending order
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
      return leaderboard;
    } catch (error) {
      console.error('Error fetching global leaderboard:', error);
      return null;
    }
  }

  return (
    <ScrollView style= {{backgroundColor: 'black',}} >
    <View style={styles.container}>
      <View style={styles.yourHSContainer}>
        <MaterialCommunityIcons name="trophy" color="gold" size={50} />
        <Text style={styles.yourHS}>Select difficulty:</Text>
  <RNPickerSelect
      style={{ inputAndroid: { color: 'white' }, inputIOS: { color: 'white' } }}
      placeholder={{ label: 'Select difficulty', value: 'easy', }}
      onValueChange={(value) => setSelectedDifficulty(value)}
      items={[
        { label: 'Easy', value: 'easy', color: 'black'},
        { label: 'Medium', value: 'medium', color: 'black'},
        { label: 'Hard', value: 'hard', color: 'black'},
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
    </View>
    </ScrollView>
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
    marginTop: 10,
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
  dropdown: {
    height: 50,
    width: 180,
    marginBottom: 10,
    color: 'white',
    borderColor: 'white',
    fontFamily: 'comfortaa-variable',
    fontSize: 20,
  },
  dropdownText: {
    color: 'black',
    fontFamily: 'comfortaa-variable',
    fontSize: 20,
  },
});