
import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import Parcel from "./Parcel";
import { ethereumHandle } from "./config";
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
    const web3 = new Web3(ethereumHandle);

    web3.eth.getBlock('latest').then((block) => this.setState({ block }));
  }

  render() {
    const { navigation, keys, filter } = this.props;
    return (
      <View style={styles.root}>
        <Text>Filter: {filter}</Text>
        {keys.map((key, i) => <Parcel key={`key_${i}`} {...key}/>)}
        <Button title="Scan" onPress={() => navigation.navigate("Scanner")}/>
        <Button title="Show ID" onPress={() => navigation.navigate("ID")}/>
        <Button title="Reset" onPress={() => this.props.reset()}/>
        <Text>{JSON.stringify(this.state.block)}</Text>
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
