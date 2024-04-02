import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import Constants from './Constants';

class Tail extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        let tailList = this.props.elements.map((el, idx) => {
            return <View
                key={idx}
                style={{
                    width: this.props.size, height: this.props.size, position: 'absolute', left: el[0] * this.props.size, top: el[1] * this.props.size,
                    backgroundColor: 'blue' 
                }} >
                <Image source={require('../assets/snakebody.png')}
                    style={styles.image} />
            </View>

        });

        return (
            <View
              style={{
                width: Constants.GRID_SIZE * this.props.size,
                height: Constants.GRID_SIZE * this.props.size,
              }}>
              {tailList}
            </View>
          );
    }
}

const styles = StyleSheet.create({

    image: {
        width: 25,
        height: 25,
        

    }
});

export { Tail };