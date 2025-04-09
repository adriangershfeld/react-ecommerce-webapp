# React E-Commerce WebApp
Front-End Specialization Project for Coding Temple.

### Root Files
- **index.js**: The entry point of our application
  - Creates the React root using modern React 18 createRoot API
  - Renders the App component wrapped in StrictMode
  - Sets up the foundation for our entire application

- **App.js**: The main component that structures our application
  - Configures Redux store with Provider
  - Sets up React Query for data fetching
  - Renders both the Home and Cart components in a single view

### State Management

- **store/cartSlice.js**: Redux slice managing our shopping cart
  - Defines the cart state structure (array of items)
  - Implements three key actions:
    1. `addToCart`: Adds products or increases quantity
    2. `removeFromCart`: Removes products by ID
    3. `clearCart`: Empties the cart
  - Exports actions and reducer for use in components

### Components

- **components/Home.js**: Product catalog component
  - Fetches products and categories from FakeStore API
  - Implements filtering by product category
  - Renders products in a responsive grid layout
  - Provides "Add to Cart" functionality
  - Handles loading and error states
  - Uses React Query for efficient data fetching and caching

- **components/Cart.js**: Shopping cart component
  - Displays items added to the cart
  - Calculates total price based on items and quantities
  - Allows removing individual items
  - Provides checkout functionality
  - Shows empty cart message when appropriate
  - Connects to Redux store to access and update cart state
