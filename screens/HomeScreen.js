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
    title: 'Sports Shoes',
    headerStyle: {
      backgroundColor: '#e30047',
    },
    headerTintColor:"#fff",
    headerRight:(
        <RightButton navigation={navigation} />
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

    AppAction.getProducts();
  }

  addOrRemoveCart(item){
    let {products,cart} = this.state.sample;
    var index = findWithAttr(cart,'id',item.id);
    if(index == -1)
      AppAction.addCart(item)
    else
      AppAction.deleteItem(item)
  }
  addOrRemoveFavorite(item){
    let {favorites} = this.state.sample;
    var index = findWithAttr(favorites,'id',item.id);
    if(index == -1)
      AppAction.addFavorite(item)
    else
      AppAction.removeFavorite(item)
  }

  render() {
    let {products,cart,favorites} = this.state.sample;
    return (
      <ScrollView>
      <View style={{flex:1,flexDirection: 'row',flexWrap:'wrap'}}>
      {
        products && products.map((item,index) => {
          return (
          <View key={index} style={{width: '50%',height:275,backgroundColor:"#fff",padding: 10,borderWidth:1, borderColor:'#f0f0f0'}} >
            <View style={{alignSelf: 'flex-end'}}>
              <MaterialIcons onPress={() => this.addOrRemoveFavorite(item)} name="favorite" size={28} color={findWithAttr(favorites,'id',item.id) == -1 ? "black" : "red"} />
            </View>
            <Image style={{width: '100%',height: 150}} source={{uri: item.image}} />
            <Text style={{color:'#a5a5a5'}}>{item.name}</Text>
            <Text style={{color:'#000',paddingVertical: 5}}>Rs. {item.price}</Text>
            <Button onPress={() => this.addOrRemoveCart(item)} title={findWithAttr(cart,'id',item.id) == -1 ? 'Add to Cart' : 'Remove'} color="#e30047" />
          </View>
            )
        })
      }
 
        </View>
        </ScrollView>
    );
  }
}

export default Container.create(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}