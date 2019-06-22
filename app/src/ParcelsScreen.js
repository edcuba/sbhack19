
import React, { Component } from "react";
import { View, Text, Button } from "react-native";

export default class ParcelsScreen extends Component {
  render() {

    const { navigation } = this.props;

    return (
      <View>
        <Text>Hello world!</Text>
        <Button title="Scan" onPress={() => navigation.navigate("Scanner")}/>
      </View>
    );
  }
}