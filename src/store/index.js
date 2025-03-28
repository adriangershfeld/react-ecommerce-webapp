import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Redux store configuration using Redux Toolkit
export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});