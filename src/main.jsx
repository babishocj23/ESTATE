import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter, 
  RouterProvider,
  createRoutesFromElements,
  Route 
} from 'react-router-dom';
import App from './App';
import './index.css';

// Enable future flags for React Router v7
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/*" element={<App />} />
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplitPath: true
    }
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
