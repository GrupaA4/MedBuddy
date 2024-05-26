import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './log-in_page.module.css';
import Logo2 from './Logo2.png';
import Doctors from './Doctors.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    if (!email || !password) {
      setWarning('Please fill in both fields.');
    } else {
      setWarning('');
      // Redirect to admin main page
      navigate('/admin');
    }
  };

  const handleSignUpAsPatient = () => {
    console.log('Sign-up as Patient');
  };

  const handleSignUpAsDoctor = () => {
    console.log('Sign-up as Doctor');
  };

  return (
    <div className={styles.body_login}>
    <div className={styles.container}>
      <img src={Logo2} className={styles.container__image1} alt="Logo2" />
      <img src={Doctors} className={styles.container__image2} alt="Doctors" />
      <div className={styles.square}>
        <p className={styles.square__title}>LOGIN</p>
        <form onSubmit={handleLogin}>
          <div className={styles.square__form}>
            <label htmlFor="email" className={styles.square__form__text}>Email</label><br />
            <input
              type="text"
              className={styles.square__form__label}
              placeholder="USER@EMAIL.COM"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><br /><br />
            <label htmlFor="password" className={styles.square__form__text}>Password</label><br />
            <input
              type="password"
              className={styles.square__form__label}
              placeholder="Enter Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br /><br />
            <button className={styles.square__form__button1} type="submit">LOGIN</button><br /><br />
            <button
              className={styles.square__form__button2}
              type="button"
              onClick={handleSignUpAsPatient}
            >
              SIGN-UP AS PATIENT
            </button>
            <button
              className={styles.square__form__button3}
              type="button"
              onClick={handleSignUpAsDoctor}
            >
              SIGN-UP AS DOCTOR&ensp;
            </button>
          </div>
        </form>
        {warning && <p className={styles.square__warning} id="myWarning">{warning}</p>}
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
