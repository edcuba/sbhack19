import {createStackNavigator, createAppContainer} from 'react-navigation';
import ParcelScreen from './src/ParcelScreen';

const MainNavigator = createStackNavigator({
  Parcels: ParcelScreen,
});

const App = createAppContainer(MainNavigator);
export default App;
