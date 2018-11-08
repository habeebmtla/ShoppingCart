import { ReduceStore } from 'flux/utils';
import ActionTypes from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

class SampleStore extends ReduceStore {
  getInitialState() {
    return {
      products:[],
      cart:[],
      favorites:[]
    };
  }
  addCart(state,product){
    let {cart} = state;
    var index = findWithAttr(cart,'id',product.id);
    if(index == -1){
      product['quantity'] = 1;
      cart.push(product);
    }
    else {
      cart[index].quantity += 1;
    }

    return Object.assign({},state,{
      cart: cart
    })

  }

  removeCart(state,product){
    let {cart} = state;
    var index = findWithAttr(cart,'id',product.id);
    cart[index].quantity -= 1;
    return Object.assign({},state,{
      cart: cart
    })
  }

  deleteItem(state,product){
    let {cart} = state;
    var index = findWithAttr(cart,'id',product.id);
    cart.splice(index,1);
     return Object.assign({},state,{
      cart: cart
    })   
  }

  addFavorite(state,product){
    let {favorites} = state;
    favorites.push(product);
    return Object.assign({},state,{
      favorites: favorites
    })
  }
  removeFavorite(state,product){
    let {favorites} = state;
   var index = findWithAttr(favorites,'id',product.id);
    favorites.splice(index,1);
    return Object.assign({},state,{
      favorites: favorites
    })
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.SET_INPUTS:
        return Object.assign({},state,action.data);
      case ActionTypes.ADD_CART:
        return this.addCart(state,action.data);
      case ActionTypes.REMOVE_CART:
        return this.removeCart(state,action.data);
      case ActionTypes.FAVORITE_ADD:
        return this.addFavorite(state,action.data);
      case ActionTypes.FAVORITE_REMOVE:
        return this.removeFavorite(state,action.data);
      case ActionTypes.DELETE_ITEM:
        return this.deleteItem(state,action.data);
      default:
        return state;
    }
  }
}



export default new SampleStore(AppDispatcher);


function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}