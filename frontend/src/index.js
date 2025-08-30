import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the correct module
import App from './App'; // Ensure this imports your App component

// Find the root element
const rootElement = document.getElementById('root');

// Create a root and render the App component
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
