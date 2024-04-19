import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";

class Head extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const x = this.props.position[0];
    // const y = this.props.position[1];

    const { size, position, xspeed, yspeed } = this.props;
    const [x, y] = position;

    let imageSource = require('../assets/mato_right.png'); //default img

    // rerender the head based on the direction
    if (xspeed > 0) {
      imageSource = require('../assets/mato_right.png'); //right
    } else if (xspeed < 0) {
      imageSource = require('../assets/mato_left.png'); //left
    } else if (yspeed > 0) {
      imageSource = require('../assets/mato_down.png'); //down
    } else if (yspeed < 0) {
      imageSource = require('../assets/mato_up.png'); //up
    }



    return (
      <View style={[styles.snakeHead, { width: this.props.size, height: this.props.size, left: x * this.props.size, top: y * this.props.size }]}>
        <Image source={imageSource} style={styles.image} />


      </View>
    );
  }
}

const styles = StyleSheet.create({
  snakeHead: {
    // backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
  },
  image: {
    width: 38,
    height: 38,




  }
});

export { Head };