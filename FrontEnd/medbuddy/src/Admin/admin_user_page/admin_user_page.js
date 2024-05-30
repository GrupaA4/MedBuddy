import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './admin_user_page.module.css';
import Logo from '../assets/MedBuddy.png';

const UserPage = () => {
  const navigate = useNavigate();

  const redirectTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.body_admin_user_page}>
      <div className={styles.admin_user_page_header}>
        <img src={Logo} className={styles.admin_user_page_header__image} alt="Logo" />
        <div className={styles.admin_user_page_header__paragraph}>
          <a
            className={styles.admin_user_page_header__paragraph__part}
            onClick={() => navigate('/admin')}
          >
            Home
          </a>
          <a
            className={styles.admin_user_page_header__paragraph__part}
            onClick={() => navigate('/report')}
          >
            Report
          </a>
          <a
            className={styles.admin_user_page_header__paragraph__part}
            onClick={redirectTop}
            style={{ textDecoration: 'underline', textDecorationColor: '#369986' }}
          >
            Manage Accounts
          </a>
        </div>
      </div>

      <div className={styles.admin_user_page_container1} id="current_users">
        <div className={styles.admin_user_page_container1__header}>
          <p className={styles.admin_user_page_container1__header__text}>Unverified accounts</p>
          <div className={styles.admin_user_page_container1__buttons}>
            <button className={styles.admin_user_page_container1__before}>&#8678;</button>
            <button className={styles.admin_user_page_container1__next}>&#8680;</button>
          </div>
        </div>

        {[...Array(5).keys()].map((i) => (
          <div key={i} className={styles.admin_user_page_container1__square}>
            <div className={styles.admin_user_page_container1__square__icon}>
              <p>PHOTO</p>
            </div>
            <p className={styles.admin_user_page_container1__square__data}>
              NAME: <span className={styles.name}>Example Name {i + 1}</span><br />
              EMAIL: <span className={styles.email}>example{i + 1}@domain.com</span><br />
              MEDICAL LICENCE: <span className={styles.medicalLicense}>123456</span><br />
            </p>
            <div className={styles.admin_user_page_container1__square__data__buttons}>
              <button className={styles.admin_user_page_container1__button1} type="button">Accept</button>
              <button className={styles.admin_user_page_container1__button2} type="button">Deny</button>
              <button className={styles.admin_user_page_container1__button3} type="button">Check License</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.admin_user_page_container2}>
        <div className={styles.admin_user_page_container2_icon__and__text}>
          <div className={styles.admin_user_page_container2__square1__icon}>
            <p>PHOTO</p>
          </div>
          <div className={styles.admin_user_page_container2__text}>NAME: Example of name</div>
        </div>
        <button className={styles.admin_user_page_container2__button1} type="button">Accept</button>
        <button className={styles.admin_user_page_container2__button2} type="button">Deny</button>
        <button className={styles.admin_user_page_container2__button3} type="button">Verify License</button>
      </div>
    </div>
  );
};

export default UserPage;
