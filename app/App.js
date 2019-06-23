import './global';

import React, { Component } from "react";
import {createBottomTabNavigator, createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import ParcelsScreen from "./src/ParcelsScreen";
import ScannerScreen from "./src/ScannerScreen";
import store, { persistor } from "./src/reduxers";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ActivityIndicator, Image, View } from "react-native";
import IDScreen from './src/IDScreen';

const icons = {
  Parcels: require("./src/assets/package.png"),
  Scanner: require("./src/assets/QR.png"),
}

const MainNavigator = createBottomTabNavigator({
  Parcels: ParcelsScreen,
  Scanner: ScannerScreen,
}, {
  initialRouteName: "Parcels",
  header: null,
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    style: {
      height: 72,
    }
  },
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;


      // You can return any component that you like here!
      return (
        <View style={{ alignItems: "center", justifyContent: "flex-start", flex: 1}}>
          <View
            style={{ height: 4, width: 140,
            backgroundColor: focused ? "rgb(42, 178, 209)": "white"  }} />
          <Image
              resizeMode="contain"
              style={{
                height: 36,
                width: 36,
                marginTop: 14,
                tintColor: focused ? "rgb(20,20,20)" : "rgb(200,200,200)"
              }}
              source={icons[routeName]}
            />
        </View>
      );
    },
  }),
});

const switchNavigator = createSwitchNavigator({
  Parcels: MainNavigator,
  ID: IDScreen,
}, {
  initialRouteName: "Parcels",
})

const Navigation = createAppContainer(switchNavigator);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    )
  }
}

export default App;
