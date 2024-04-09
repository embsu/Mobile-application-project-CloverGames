import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native-paper'
import firebase from '../firebase/Config'
import { firestore, updateProfile, auth, getAuth, signInWithEmailAndPassword, snapshot, collection, getDocs, setDoc, doc, getDoc, createUserWithEmailAndPassword } from '../firebase/Config';

export default function Login() {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    // LOGIN AND REGISTER
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [registerModalVisible, setRegisterModalVisible] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    //ERRORS WHILE LOGIN AND REGISTER
    const [emailRegError, setEmailRegError] = useState(null); // email already in use
    const [passwordRegError, setPasswordRegError] = useState(null); // password too weak
    const [usernameRegError, setUsernameRegError] = useState(null); // username already in use
    const [loginError, setLoginError] = useState(null); // wrong email / password
    const [loginErrorTMR, setLoginErrorTMR] = useState(null); // too many requests
    const [loginErrorUnknown, setLoginErrorUnknown] = useState(null); // unknown error



    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // setLoading(true);
            navigation.navigate('Home');
            console.log("User logged in");
            
            console.log(auth.currentUser.uid);
        }
        catch (error) {
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                console.log("Wrong password or user not found");
                loginError("Wrong password or user not found");
            }
            else if ((error.code === 'auth/too-many-requests')) {
                console.log("Too many requests. Try again later.")
                loginErrorTMR("Too many requests. Try again later.");
            } else {
                console.log("Error: ", error);
                loginErrorUnknown("Unknown error. Try again later.");
            }
        }
    }

    handleRegister = async () => {
        try {
            const usernameAvailable = await checkUsernameAvailability(username);

            if (!usernameAvailable) { // If username is already taken
                console.log("Username is already taken");
                setUsernameRegError("Username is already taken");
                return;
            }

            // Check if the password meets your criteria (e.g., minimum length)
            if (password.length < 6) {
                console.log("Password is too weak");
                setPasswordRegError("Password is too weak");
                return;
            }

            // Create user with email and password to Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Set the username as the displayName // IMPORTANT WHEN FETCHING USERNAME
            await updateProfile(user, { displayName: username });

            // Store the username in the usernames collection
            await storeUsername(username, email, user.uid);
            console.log("KÄYTTÄJÄNIMI TALLENNETTU CLOUDIIN");


            // Signed up succesfully
            console.log("User signed up\nUsername:" + username, '\nEmail:', email)
            registerSuccessModal();

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                console.log("Email is already in use");
                setEmailRegError("Email is already in use");
            } else {
                console.log("Error: ", error);
            }
        }
    }


    const checkUsernameAvailability = async (username) => {
        try {
            console.log("Before getDoc");
            const docSnap = await getDoc(doc(firestore, 'users', username));
            console.log("After getDoc");
            if (docSnap.exists()) {
                console.log("Username is already taken");
                return false;
            } else {
                console.log("Username is available");
                return true;
            }
        } catch (error) {
            console.error('Error checking username availability:', error);
            return false;
        }
    };

    //To store the username in the cloud firestore usernames collection
    const storeUsername = async (username, email, userId) => {
        try {
            // Reference the Firestore document for the username
            const usernameDocRef = doc(firestore, 'users', username);

            // Set username, email, and UID in the document
            await setDoc(usernameDocRef, { username, email, uid: userId });
        } catch (error) {
            console.error('Error storing username:', error);
        }
    };



    // Register modal

    const registerModal = () => {
        console.log("Register");
        setRegisterModalVisible(true);
    }

    const closeRegisterModal = () => {
        setRegisterModalVisible(false);
    }

    const registerSuccessModal = () => {
        console.log("Registration successful");
        setRegistrationSuccess(true);
    }

    const closeRegisterSuccessModal = () => {
        setRegistrationSuccess(false);
    }

    return (

        <View style={styles.container}>

            <TextInput
                style={styles.inputField}
                label="Email"
                onChangeText={setEmail}
                value={email}
                keyboardType='email-address'

            />
            <TextInput
                style={styles.inputField}
                label="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}

            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text>Don't you have a user yet? Register now!</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={registerModal}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <Modal
                animationType='slide'
                transparent={true}
                visible={registerModalVisible}
                onRequestClose={closeRegisterModal}
            >

                <View style={styles.modalView}>
                    <Text style={styles.regTxt}>Register</Text>

                    {/* Display error message */}
                    {emailRegError && <Text style={styles.errorText}>{emailRegError}</Text>}
                    <TextInput
                        label="Email"
                        style={styles.inputField}
                        onChangeText={setEmail}
                        value={email}
                        keyboardType='email-address'
                    />

                    {/* Display error message */}
                    {usernameRegError && <Text style={styles.errorText}>{usernameRegError}</Text>}
                    <TextInput
                        label="Username"
                        style={styles.inputField}
                        onChangeText={setUsername}
                        value={username}

                    />

                    {/* Display error message */}
                    {passwordRegError && <Text style={styles.errorText}>{passwordRegError}</Text>}
                    <TextInput
                        label="Password"
                        style={styles.inputField}
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleRegister}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={closeRegisterModal}
                    >
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Display registration success message */}
            <Modal
                animationType='slide'
                transparent={false}
                visible={registrationSuccess}
                onRequestClose={closeRegisterSuccessModal}
            >
                <View style={styles.modalView}>
                    <Text style={styles.successText}>Registration successful</Text>
                    <Text style={styles.successText}>You can now log in!</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={closeRegisterSuccessModal}
                    >
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>





        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputField: {
        width: '80%',
        margin: 10
    },
    button: {
        backgroundColor: 'pink',
        padding: 10,
        margin: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },

    modalView: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
        justifyContent: 'center'

    },
    regTxt: {
        fontSize: 30,
        marginBottom: 10
    },
    errorText: {
        color: 'red'
    },
    successText: {
        color: 'green',
        marginBottom: 10,
    }


})