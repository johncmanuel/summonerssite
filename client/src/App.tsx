import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import SignupLogin from './HomePage/SignupLogin';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup-login" element={<SignupLogin />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
};

export default App;
