import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Import styles in correct order
import './index.css';
import './styles/mobile.css';

// Configure React Router future flags
const router = (
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}
  >
    <App />
  </BrowserRouter>
);

// Create root and render app with strict mode and router
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {router}
  </React.StrictMode>
);
