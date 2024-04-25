import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const CustomAlert = ({ isVisible, message, points, onClose, reset }) => {
  return (
    <Modal isVisible={isVisible} animationIn="slideInUp" animationOut="slideOutDown">
      <View style={styles.alertContainer}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.pointsText}>Points: {points}</Text>
        <View style={styles.modalButtonContainer}>
          <TouchableOpacity onPress={reset} style={styles.modalBtns}>
            <Text style={{ color: '#80ff00', fontFamily: 'comfortaa-variable', backgroundColor: 'black' }}>Restart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.modalBtns}>
            <Text style={{ color: '#80ff00', fontFamily: 'comfortaa-variable', backgroundColor: 'black' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: '#161616',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  message: {
    fontSize: 20,
    marginBottom: 10,
    color: '#80ff00',
    fontFamily: 'comfortaa-variable',
  },
  pointsText: {
    fontSize: 32,
    marginTop: 10,
    marginBottom: 20,
    color: '#80ff00',
    fontFamily: 'comfortaa-variable',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40,
  },
  modalBtns: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    margin: 10,
  },
});

export default CustomAlert;