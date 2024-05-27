import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Admin/main_page/main_page";
import LoginPage from "./Admin/log-in_page/log-in_page";
import AdminMainPage from "./Admin/admin_main_page/admin_main_page";
import ReportPage from "./Admin/admin_report_page/admin_report_page";
import UserPage from "./Admin/admin_user_page/admin_user_page";
import Register from "./Medic/navigation/Register/Register";
import RegisterPatient from "./Patient/pages/register/register";
import HomeMedic from "./Medic/navigation/MainPage/Conversations";
import Contact from "./Medic/navigation/Contact/Contact";
import SettingsMedic from "./Medic/navigation/Profile/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminMainPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerPatient" element={<RegisterPatient />} />
        <Route path="/homeMedic" element={<HomeMedic />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settingsMedic" element={<SettingsMedic />} />
      </Routes>
    </Router>
  );
};

export default App;
