import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './main_page.module.css';

const MainPage = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (

    <div className={styles.main_page_bg}>
      <div className={styles.main_page_container}>
        <button className={styles.main_page_button1} onClick={redirectToLogin}>
          LOG IN
        </button>
        <button className={styles.main_page_button}>SIGN UP AS PATIENT</button>
        <button className={styles.main_page_button}>SIGN UP AS MEDIC</button>
      </div>
    </div>
  );
};

export default MainPage;
