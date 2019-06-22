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
    const { privateKey, publicKey } = this.props;
    return (
      <TouchableOpacity onPress={this.goToDetails} >
        <View style={styles.root}>
          <Text>
            {privateKey}
          </Text>
          <Text>
            {publicKey}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  goToDetails = () => {
    const { privateKey, publicKey, navigation } = this.props;
    navigation.navigate("ParcelDetails", { privateKey, publicKey });
  }
}

export default  withNavigation(Parcel);