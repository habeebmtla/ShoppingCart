import React from 'react';
import { StyleSheet, Text, View,ScrollView,Image,Button,FlatList } from 'react-native';
import AppAction from '../actions';
import SampleStore from '../stores/SampleStore';
import {Container} from 'flux/utils';
import {MaterialIcons,AntDesign} from '@expo/vector-icons';
import RightButton from '../components/RightButton'

class HomeScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
   
  return {
    title: 'Shopping Cart',
    headerStyle: {
      backgroundColor: '#e30047',
    },
    headerTintColor:"#fff",
    headerRight:(
        <RightButton />
      )
  }
};


   static getStores() {
    return [SampleStore];
  }

  static calculateState() {
    return {
      sample: SampleStore.getState()
    };
  }

  componentDidMount(){

  }

  addCart(item){
    AppAction.addCart(item)
  }
  removeCart(item){
    if(item.quantity >1){
      AppAction.removeCart(item);
    }
  }

  deleteItem(item){
    AppAction.deleteItem(item);
  }

  render() {
    let {cart} = this.state.sample;
    var cart_total = cart ? cart.map((item,index) => item.quantity * item.price ).reduce((a,b) => a+b,0) : 0;
    return (
      <ScrollView>
        {
          cart && cart.map((item,index) => {
            return (
              <View key={index} style={{backgroundColor:"#fff",padding: 10, marginVertical:10}} >
              <View  style={{flexDirection: 'row'}} >
                <View style={{width: '30%' }} >
                  <Image style={{width: '100%',height: 120}} source={{uri: item.image}} />
                  
                </View>
                <View style={{width:'50%'}} >
                  <Text style={{fontSize:20,padding: 10}} >{item.name}</Text>
                </View>
                <View style={{width: '20%',alignItems: 'center'}} >
                  <AntDesign onPress={() => this.deleteItem(item)} name="close" color="#565656" style={{marginHorizontal: 10}} size={20} />
                </View>
              </View>
                <View style={{flexDirection:'row'}} >
                  <View style={{width: "30%",flexDirection: 'row'}} >
                    <AntDesign onPress={() => this.removeCart(item)} name="minuscircleo" color="#565656" style={{marginHorizontal: 10}} size={20} />
                    <Text>{item.quantity}</Text>
                    <AntDesign onPress={() => this.addCart(item)} name="pluscircleo" color="#565656" style={{marginHorizontal: 10}} size={20} />
                  </View>
                  <View style={{width:'70%',alignSelf: 'flex-end'}} >
                    <Text style={{fontSize:16,textAlign: 'right',color:"#565656"}} >Rs. {item.quantity * item.price}</Text>
                  </View>
                </View>
              </View>
              )
          })
        }

        <Text style={{fontSize:20}} >Total Payable amount: Rs. {cart_total}</Text>
          
        </ScrollView>
    );
  }
}

export default Container.create(HomeScreen);

