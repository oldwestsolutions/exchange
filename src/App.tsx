/**
 * Main App component with routing configuration
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Homepage } from './pages/Homepage';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { CompanyDetails } from './pages/CompanyDetails';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="bg-gray-50 dark:bg-[#0a0a0a]">
          {/* Route configuration */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<><Navbar /><Login /></>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/company/:symbol" element={<CompanyDetails />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;

