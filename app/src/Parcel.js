import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withNavigation } from "react-navigation";

const styles = {
  root: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    padding: 8,
    margin: 8,
    borderRadius: 10,
  },
};

class Parcel extends Component {
  render() {
    const { privateKey, trackingId, currentOwner, address } = this.props;
    return (
      <TouchableOpacity onPress={this.goToDetails} >
        <View style={styles.root}>
          <Text>
            Address: {address}
          </Text>
          <Text>
            ID: {trackingId}
          </Text>
          <Text>
            Current owner: {currentOwner}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  goToDetails = () => {
    const { privateKey, trackingId, navigation, currentOwner } = this.props;
    navigation.navigate("ParcelDetails", { privateKey, trackingId, currentOwner });
  }
}

export default  withNavigation(Parcel);