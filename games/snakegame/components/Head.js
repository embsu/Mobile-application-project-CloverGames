import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";

class Head extends Component {
    constructor(props){
        super(props);
    }

    render() {
        // const x = this.props.position[0];
        // const y = this.props.position[1];

        const { size, position, xspeed, yspeed } = this.props;
        const [x, y] = position;
    
        let imageSource = require('../assets/snakehead_right.png'); // Oletuskuva

         // Päivitä kuvan lähde matokäärmeen liikkumisen suunnan mukaan
    if (xspeed > 0) {
        imageSource = require('../assets/snakehead_right.png'); // Oikea
      } else if (xspeed < 0) {
        imageSource = require('../assets/snakehead_left.png'); // Vasen
      } else if (yspeed > 0) {
        imageSource = require('../assets/snakehead_down.png'); // Alas
      } else if (yspeed < 0) {
        imageSource = require('../assets/snakehead_up.png'); // Ylös
      }



        return (
            <View style={[styles.finger, { width: this.props.size, height: this.props.size, left: x * this.props.size, top: y * this.props.size }]}>
            <Image source={imageSource} style={styles.image} /> 
            
            
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    finger: {
        backgroundColor: '#888888',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 38,
        height: 38,
        // zIndex: 10,
       
    }
});

export { Head };