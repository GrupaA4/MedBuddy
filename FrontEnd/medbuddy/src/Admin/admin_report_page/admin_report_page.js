import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './admin_report_page.module.css';
import Logo from '../assets/MedBuddy.png';

const AdminReportPage = () => {
  const navigate = useNavigate();

  const redirectTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Add any required effect here
  }, []);

  return (
    <div className={styles.body_admin_report_page}>
      <div className={styles.header}>
        <img src={Logo} className={styles.header__image} alt="Your image" />
        <div className={styles.header__paragraph}>
          <a onClick={() => navigate('/admin')} className={styles.header__paragraph__part}>Home</a>
          <a onClick={redirectTop} className={styles.header__paragraph__part} style={{ textDecoration: 'underline', textDecorationColor: '#369986' }}>Report</a>
          <a onClick={() => navigate('/user')} className={styles.header__paragraph__part}>Manage Accounts</a>
        </div>
      </div>

      <div className={styles.container1_admin_report_page} id="current_users">
        <div className={styles.container1_admin_report_page__header}>
          <p className={styles.container1_admin_report_page__header__text}>Reported accounts</p>
          <div className={styles.container1_admin_report_page__buttons}>
            <button className={styles.container1_admin_report_page__before}>&#8678;</button>
            <button className={styles.container1_admin_report_page__next}>&#8680;</button>
          </div>
        </div>

        {[...Array(5).keys()].map(i => (
          <div key={i} className={styles.container1_admin_report_page__square}>
            <div className={styles.container1_admin_report_page__square__icon}>
              <p>PHOTO</p>
            </div>
            <p className={styles.container1_admin_report_page__square__data}>
              NAME: <span className={styles.name}>Example Name {i + 1}</span><br />
              EMAIL: <span className={styles.email}>example{i + 1}@domain.com</span><br />
              PHONE NUMBER: <span className={styles.phoneNumber}>123-456-789{i + 1}</span><br />
            </p>
            <div className={styles.container1_admin_report_page__square__data__buttons}>
              <button className={styles.container1_admin_report_page__button1} type="button">Report</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.container2_admin_report_page}>
        <div className={styles.icon__and__text}>
          <div className={styles.container2_admin_report_page__square1__icon}>
            <p>PHOTO</p>
          </div>
          <div className={styles.container2_admin_report_page__text}>NAME: Example of name</div>
        </div>
        <button className={styles.container2_admin_report_page__button1} type="button">Report</button>
      </div>
    </div>
  );
};


export default AdminReportPage;
