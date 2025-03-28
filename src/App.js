import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from './store';
import Home from './components/Home';
import Cart from './components/Cart';
import './App.css';

// Initialize react-query client
const queryClient = new QueryClient();

function App() {
  return (
    // Provide Redux store to all components
    <Provider store={store}>
      {/* Provide react-query context */}
      <QueryClientProvider client={queryClient}>
        <div className="App">
          {/* Render Home component */}
          <Home />
          {/* Render Cart component */}
          <Cart />
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
