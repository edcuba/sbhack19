import React, { Component } from "react";
import { View, Text, Button, ActivityIndicator, Dimensions } from "react-native";
import QRCode from 'react-native-qrcode';
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
    this.publicKey = props.navigation.getParam("publicKey");
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
          {this.publicKey}
        </Text>
        {qr}
        {this.state.loading ? <ActivityIndicator /> : null}
        <Button title="Retrieve" onPress={this.retrieve} />
      </View>
    );
  }

  retrieve = async () => {

    this.setState({ loading: true, qr: null });

    const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/'));

    const block = await web3.eth.getBlock('latest');

    const { hash } = block;

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
