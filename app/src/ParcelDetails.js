import React, { Component } from "react";
import { View, Text, Button, ActivityIndicator, Dimensions } from "react-native";
import QRCode from 'react-native-qrcode';
import { httpProvider } from "./config";
const Web3 = require('web3');


const styles = {
  root: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    padding: 8,
    margin: 8,
    borderRadius: 10,
    flex: 1,
    justifyContent: "space-between",
  },
};

class ParcelDetails extends Component {
  constructor(props) {
    super(props);
    this.privateKey = props.navigation.getParam("privateKey");
    this.trackingId = props.navigation.getParam("trackingId");
    this.currentOwner = props.navigation.getParam("currentOwner");
    this.state = { qr: null, loading: false };
  }

  render() {

    const qr = this.state.qr ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <QRCode
          value={this.state.qr}
          size={Dimensions.get("screen").width * 0.8}
        />
      </View>
    ) : null;

    return (
      <View style={styles.root}>
        <Text>
          {this.privateKey}
        </Text>
        <Text>
          Current holder: {this.currentOwner}
        </Text>
        <Text>
          ID: {this.trackingId}
        </Text>
        {qr}
        {this.state.loading ? <ActivityIndicator /> : null}
        <Button title="Retrieve" onPress={this.retrieve} />
      </View>
    );
  }

  retrieve = async () => {

    this.setState({ loading: true, qr: null });

    const block = await httpProvider.getBlock('latest');
    const { hash } = block;

    const web3 = new Web3();
    const account = web3.eth.accounts.privateKeyToAccount(this.privateKey);

    const sig = account.sign(hash);

    this.setState({
      loading: false,
      qr: JSON.stringify({
        signature: sig.signature,
        hash,
      }),
    })
  }
}

export default ParcelDetails;
