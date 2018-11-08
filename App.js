import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import {createStackNavigator} from 'react-navigation';

const RootStack = createStackNavigator({
  Home: HomeScreen,
  Cart: CartScreen
});

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
