
import React, { Component } from "react";
import { View, Image, TouchableWithoutFeedback } from "react-native";

export default class IDScreen extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Parcels")}>
        <View style={{flex: 1 }}>
        <Image resizeMode="contain" source={require("./assets/checked.png")} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}