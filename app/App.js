import React, { Component } from "react";

import {createStackNavigator, createAppContainer} from 'react-navigation';
import ParcelsScreen from "./src/ParcelsScreen";
import ScannerScreen from "./src/ScannerScreen";

import { Provider } from 'react-redux'

const MainNavigator = createStackNavigator({
  Parcels: ParcelsScreen,
  Scanner: ScannerScreen,
}, {
  initialRouteName: "Parcels",
});

import store from "./src/reduxers";

const Navigation = createAppContainer(MainNavigator);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}

export default App;
