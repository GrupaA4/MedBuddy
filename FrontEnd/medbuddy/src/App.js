import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Admin/main_page/main_page";
import LoginPage from "./Admin/log-in_page/log-in_page";
import AdminMainPage from "./Admin/admin_main_page/admin_main_page";
import ReportPage from "./Admin/admin_report_page/admin_report_page";
import UserPage from "./Admin/admin_user_page/admin_user_page";

import RegisterMedic from "./Medic/navigation/Register/Register";
import RegisterPatient from "./Patient/pages/register/register";
import HomeMedic from "./Medic/navigation/MainPage/Conversations";
import ContactMedic from "./Medic/navigation/Contact/Contact";
import ProfileMedic from "./Medic/navigation/Profile/Profile";
import Diagnostic from "./Medic/navigation/Diagnoses/Diagnoses";

import Home from './Patient/pages/home/page';
import ChatPage from './Patient/pages/chat/page';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Diagnoses from './Patient/pages/diagnoses/page';
// import Register from './Patient/pages/register/register';
import ProfilePatient from './Patient/pages/profile/profile';
import ContactPatient from './Patient/pages/contact/page';
import About from './Patient/pages/about/page';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminMainPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/user" element={<UserPage />} />

        <Route path="/registerMedic" element={<RegisterMedic />} />
        <Route path="/registerPatient" element={<RegisterPatient />} />
        <Route path="/homeMedic" element={<HomeMedic />} />
        <Route path="/contactMedic" element={<ContactMedic />} />
        <Route path="/profileMedic" element={<ProfileMedic />} />
        <Route path="/diagnosesMedic" element={<Diagnostic />} />

            <Route path="/chat" element={<ChatPage />} />
            <Route path="/diagnoses" element={<Diagnoses />} />
            <Route path="/profilePatient" element={<ProfilePatient />} />
            <Route path="/contactPatient" element={<ContactPatient />} />
            <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
