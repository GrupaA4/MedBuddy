import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Admin/main_page/main_page';
import LoginPage from './Admin/log-in_page/log-in_page';
import AdminMainPage from './Admin/admin_main_page/admin_main_page';
import ReportPage from './Admin/admin_report_page/admin_report_page';
import UserPage from './Admin/admin_user_page/admin_user_page';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminMainPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default App;
