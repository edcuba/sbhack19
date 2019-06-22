
import React, { Component } from "react";
import { View } from "react-native";
import QRCode from 'react-native-qrcode';

export default class IDScreen extends Component {

  render() {
    return (
      <View>
        <QRCode
          value="0x123456789"
          size={200}
        />
      </View>
    );
  }
}