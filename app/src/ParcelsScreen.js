
import React, { Component } from "react";
import { View, Text, Button, ActivityIndicator, RefreshControl, ScrollView } from "react-native";
import { connect } from "react-redux";
import Parcel from "./Parcel";
import { httpProvider, contractABI, contractAddress, courierKey } from "./config";
import { ethers } from "ethers";

const styles = {
  root: {
    flex: 1,
  }
};


class ParcelsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { parcels: [], refreshing: false };
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
      try {
        currentOwner = await contract.getStatus(key.trackingId);
      } catch (e) {
        console.warn(e);
      }
      address = wallet.address;

      if (!key.privateKey && address.toLowerCase() !== currentOwner.toLowerCase()) {
        continue;
      }

      parcels.push({ ...key, currentOwner, address  });
    }

    this.setState({ parcels, refreshing: false });
  }

  render() {
    const { navigation, filter } = this.props;

    return (
      <View style={styles.root}>
        <Text>Filter: {filter}</Text>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refreshParcels}
            />
          }
        >
          {this.state.parcels.map((key, i) => <Parcel key={`key_${i}`} {...key}/>)}
        </ScrollView>
        <Button title="Show ID" onPress={() => navigation.navigate("ID")}/>
        <Button title="Reset" onPress={() => this.props.reset()}/>
      </View>
    );
  }
}

const select = (state) => ({
  keys: state.keys,
  filter: state.filter,
})

const actions = (dispatch) => ({
  reset: () => dispatch({ type: "RESET" }),
})

export default connect(select, actions)(ParcelsScreen);
