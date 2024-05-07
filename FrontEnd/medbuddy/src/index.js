import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import SignIn from './pages/register/register';
import Profile from './pages/profile/profile';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router> 
      <Routes>
        <Route path="/pages/register" element={<SignIn />} />
        <Route path="/" element={<App />} />
        <Route path="/pages/profile" element={<Profile />} />
      </Routes>
    </Router>
  </React.StrictMode>
);