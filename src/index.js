// Import React, DOM tools, CSS, and App component
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Create a root DOM node and render the main App component in strict mode (Mounts App into id=root)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// mounts the app using React 18’s createRoot
// App.js is the main layout
