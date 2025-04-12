import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFromCart, clearCart } from '../store/cartSlice';

interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  // Access cart state from Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate the total cart value
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Clear the cart and notify the user
  const handleCheckout = () => {
    dispatch(clearCart());
    alert('Checkout successful! Cart cleared.');
  };

  // Message for empty cart state
  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '20px', backgroundColor: 'white', color: 'black' }}>
        <h2>Shopping Cart</h2>
        <p>Your cart is empty</p>
      </div>
    );
  }

  // Display cart items and total
  return (
    <div style={{ padding: '20px', backgroundColor: 'white', color: 'black' }}>
      <h2>Shopping Cart</h2>
      {cartItems.map((item: CartItem) => (
        <div
          key={item.id}
          className="cart-item"
          style={{
            display: 'flex',
            marginBottom: '10px',
            border: '1px solid #ddd',
            padding: '10px'
          }}
        >
          {/* Product thumbnail */}
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'contain',
              marginRight: '10px'
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100';
            }}
          />
          <div>
            {/* Item info and controls */}
            <h3>{item.title}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              style={{
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '5px 10px'
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Totals and checkout */}
      <div>
        <h3>Total Items: {cartItems.length}</h3>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        <button
          onClick={handleCheckout}
          style={{
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            padding: '10px 20px'
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
