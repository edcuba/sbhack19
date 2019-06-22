import './global';

import React, { Component } from "react";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import ParcelsScreen from "./src/ParcelsScreen";
import ScannerScreen from "./src/ScannerScreen";
import store, { persistor } from "./src/reduxers";
import IDScreen from './src/IDScreen';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ActivityIndicator } from "react-native";
import ParcelDetails from './src/ParcelDetails';

const MainNavigator = createStackNavigator({
  Parcels: ParcelsScreen,
  Scanner: ScannerScreen,
  ParcelDetails,
  ID: IDScreen,
}, {
  initialRouteName: "Parcels",
});



const Navigation = createAppContainer(MainNavigator);

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
