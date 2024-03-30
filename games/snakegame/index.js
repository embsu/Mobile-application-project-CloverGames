import React, { Component } from "react";
import { AppRegistry, StyleSheet, StatusBar, View, Alert, Button, TouchableOpacity, } from "react-native";
import { GameEngine, dispatch } from 'react-native-game-engine'
import Icon from 'react-native-vector-icons'

import Constants from './components/Constants'
import { GameLoop } from './systems'
import { Head } from './components/Head'
import { Food } from './components/Food'
import { Tail } from './components/Tail'



export default class Snake extends Component { 
    
    // props parameter represents the properties passed to the Snake component(class)
    constructor(props) {
        // super() is used to call the constructor of the parent class (Component)
        super(props);

        // this. is used to access the properties of the class (Snake)
        this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
        this.engine = null;
        this.state = {
            running: true
        }
    }

    // the food is placed in a random position on the grid
    randomBetween = (min, max) => {

        // Math.floor() returns the largest integer less than or equal to a given number
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // the onEvent function is called when the game is over
    // onEvent = (e) => {
    //     if (e.type === "game-over"){
    //         this.setState({
    //             running: false
    //         });
    //         Alert.alert("Game Over");
    //     }
    // }


    // when game IS over, the reset function is called
    reset = () => {
        this.engine.swap({
            head: { position: [0,  0], xspeed: 1, yspeed: 0, nextMove: 10, updateFrequency: 10, size: 20, renderer: <Head />},
            food: { position: [this.randomBetween(0, Constants.GRID_SIZE - 1), this.randomBetween(0, Constants.GRID_SIZE - 1)], size: 20, renderer: <Food />},
            tail: { size: 20, elements: [], renderer: <Tail /> }
        });
        this.setState({
            running: true
        });
    }

    render() {
        

        return (

            <View style={styles.container}>
                <GameEngine
                    ref={(ref) => { this.engine = ref; }}
                    style={{ 
                        width: this.boardSize, 
                        height: this.boardSize, 
                        flex: null, 
                        backgroundColor: 'transparent', 
                        borderRadius: 5, 
                        borderColor: 'black', 
                        borderWidth: 2,
                        margin: 10}}

                    systems = {[ GameLoop ]} // ?
                    entities={{
                        head: { position: [0,  0], xspeed: 1, yspeed: 0, nextMove: 10, updateFrequency: 10, size: 20, renderer: <Head />},
                        food: { position: [this.randomBetween(0, Constants.GRID_SIZE - 1), this.randomBetween(0, Constants.GRID_SIZE - 1)], size: 20, renderer: <Food />},
                        tail: { size: 20, elements: [], renderer: <Tail /> }
                    }}
                    running={this.state.running}
                    onEvent={this.onEvent}>

                    <StatusBar hidden={true} />
                </GameEngine>

                <Button title="New Game" onPress={this.reset} />


                <View style={styles.controls}>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-up" })} }>
                            <View style={styles.control} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-left" })} }>
                            <View style={styles.control} />
                        </TouchableOpacity>
                        <View style={[styles.control, { backgroundColor: null}]} />
                        <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-right" })}}>
                            <View style={styles.control} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-down" })} }>
                            <View style={styles.control} />
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
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center'
    },
    controls: {
        width: 280,
        height: 280,
        flexDirection: 'column',
    },
    controlRow: {
        height: 100,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    control: {
        width: 100,
        height: 100,
        backgroundColor: 'lightblue'
    }
});

AppRegistry.registerComponent('Snake', () => Snake) //?
