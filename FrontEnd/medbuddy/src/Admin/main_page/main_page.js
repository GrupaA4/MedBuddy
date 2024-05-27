import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './main_page.module.css';

const MainPage = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <button className={styles.button1} onClick={redirectToLogin}>
          LOG IN
        </button>
        <button className={styles.button}>SIGN UP AS PATIENT</button>
        <button className={styles.button}>SIGN UP AS MEDIC</button>
      </div>
    </div>
  );
};

export default MainPage;
