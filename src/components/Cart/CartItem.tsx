import * as React from 'react';
import { IProduct } from '../../models/Products';

export interface ICartItem {
  product: IProduct,
  removeProduct: (product: IProduct) => void
}

const CartItem = (props: ICartItem) => {
  const [isMouseOver, setIsMouseOver] = React.useState(false);

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseOut = () => {
    setIsMouseOver(false);
  };

  const classes = ['cart-item'];

  if (isMouseOver === true) {
    classes.push('cart-item--mouseover');
  }

  return (
    <div className={classes.join(' ')}>
      <div
        className="cart-item-del"
        onMouseOver={() => handleMouseOver()}
        onMouseOut={() => handleMouseOut()}
        onClick={() => props.removeProduct(props.product)}
      />
      <div className="cart-item-details">
        <p className="title">{props.product.title}</p>
        <p className="desc">
          Quantity: {props.product.quantity}
        </p>
      </div>
      <div className="cart-item-price">
        <p>{`${props.product.currencyFormat}  ${props.product.price}`}</p>
      </div>
    </div>
  );
}

export default CartItem;
