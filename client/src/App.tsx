import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import SignupLogin from './HomePage/SignupLogin';
import UserProfilePage from './ProfilePage/UserProfilePage';
import CreatePost from './CreatePost/CreatePost';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup-login" element={<SignupLogin />} />
        <Route path="/users/:username" element={<UserProfilePage />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </Router>
  );
};

export default App;
