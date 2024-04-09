import { signOut, auth } from './Config';

export const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Successfully signed out');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error; // Rethrow the error for handling elsewhere if needed
    }
  };

