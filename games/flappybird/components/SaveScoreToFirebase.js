import { auth, firestore, collection} from '../../../firebase/Config';
import { addDoc } from 'firebase/firestore';

export const SaveScoreToFirebase = async (score, difficulty ) => {
    console.log('Saving score to Firestore:', score, difficulty);
    try {
        // Get the currently logged-in user
        const currentUser = auth.currentUser;
        if (currentUser) {
            try {
                // Query the scores collection to get the highest score
                const scoresCollection = collection(firestore, 'leaderboard_flappybird'); 

            // Add a new document with the user's score
            await addDoc(scoresCollection, {
                userId: currentUser.uid,
                username: currentUser.displayName,
                score: score,
                difficulty: difficulty,
            });
        }
        catch (error) {
            console.error('Error saving score to Firestore:', error);
        }
    }
    } catch (error) {
        console.error('Error saving score to Firestore:', error);
    }
};