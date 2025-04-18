import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  RootState, 
  removeFromCart, 
  clearCart, 
  updateQuantity, 
  CartItem 
} from '../store.ts';
import './Cart.css';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    dispatch(clearCart());
    alert('Checkout successful! Cart cleared.');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Shopping Cart</h2>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.map((item: CartItem) => (
        <div key={item.id} className="cart-item">
          <img
            src={item.image}
            alt={item.title}
            className="cart-item-image"
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100';
            }}
          />
          <div className="cart-item-details">
            <h3>{item.title}</h3>
            <div className="quantity-control">
              <label>Quantity: </label>
              <select
                value={item.quantity}
                onChange={(e) => dispatch(updateQuantity({
                  id: item.id,
                  quantity: Number(e.target.value)
                }))}
                className="quantity-select"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="remove-btn"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <h3>Total Items: {cartItems.length}</h3>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        <button
          onClick={handleCheckout}
          className="checkout-btn"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;