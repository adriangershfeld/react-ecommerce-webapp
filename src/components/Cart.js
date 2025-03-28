import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../store/cartSlice';

const Cart = () => {
  // Retrieve items in the cart from the Redux store
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total price based on item price and quantity
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity), 0
  );

  // Handle checkout: clear the cart and notify the user
  const handleCheckout = () => {
    dispatch(clearCart());
    alert('Checkout successful! Cart cleared.');
  };

  // If the cart is empty, display a message indicating so
  if (cartItems.length === 0) {
    return (
      <div style={{padding: '20px', backgroundColor: 'white', color: 'black'}}>
        <h2>Shopping Cart</h2>
        <p>Your cart is empty</p>
      </div>
    );
  }

  // Render cart items, total price, and checkout button
  return (
    <div style={{padding: '20px', backgroundColor: 'white', color: 'black'}}>
      <h2>Shopping Cart</h2>
      {cartItems.map(item => (
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
          {/* Display product image with error handling */}
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
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/100';
            }}
          />
          <div>
            {/* Display item title, quantity, and total price */}
            <h3>{item.title}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
            {/* Button to remove an item from the cart */}
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
      <div>
        {/* Display total items and price */}
        <h3>Total Items: {cartItems.length}</h3>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        {/* Checkout button that clears the cart */}
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
