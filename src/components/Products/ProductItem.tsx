import * as React from 'react';
import { connect } from 'react-redux';

import { addProduct } from '../../store/actions';
import { IProduct } from '../../models/Products';

export interface IProductItem {
  product: IProduct,
  addProduct?: any
}

const ProductItem = (props: IProductItem) => {
  props.product.quantity = 1;
  return (
    <div className="product-item" onClick={() => props.addProduct(props.product)}>
      <p className="product-item-title">{props.product.title}</p>
      {props.product.isFreeShipping && <div className="product-stopper">Free shipping</div>}
      <div className="product-item-thumb">
        <img src={'/src/static/shopping-icon.png'} alt={props.product.title} title={props.product.title} />
      </div>
      <div className="product-item-price">
        <div className="val">
          <small>{props.product.currencyFormat}</small>
          <b>{props.product.price}</b>
        </div>
      </div>
      <div className="product-item-buy-btn">Add to cart</div>
    </div>
  );
};

export default connect(
  null,
  { addProduct }
)(ProductItem);
