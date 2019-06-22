
import React, { Component } from "react";
import { View, Text, Button } from "react-native";

const Web3 = require('web3');

export default class ParcelsScreen extends Component {

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
    const { navigation } = this.props;
    return (
      <View>
        <Text>Hello world!</Text>
        <Button title="Scan" onPress={() => navigation.navigate("Scanner")}/>
        <Button title="Show ID" onPress={() => navigation.navigate("ID")}/>
        <Text>{JSON.stringify(this.state.block)}</Text>
      </View>
    );
  }
}