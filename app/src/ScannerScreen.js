
import React, { Component } from "react";
import { View } from "react-native";
import { RNCamera } from 'react-native-camera';
import { connect } from "react-redux";

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
};

class ScannerScreen extends Component {

  scanned = false;

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onBarCodeRead={this.onScan.bind(this)}
        />
      </View>
    );
  }

  onScan = ({ data }) => {
    if (this.scanned) return;

    this.scanned = true;
    setInterval(() => this.scanned = false, 3000);

    requestAnimationFrame(() => this.props.addKey(data));
    this.props.navigation.goBack();
  }
}

const actions = (dispatch) => ({
  addKey: (key) => dispatch({ type: "ADD_KEY", payload: key }),
})

export default connect(null, actions)(ScannerScreen);