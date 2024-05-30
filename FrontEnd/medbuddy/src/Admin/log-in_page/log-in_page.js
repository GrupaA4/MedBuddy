import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import styles from './log-in_page.module.css';
import Logo2 from './Logo2.png';
import Doctors from './Doctors.png';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
  const [type, setType]=useState('');
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    if (!email || !password) {
      setWarning('Please fill in both fields.');
    } else {
      //setWarning('');
    
      const credentials = btoa(`${email}:${password}`);

      try{
        const response = await fetch('http://localhost:7264/medbuddy/login',{
          method: 'GET',
          headers: {
            'Authorization': `Basic ${credentials}`
          }
        });

        if(response.ok){
          const result= await response.json();
          setType(result.type);

          switch (result.type) {
            case 'Admin':
              navigate('/admin');
              break;
            case 'Medic':
              navigate('/mainPageMedic');
              break;
            case 'Patient':
              navigate('/registerPatient');
              break;
            default:
              setWarning('Unexpected user type.');
          }


        }
        else{
          if(response.status===401){
            setWarning('Email or password are incorect. ');

          }
          else{
            setWarning(`Error: ${response.statusText}`);
          }
        }
      }catch (error){
        setWarning('An error occurred during login.');
        console.error('Login error:', error);
      }
      
    }


  };

  const handleSignUpAsPatient = () => {
    navigate('/registerPatient')
  };

  const handleSignUpAsDoctor = () => {
    navigate('/register')
  };

  return (
    <div className={styles.body_login}>
    <div className={styles.login_container}>
      <img src={Logo2} className={styles.login_container__image1} alt="Logo2" />
      <img src={Doctors} className={styles.login_container__image2} alt="Doctors" />
      <div className={styles.login_square}>
        <p className={styles.login_square__title}>LOGIN</p>
        <form onSubmit={handleLogin}>
          <div className={styles.login_square__form}>
            <label htmlFor="email" className={styles.login_square__form__text}>Email</label><br />
            <input
              type="email"
              className={styles.login_square__form__label}
              placeholder="USER@EMAIL.COM"
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><br /><br />
            <label htmlFor="password" className={styles.login_square__form__text}>Password</label><br />
            <input
              type="password"
              className={styles.login_square__form__label}
              placeholder="Enter Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br /><br />
            {warning && <p style={{ color: 'red' }}>{warning}</p>}
            <button className={styles.login_square__form__button1} type="submit">LOGIN</button><br /><br />
            <button
              className={styles.login_square__form__button2}
              type="button"
              onClick={handleSignUpAsPatient}
            >
              SIGN-UP AS PATIENT
            </button>
            <button
              className={styles.login_square__form__button3}
              type="button"
              onClick={handleSignUpAsDoctor}
            >
              SIGN-UP AS DOCTOR
            </button>
          </div>
        </form>
     
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
