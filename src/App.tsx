import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from './store.ts';
import Home from './components/Home.tsx';
import Cart from './components/Cart.tsx';
import './App.css';

// Initialize React Query client
const queryClient = new QueryClient();

const App: React.FC = () => (
  // Provide Redux store to all components
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Home />
        <Cart />
      </div>
    </QueryClientProvider>
  </Provider>
);

export default App;