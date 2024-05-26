import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './user_page.module.css';
import Logo from '../assets/MedBuddy.png';

const UserPage = () => {
  const navigate = useNavigate();

  const redirectTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className={styles.header}>
        <img src={Logo} className={styles.header__image} alt="Logo" />
        <div className={styles.header__paragraph}>
          <a
            className={styles.header__paragraph__part}
            onClick={() => navigate('/admin')}
          >
            Home
          </a>
          <a
            className={styles.header__paragraph__part}
            onClick={() => navigate('/report')}
          >
            Report
          </a>
          <a
            className={styles.header__paragraph__part}
            onClick={redirectTop}
            style={{ textDecoration: 'underline', textDecorationColor: '#369986' }}
          >
            Manage Accounts
          </a>
        </div>
      </div>

      <div className={styles.container1} id="current_users">
        <div className={styles.container1__header}>
          <p className={styles.container1__header__text}>Unverified accounts</p>
          <div className={styles.container1__buttons}>
            <button className={styles.container1__before}>&#8678;</button>
            <button className={styles.container1__next}>&#8680;</button>
          </div>
        </div>

        {[...Array(5).keys()].map((i) => (
          <div key={i} className={styles.container1__square}>
            <div className={styles.container1__square__icon}>
              <p>PHOTO</p>
            </div>
            <p className={styles.container1__square__data}>
              NAME: <span className={styles.name}>Example Name {i + 1}</span><br />
              EMAIL: <span className={styles.email}>example{i + 1}@domain.com</span><br />
              MEDICAL LICENCE: <span className={styles.medicalLicense}>123456</span><br />
            </p>
            <div className={styles.container1__square__data__buttons}>
              <button className={styles.container1__button1} type="button">Accept</button>
              <button className={styles.container1__button2} type="button">Deny</button>
              <button className={styles.container1__button3} type="button">Check License</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.container2}>
        <div className={styles.icon__and__text}>
          <div className={styles.container2__square1__icon}>
            <p>PHOTO</p>
          </div>
          <div className={styles.container2__text}>NAME: Example of name</div>
        </div>
        <button className={styles.container2__button1} type="button">Accept</button>
        <button className={styles.container2__button2} type="button">Deny</button>
        <button className={styles.container2__button3} type="button">Verify License</button>
      </div>
    </div>
  );
};

export default UserPage;
