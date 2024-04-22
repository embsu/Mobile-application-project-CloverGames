import React, { Component } from "react";
import { AppRegistry, StyleSheet, StatusBar, View, Alert, Button, BackHandler, TouchableOpacity, Text, TouchableHighlight } from "react-native";
import { GameEngine, dispatch } from 'react-native-game-engine'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import CustomAlert from './components/CustomAlertScore'
import Constants from './components/Constants'
import { GameLoop } from './systems'
import { Head } from './components/Head'
import { Food } from './components/Food'
import { Tail } from './components/Tail'
import Navbar from './components/Navbar'
import { saveScoreToFirebase } from './components/ScoreToFirebase'

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

            // Save the score to Firebase
            saveScoreToFirebase(score);

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
        const { score, showAlert } = this.state;

        const message = "Game Over" + "\n" + "Your Score: " + score;


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

                <View style={styles.gameEngineAndControls}>
                    <GameEngine
                        ref={(ref) => { this.engine = ref; }}
                        style={{
                            width: this.boardSize,
                            height: this.boardSize,
                            flex: null,
                            backgroundColor: '#bda8a8',
                            borderRadius: 4,
                            borderColor: 'black',
                            borderWidth: 2,
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

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3d3433',
        alignItems: 'center',
    },
    
    message: {
        fontSize: 18,
        marginBottom: 20,
    },

    gameEngineAndControls: {
        alignItems: 'center',
        
    },
    controls: {
        width: 280,
        height: 260,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,

    },
    controlRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    controlBtn: {
        width: 80,
        height: 80,
        backgroundColor: '#EA8282',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

AppRegistry.registerComponent('Snake', () => Snake) //?
