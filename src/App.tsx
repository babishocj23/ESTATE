import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import MobileHomePage from './pages/MobileHomePage';
import BuyPage from './pages/BuyPage';
import './styles/mobile.css';

const App: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isMobile ? <MobileHomePage /> : <BuyPage />} 
        />
        <Route path="/buy" element={<BuyPage />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App; 