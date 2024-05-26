import React from 'react';
import { useHistory } from 'react-router-dom';
import './main_page.css';

const MainPage = () => {
  const history = useHistory();

  const redirectToLogin = () => {
    history.push('/login');
  };

  return (
    <div className="bg">
      <div className="container">
        <button
          className="button1"
          onClick={redirectToLogin}
        >
          LOG IN
        </button>
        <button className="button">SIGN UP AS PATIENT</button>
        <button className="button">SIGN UP AS MEDIC</button>
      </div>
    </div>
  );
};

export default MainPage;
