import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Base product type matching FakeStoreAPI response
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
}

// Cart item extends Product with quantity
interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] } as CartState,
  reducers: {
    // Adds an item to cart or increments quantity
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // Add quantity property when storing in cart
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    
    // Removes item completely from cart
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    
    // Updates quantity of specific item
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    
    // Clears entire cart
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer
  }
});

// Export actions and types
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export types for component usage
export type { Product, CartItem };