import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {MaterialIcons,AntDesign} from '@expo/vector-icons';
import SampleStore from '../stores/SampleStore';
import {Container} from 'flux/utils';

class RightButton extends React.Component {

 static getStores() {
    return [SampleStore];
  }

  static calculateState() {
    return {
      sample: SampleStore.getState()
    };
  }
  render() {
    let {cart,favorites} = this.state.sample;
    if(cart.length > 0)
      var count = cart.reduce((a,b) => a + b.quantity,0);
    else
      var count = 0;
   
    return (
      <View style={{flexDirection:'row'}} >
        <View style={{paddingHorizontal: 10}}>
              <AntDesign onPress={() => this.props.navigation.navigate('Cart')} name="shoppingcart" size={28} color="white" />
              <View style={{position:'absolute',top:0,right:0,backgroundColor:'#fff',borderRadius:50,paddingHorizontal:5}} ><Text>{count}</Text></View>
          </View>
          <View style={{marginHorizontal: 10}}>

              <MaterialIcons name="favorite-border" size={28} color="white" />
              <View style={{position:'absolute',top:0,right:0,backgroundColor:'#fff',borderRadius:50,paddingHorizontal:5}} ><Text>{favorites.length}</Text></View>

            </View>
        </View>
    );
  }
}

export default Container.create(RightButton);

