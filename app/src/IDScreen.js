
import React, { Component } from "react";
import { View } from "react-native";
import QRCode from 'react-native-qrcode';
import { ethereumHandle } from "./config";

const Web3 = require('web3');

export default class IDScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { qr: "" };
  }

  async componentDidMount() {
    const web3 = new Web3(ethereumHandle);

    const block = await web3.eth.getBlock('latest');

    const { hash } = block;

    const account = web3.eth.accounts.privateKeyToAccount(this.privateKey);

    const sig = account.sign(hash);

    this.setState({
      qr: JSON.stringify({
        signature: sig.signature,
        hash,
      }),
    })
  }

  render() {
    return (
      <View>
        <QRCode
          value={this.state.qr}
          size={200}
        />
      </View>
    );
  }
}