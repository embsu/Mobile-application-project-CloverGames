import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firestore, collection, getDocs } from '../firebase/Config';
import { orderBy, query, limit } from 'firebase/firestore';

export default function SnakegameLeaderboard() {

  const [highestScore, setHighestScore] = useState(null); 

  useEffect(() => {
    fetchHighestScore().then(score => {
        setHighestScore(score);
    });
}, []);
  

  const fetchHighestScore = async () => {
    try {
        // Query the scores collection to get the highest score
        const scoresQuery = query(
            collection(firestore, 'leaderboard_snakegame'),
            orderBy('score', 'desc'), // Order by score in descending order
            limit(1) // Limit to 1 document
        );

        const querySnapshot = await getDocs(scoresQuery);
        if (!querySnapshot.empty) {
            // Get the highest score from the first document
            const highestScoreData = querySnapshot.docs[0].data();
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

  return (
    <View style={styles.container}>
      <Text style={styles.yourHS}>Your high score:</Text>
      <Text style={styles.yourHS}>{highestScore}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  yourHS: {
    fontSize: 30,
    fontFamily: 'comfortaa-variable',
    color: 'white',
  },
})