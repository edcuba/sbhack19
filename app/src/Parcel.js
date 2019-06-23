import React, { Component } from "react";
import { View, Text, Button, Switch, Dimensions, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withNavigation } from "react-navigation";
import { httpProvider } from "./config";
import QRCode from 'react-native-qrcode';

const Web3 = require('web3');

const styles = {
  root: {

    marginVertical: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    justifyContent: "center",

    // android shadow
    elevation: 1,

    flex: 1,
    backgroundColor: "white",

    // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 7,
    shadowOffset: { height: 0, width: 0 },
  },
};

class Parcel extends Component {

  constructor(p) {
    super(p);
    this.state = { details: false, loading: false, qr: null };
  }

  render() {
    const { delivered, trackingId, currentOwner, address } = this.props;

    const status = delivered ? "Delivered" : currentOwner;

    const content = !this.state.details ? null : this.state.loading ? (<ActivityIndicator />) : (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 10 }}>
        <QRCode
          value={this.state.qr || ""}
          size={Dimensions.get("screen").width * 0.8}
        />
      </View>
    );

    return (
      <TouchableOpacity onPress={this.goToDetails} style={styles.root}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
          <Text style={{ fontSize: 14, lineHeight: 22, letterSpacing: 0.2, fontWeight: "700" }} >{trackingId}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ paddingRight: 8, fontSize: 12, letterSpacing: 0.3 }} >Show details</Text>
            <Switch
              value={this.state.details}
              trackColor={{
                true: "rgb(42, 178, 209)",
              }}
              onValueChange={(val) => this.setState({ details: val })}
            />
          </View>
        </View>
        <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", }}>
          <View>
            <Text style={{ fontSize: 12, letterSpacing: 0.3, color: "rgb(30,165,195)"  }}>Status</Text>
            <Text style={{ marginVertical: 8, fontSize: 12, letterSpacing: 0.3, color: "rgb(20,20,20)" }}>{status}</Text>
          </View>
        </View>
        {content}
      </TouchableOpacity>
    );
  }

  goToDetails = async () => {
    const newstate = !this.state.details
    this.setState({ details: newstate, loading: newstate, qr: null });

    if (newstate) {

      const block = await httpProvider.getBlock('latest');
      const { hash } = block;

      const web3 = new Web3();
      const account = web3.eth.accounts.privateKeyToAccount(this.props.privateKey);

      const sig = account.sign(hash);

      this.setState({
        details: true,
        loading: false,
        qr: JSON.stringify({
          signature: sig.signature,
          hash,
        }),
      })
    }

    return;
    const { privateKey, trackingId, navigation, currentOwner } = this.props;
    navigation.navigate("ParcelDetails", { privateKey, trackingId, currentOwner });
  }
}

export default  withNavigation(Parcel);