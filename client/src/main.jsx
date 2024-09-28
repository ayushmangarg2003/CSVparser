import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Get the root DOM element from the HTML file
const rootElement = document.getElementById('root');

// Use createRoot for React 18
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
