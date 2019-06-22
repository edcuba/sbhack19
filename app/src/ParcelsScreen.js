
import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import Parcel from "./Parcel";
const Web3 = require('web3');

const styles = {
  root: {
    flex: 1,
  }
};


class ParcelsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { block: "Loading" };
  }

  componentDidMount(){
    const web3 = new Web3(
      new Web3.providers.HttpProvider('https://mainnet.infura.io/')
    );

    web3.eth.getBlock('latest').then((block) => this.setState({ block }));
  }

  render() {
    const { navigation, keys } = this.props;
    return (
      <View style={styles.root}>
        {keys.map((key, i) => <Parcel key={`key_${i}`} {...key}/>)}
        <Button title="Scan" onPress={() => navigation.navigate("Scanner")}/>
        <Button title="Show ID" onPress={() => navigation.navigate("ID")}/>
      </View>
    );
  }
}

const select = (state) => ({
  keys: state.keys,
})

export default connect(select)(ParcelsScreen);
