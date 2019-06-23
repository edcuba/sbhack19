
import React, { Component } from "react";
import { View, Text, Button, SafeAreaView, RefreshControl, ScrollView, TextInput, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Parcel from "./Parcel";
import { httpProvider, contractABI, contractAddress, courierKey } from "./config";
import { ethers } from "ethers";

const styles = {
  root: {
    flex: 1,
  },
  shadow: {

    flexDirection: "row",

    marginVertical: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",

    // android shadow
    elevation: 1,

    backgroundColor: "white",

    // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 7,
    shadowOffset: { height: 0, width: 0 },
  },
};


class ParcelsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { parcels: [
     /*{
        address: "0x13",
        privateKey: "0x123",
        trackingId: "1234",
        currentOwner: "0x345"
      }*/
    ], refreshing: false };
  }

  componentDidMount(){
    this.refreshParcels();
  }

  componentDidUpdate(props) {
    if (props.keys.length !== this.props.keys.length) {
      this.refreshParcels();
    }

  }

  refreshParcels = async () => {

    this.setState({ refreshing: true });

    const parcels = [];

    for (key of this.props.keys) {

      let currentOwner;
      let address;

      const pk = key.privateKey || courierKey;
      const wallet = new ethers.Wallet(pk, httpProvider);
      const contract = new ethers.Contract(contractAddress, contractABI, wallet);

      contract.on("ChangedOwnership", (p, n) => this.onOwnershipChange(key.trackingId, p, n));
      contract.on("Delivered", (trackingId, customerAddress) => this.onDelivered(trackingId, customerAddress));

      try {
        currentOwner = await contract.getStatus(key.trackingId);
      } catch (e) {
        continue;
      }
      address = wallet.address;

      if (!key.privateKey && address.toLowerCase() !== currentOwner.toLowerCase()) {
        continue;
      }

      let delivered = false;

      if (currentOwner === address && key.owner) {
        delivered = true;
      }

      parcels.push({ ...key, currentOwner, address, delivered });
    }

    this.setState({ parcels, refreshing: false });
  }

  render() {
    const { filter } = this.props;

    return (
      <SafeAreaView style={styles.root}>
        <Text style={{
          fontSize: 26,
          lineHeight: 45,
          letterSpacing: 2.7,
          textAlign: "center",
          marginVertical: 20,
        }}>MY PARCELS</Text>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refreshParcels}
            />
          }
        >
          <TouchableOpacity style={styles.shadow}>
            <TextInput
              style={{ height: 40, width: 250, borderBottomWidth: 1, borderBottomColor: "rgb(200,200,200)"  }}
              placeholder="Search"
              value={filter}
              onChangeText={(text) => this.props.filterParcels(text)}
            />
              <Image source={require("./assets/zoom.png")} style={{ marginRight: 16 }} />
          </TouchableOpacity>
          {this.state.parcels.filter(k => !filter || k.trackingId.includes(filter)).map((key, i) => <Parcel key={`key_${i}`} {...key}/>)}
          <Button color="rgb(30, 165, 195)" title="Reset" onPress={() => this.props.reset()}/>
        </ScrollView>
      </SafeAreaView>
    );
  }

  onOwnershipChange = (item, previousAddress, newAddress) => {
    alert("Item reassigned to a new owner.");
  }

  onDelivered = () => {
    // alert("Item delivered");
  }
}

const select = (state) => ({
  keys: state.keys,
  filter: state.filter,
})

const actions = (dispatch) => ({
  reset: () => dispatch({ type: "RESET" }),
  filterParcels: (val) => dispatch({ type: "FILTER", payload: val }),
  removeParcel: (trackingId) => dispatch({ type: "REMOVE_PARCEL", payload: trackingId }),
})

export default connect(select, actions)(ParcelsScreen);
