import { IProduct } from "../models/Products";
import { Dispatch } from "redux";
import axios from 'axios';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const UPDATE_CART = 'UPDATE_CART';

export const addProduct = (product: IProduct) => ({
  type: ADD_PRODUCT,
  payload: product
});

export const removeProduct = (product: IProduct) => ({
  type: REMOVE_PRODUCT,
  payload: product
});

export const fetchProducts = (callback: () => void) => (dispatch: Dispatch<any>) => {
  return axios
    .get('../../server/data/products.json')
    .then((res: any) => {
      let { products } = res.data;

      if (!!callback) {
        callback();
      }

      return dispatch({
        type: FETCH_PRODUCTS,
        payload: products
      });
    })
    .catch((err: any) => {
      console.log('Could not fetch products. Try again later.');
    });
};

export const updateCart = (cartProducts: IProduct[]) => (dispatch: any) => {
  let productQuantity = cartProducts.reduce((sum: number, p: IProduct) => {
    sum += p.quantity;
    return sum;
  }, 0);

  let totalPrice = cartProducts.reduce((sum: number, p: IProduct) => {
    sum += p.price * p.quantity;
    return sum;
  }, 0);

  let cartTotal = {
    productQuantity,
    totalPrice,
    currencyId: 'USD',
    currencyFormat: '$'
  };

  dispatch({
    type: UPDATE_CART,
    payload: cartTotal
  });
};