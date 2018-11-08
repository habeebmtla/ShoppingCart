import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/AppConstants';
import axios from 'axios';

const AppActions = {


  setInputs(data) {
    AppDispatcher.dispatch({
      type: ActionTypes.SET_INPUTS,
      data: data,
    });
  },

  getProducts(){
  	var data = require('../assets/products.json');
    this.setInputs({products: data});
  },
  addCart(product){
    AppDispatcher.dispatch({
      type: ActionTypes.ADD_CART,
      data: product
    })
  },
  removeCart(product){
    AppDispatcher.dispatch({
      type: ActionTypes.REMOVE_CART,
      data: product
    })
  },
  addFavorite(product){
    AppDispatcher.dispatch({
      type: ActionTypes.FAVORITE_ADD,
      data: product
    })
  },
  removeFavorite(product){
    AppDispatcher.dispatch({
      type: ActionTypes.FAVORITE_REMOVE,
      data: product
    })
  },
  deleteItem(product){
    AppDispatcher.dispatch({
      type: ActionTypes.DELETE_ITEM,
      data: product
    })
  }
}

export default AppActions;