import React, { Component } from "react";
import { AppRegistry, StyleSheet, StatusBar, View, Alert, Button, BackHandler, TouchableOpacity, Text, TouchableHighlight } from "react-native";
import { GameEngine, dispatch } from 'react-native-game-engine'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'

import { useFonts } from 'expo-font';
import { Font } from 'expo-font';
import { loadAsync } from 'expo-font';
import Modal from 'react-native-modal';

import CustomAlert from './components/CustomAlertScore'
import Constants from './components/Constants'
import { GameLoop } from './systems'
import { Head } from './components/Head'
import { Food } from './components/Food'
import { Tail } from './components/Tail'
import Navbar from './components/Navbar'
import { Icon, IconButton } from "react-native-paper";



export default class Snake extends Component {

    // props parameter represents the properties passed to the Snake component(class)
    constructor(props) {
        // super() is used to call the constructor of the parent class (Component)
        super(props);

        // this. is used to access the properties of the class (Snake)
        this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
        this.engine = null;
        this.state = {
            running: true,
            score: 0,
            visible: false,
            onFocused: true,
            name: '',
        }
    }

    async componentDidMount() {
        await loadAsync({
            'Pacifico': require('./assets/fonts/Pacifico-Regular.ttf'),
            'Comfortaa': require('./assets/fonts/Comfortaa-VariableFont_wght.ttf'),
        });
        this.setState({ fontsLoaded: true });
    }

    // the food is placed in a random position on the grid
    randomBetween = (min, max) => {

        // Math.floor() returns the largest integer less than or equal to a given number
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


    handleAlertClose = () => {
        this.setState({ showAlert: false });
    };
    // the onEvent function is called when the game is over
    onEvent = (e) => {
        const { score } = this.state;
        if (e.type === 'game-over') {
            this.setState({
                running: false,
                showAlert: true,
            });

        } else if (e.type === 'score+') {
            var s = score + 1;
            this.setState({
                score: s,
            });
        }
    }

    // when game IS over, the reset function is called
    reset = () => {
        this.engine.swap({
            head: {
                position: [0, 0],
                xspeed: 1,
                yspeed: 0,
                nextMove: 10,
                updateFrequency: 10,
                size: 20,
                renderer: <Head />,
            },
            food: {
                position: [
                    this.randomBetween(0, Constants.GRID_SIZE - 1),
                    this.randomBetween(0, Constants.GRID_SIZE - 1),
                ],
                size: 20,
                renderer: <Food />,
            },
            tail: { size: 20, elements: [], renderer: <Tail /> },
        });
        this.setState({
            running: true,
            score: 0,
        });
        this.handleAlertClose(); // Close the alert after resetting the game
    };
    handleFocuse = () => {
        this.setState({ onFocused: true });
    };
    handleBlur = () => {
        this.setState({ onFocused: false });
    };

    render() {
        const { fontsLoaded, score, showAlert } = this.state;

        const message = "Game Over" + "\n" + "Your Score: " + score;

        if (!fontsLoaded) {
            return null; // Render nothing until fonts are loaded
        }

        return (

            <View style={styles.container}>
                {/* Render the custom alert component only when the showAlert state is true */}
                <CustomAlert
                    isVisible={showAlert}
                    message={message}
                    onClose={this.handleAlertClose}
                    reset={this.reset}
                />
                <Navbar score={score} reset={this.reset} />

                {/* <View style={styles.topbar} >

                    <MaterialIcon name="arrow-back" size={40} color="#EC5E5E"
                    // onPress={() => this.props.navigation.navigate('snakegame')}
                    />
                    <Text
                        style={
                            {
                                fontFamily: 'Comfortaa',
                                fontSize: 20,
                                padding: 10,
                                color: '#EA8282',
                                textShadowColor: 'rgba(0, 0, 0, 0.9)',
                                textShadowOffset: { width: 0, height: 1 },
                                textShadowRadius: 4,



                            }}>Score: {score}</Text>

                    <IonIcon name="settings-sharp" size={30} color="#EC5E5E" />

                </View> */}
                <GameEngine
                    ref={(ref) => { this.engine = ref; }}
                    style={{
                        width: this.boardSize,
                        height: this.boardSize,
                        flex: null,
                        backgroundColor: '#F0CACA',
                        borderRadius: 4,
                        borderColor: 'black',
                        borderWidth: 1,
                        marginTop: 20,

                    }}

                    systems={[GameLoop]}
                    entities={{
                        head: {
                            position: [0, 0],
                            xspeed: 1,
                            yspeed: 0,
                            nextMove: 10,
                            updateFrequency: 10,
                            size: 20,
                            renderer: <Head />,
                        },
                        food: {
                            position: [
                                this.randomBetween(0, Constants.GRID_SIZE - 1),
                                this.randomBetween(0, Constants.GRID_SIZE - 1),
                            ],
                            size: 20,
                            renderer: <Food />,
                        },
                        tail: { size: 20, elements: [], renderer: <Tail /> },
                    }}
                    running={this.state.running}
                    onEvent={this.onEvent}>

                    <StatusBar hidden={true} />
                </GameEngine>

              
                
                
                {/* <Button title="New Game" onPress={this.reset} /> */}

                {/* <IconButton 
                icon="restart" 
                color="white" 
                size={30}
                style={{backgroundColor: 'black', borderRadius: 10}}

                    onPress={this.reset}
                /> */}


                <View style={styles.controls}>

                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-up" }) }}>
                            <View style={styles.controlBtn}>
                                <MaterialIcon name="keyboard-arrow-up" size={50} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-left" }) }}>
                            <View style={styles.controlBtn} >
                                <MaterialIcon name="keyboard-arrow-left" size={50} color="black" />
                            </View>
                        </TouchableOpacity>

                        {/* one invisible button in between */}
                        <View style={[styles.controlBtn, { backgroundColor: null, width: 80, height: 80 }]} />
                        {/* end */}

                        <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-right" }) }}>
                            <View style={styles.controlBtn} >
                                <MaterialIcon name="keyboard-arrow-right" size={50} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-down" }) }}>
                            <View style={styles.controlBtn} >
                                <MaterialIcon name="keyboard-arrow-down" size={50} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3d3433',
        alignItems: 'center',
        justifyContent: 'center'
    },

    alertContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        marginBottom: 20,
    },
    // topbar: {
    //     width: '100%',
    //     height: 60,
    //     backgroundColor: 'rgba(0, 0, 0, 0.4)',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',

    //     paddingLeft: 10,
    //     paddingRight: 10,

    // },
    controls: {
        width: '90%',
        height: 260,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        borderRadius: 20,
    },
    controlRow: {

        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // backgroundColor: 'gray'
    },
    controlBtn: {
        width: 80,
        height: 80,
        backgroundColor: '#EA8282',
        // borderColor: '#EC5E5E',
        // borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

AppRegistry.registerComponent('Snake', () => Snake) //?
