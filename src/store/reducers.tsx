import { combineReducers } from 'redux';
import { ADD_PRODUCT, REMOVE_PRODUCT, FETCH_PRODUCTS, UPDATE_CART } from './actions';
import { IProduct } from '../models/Products';

export interface IAppState {
  product: IStateProducts,
  cart: IStateCart,
  total: any
}
export interface IStateCart {
  products: IProduct[],
  productToRemove?: IProduct,
  productToAdd?: (product: IProduct) => void,
  removeProduct?: (product: IProduct) => void
}

export interface IStateProducts {
  products: IProduct[],
}

export interface IStateTotal {
  data: ICartTotal
}

export const initialStateCart: IStateCart = {
  products: Array<IProduct>()
};

export const initialStateProducts: IStateProducts = {
  products: Array<IProduct>()
};

export interface ICartTotal {
  totalPrice: number,
  productQuantity: number,
  currencyFormat: string,
  currencyId: string
}

export const initialStateTotal = {
  data: {
    productQuantity: 0,
    totalPrice: 0,
    currencyId: 'USD',
    currencyFormat: '$'
  }
};

export function reducerCart(state = initialStateCart, action: any) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        productToAdd: Object.assign({}, action.payload)
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        productToRemove: Object.assign({}, action.payload)
      };
    default:
      return state;
  }
}

export function reducerProducts(state = initialStateProducts, action: any) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    default:
      return state;
  }
}

export function reducerTotal(state = initialStateTotal, action: any) {
  switch (action.type) {
    case UPDATE_CART:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}

export const reducer = combineReducers<IAppState>({
  product: reducerProducts,
  cart: reducerCart,
  total: reducerTotal
})
