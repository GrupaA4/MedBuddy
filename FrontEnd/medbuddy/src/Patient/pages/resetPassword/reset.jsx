import React, { useState } from 'react';
import EmailPic from '../../images/reset.jpeg';
import '../../fonts/Bebas_Neue/BebasNeue-Regular.ttf';
import styles from './reset.module.scss';
import Header from '../../_componentsReusable/header/page';
import Footer from '../../_componentsReusable/footer/page';

function ResetPassword() {
  const [email, setEmail] = useState('medbuddy@gmail.com');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      alert("Password has been reset!");
    }
  };

  return (
    <div className={styles.container}>
      <Header className={styles.header} />
      <div className={styles.content}>
        <img src={EmailPic} alt="Email Pic" className={styles['email-pic']} /> 
       

        <h3 className={styles['reset-password-heading']}>Reset Password</h3>

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={handlePasswordChange}
            className={styles['new-password-input']} 
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={styles['confirm-password-input']} 
          />
          <button onClick={handleResetPassword} className={styles['reset-button']}>
            RESET
          </button>
        </div>
      <Footer className={styles.footer} />
    </div>
  );
}

export default ResetPassword;
