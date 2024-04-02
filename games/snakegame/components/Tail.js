import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import Constants from './Constants';

class Tail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let tailList = this.props.elements.map((el, idx) => {
            const [x, y] = el;
            const tailStyle = {
                width: this.props.size,
                height: this.props.size,
                position: "absolute",
                left: x * this.props.size,
                top: y * this.props.size,
                // backgroundColor: "blue",
                justifyContent: 'center',
                alignItems: 'center',
            };
            return (
                <View key={idx} style={tailStyle}>
                    <Image
                        source={require("../assets/snakebody.png")}
                        style={styles.image}
                    />
                </View>
            );
        });

        return (
            <View
                style={{
                    width: Constants.GRID_SIZE * this.props.size,
                    height: Constants.GRID_SIZE * this.props.size,
                    position: "absolute",
                    left: 0,
                    top: 0,
                }}
            >
                {tailList}
            </View>
        );
    }
}

const styles = StyleSheet.create({

    // snakeTail: {
    //     backgroundColor: 'blue',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     position: 'absolute',
    // },

    image: {
        width: 30,
        height: 30,



    },
});

export { Tail };