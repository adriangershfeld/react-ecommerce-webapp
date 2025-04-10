// Import configureStore from Redux Toolkit to create the Redux store
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Redux store configuration using Redux Toolkit
export const store = configureStore({
  reducer: {
    cart: cartReducer 
  } // 'cart' becomes this slice's key in the state object + determines how data is accessed in state tree (state.cart)
});
