
import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
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
  overlay: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  image: {
    width: "100%",
    height: "100%",
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
          children={this.renderOverlay()}
          onBarCodeRead={this.onScan.bind(this)}
        />
      </View>
    );
  }

  renderOverlay = () => {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={require("./assets/overlay.png")}
        />
      </View>
    )
  }

  onScan = ({ data }) => {
    if (this.scanned) return;

    this.scanned = true;
    setInterval(() => this.scanned = false, 3000);

    requestAnimationFrame(() => this.props.loadScanData(data));

    try {
      const d = JSON.parse(data);
      if (d.hash) {
        this.props.navigation.navigate("ID");
      } else {
        this.props.navigation.goBack();
      }
    } catch {
      this.props.navigation.goBack();
    }
  }
}

const actions = (dispatch) => ({
  loadScanData: (data) => dispatch({ type: "LOAD_SCAN_DATA", payload: data }),
})

export default connect(null, actions)(ScannerScreen);