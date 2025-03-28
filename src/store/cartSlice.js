import { createSlice } from '@reduxjs/toolkit';

// Cart Slice: manages shopping cart state
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [] // cart starts empty
  },
  reducers: {
    // Adds an item to the cart or increments quantity if it exists
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // Removes an item from the cart by ID
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    // Clears all items from the cart
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
