import * as React from 'react';
import { connect } from 'react-redux';

import { removeProduct, updateCart } from '../../store/actions';

import CartItem from './CartItem';
import { formatPrice } from '../Shared/util';

import { IProduct } from '../../models/Products';

import './cart.less';
import { IAppState, ICartTotal } from '../../store/reducers';

export interface ICartSection {
  updateCart?: (products: IProduct[]) => void,
  cartProducts?: IProduct[],
  productToAdd?: (product: IProduct) => void,
  removeProduct: (product: IProduct) => void,
  productToRemove?: IProduct,
  newProduct?: any,
  cartTotal?: ICartTotal
}

const CartSection = (props: ICartSection) => {
  React.useEffect(() => {
    if (props.newProduct) {
      addProductCall(props.newProduct);
    }
  }, [props.newProduct]);

  React.useEffect(() => {
    if (props.productToRemove) {
      removeProductCall(props.productToRemove);
    }
  }, [props.productToRemove]);

  const addProductCall = (product: IProduct) => {
    const { cartProducts, updateCart } = props;
    let productAlreadyInCart = false;

    cartProducts.forEach((cp: IProduct) => {
      if (cp.id === product.id) {
        cp.quantity += product.quantity;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      cartProducts.push(product);
    }

    updateCart(cartProducts);
  };

  const removeProductCall = (product: IProduct) => {
    const { cartProducts, updateCart } = props;

    const index = cartProducts.findIndex((p: IProduct) => p.id === product.id);
    if (index >= 0) {
      cartProducts.splice(index, 1);
      updateCart(cartProducts);
    }
  };

  const proceedToCheckout = () => {
    const { totalPrice, productQuantity, currencyFormat, currencyId } = props.cartTotal;

    if (!productQuantity) {
      alert('Add some product in the cart!');
    } else {
      alert(`Checkout - Subtotal: ${currencyFormat} ${formatPrice(totalPrice, currencyId)}`);
    }
  };

  const { cartTotal, cartProducts, removeProduct } = props;

  const products = cartProducts.map((p: IProduct) => {
    return (
      <CartItem product={p} removeProduct={removeProduct} key={p.id} />
    );
  });

  return (
    <div className="cart">
      <div className="cart-content">
        <div className="cart-header">
          <p>{`${cartTotal.productQuantity} items in cart`}</p>
        </div>
        <div className="cart-container">
          {products}
          {!products.length && <p className="products-empty">Add some products in the cart</p>}
        </div>
        <div className="cart-footer">
          <div className="sub">SUBTOTAL</div>
          <div className="sub-price">
            <p className="sub-price-val">
              {`${cartTotal.currencyFormat} ${formatPrice(cartTotal.totalPrice, cartTotal.currencyId)}`}
            </p>
          </div>
          <div onClick={() => proceedToCheckout()} className="buy-btn">
            Checkout
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: IAppState) => ({
  cartProducts: state.cart.products,
  newProduct: state.cart.productToAdd,
  productToRemove: state.cart.productToRemove,
  cartTotal: state.total.data
});

export default connect(
  mapStateToProps,
  { updateCart, removeProduct }
)(CartSection);
