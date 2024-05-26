import React, { useState } from 'react';
import './log-in_page.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Email:', email);
    console.log('Password:', password);

    // Example: Simple validation
    if (!email || !password) {
      setWarning('Please fill in both fields.');
    } else {
      setWarning('');
      // Redirect or handle login logic here
    }
  };

  const handleSignUpAsPatient = () => {
    // Handle sign-up as patient logic here
    console.log('Sign-up as Patient');
  };

  const handleSignUpAsDoctor = () => {
    // Handle sign-up as doctor logic here
    console.log('Sign-up as Doctor');
  };

  return (
    <div className="container">
      <img src="Logo.png" className="container__image1" alt="Your image" />
      <img src="Doctors.png" className="container__image2" alt="Your image" />
      <div className="square">
        <p className="square__title">LOGIN</p>
        <form onSubmit={handleLogin}>
          <div className="square__form">
            <label htmlFor="email" className="square__form__text">Email</label><br />
            <input
              type="text"
              className="square__form__label"
              placeholder="USER@EMAIL.COM"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><br /><br />
            <label htmlFor="password" className="square__form__text">Password</label><br />
            <input
              type="password"
              className="square__form__label"
              placeholder="Enter Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br /><br />
            <button className="square__form__button1" type="submit">LOGIN</button><br /><br />
            <button
              className="square__form__button2"
              type="button"
              onClick={handleSignUpAsPatient}
            >
              SIGN-UP AS PATIENT
            </button>
            <button
              className="square__form__button3"
              type="button"
              onClick={handleSignUpAsDoctor}
            >
              SIGN-UP AS DOCTOR&ensp;
            </button>
          </div>
        </form>
        {warning && <p className="square__warning" id="myWarning">{warning}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
