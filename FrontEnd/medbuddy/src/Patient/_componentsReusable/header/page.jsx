import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; 
import styles from './page.module.scss';
import Logo from '../../images/MedBuddy_bg_boarder (1).svg';
import profilePic from '../../images/profile.svg';

export default function Header({setIsMobileMenu}) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenu(!isMobileMenuOpen);
    setIsMobileMenuOpen(prevState => !prevState);
  };

  const closeMobileMenu = () => {
    setIsMobileMenu(false)
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={styles.page__header}>
      <Link className={styles.page} to="/" onClick={closeMobileMenu}><img className={styles.page__header_logo} src={Logo} alt="IMAGINE"/></Link>
        <nav className={`${styles.page__header_navbar} ${isMobileMenuOpen ? styles.show : ''}`}>
        <Link className={`${styles.page__header_navbar_link} ${location.pathname === "/" ? styles.active : ""}`} to='/' onClick={closeMobileMenu}>Home</Link>
        <Link className={`${styles.page__header_navbar_link} ${location.pathname === "/about" ? styles.active : ""}`} to='/about' onClick={closeMobileMenu}>About</Link>
        <Link className={`${styles.page__header_navbar_link} ${location.pathname === "/contact" ? styles.active : ""}`} to='/contact' onClick={closeMobileMenu}>Contact</Link>
        <Link className={`${styles.page__header_navbar_link} ${location.pathname === "/chat" ? styles.active : ""}`} to='/chat' onClick={closeMobileMenu}>MedBuddy</Link>
        <Link className={styles.page} to="/profile" onClick={closeMobileMenu}> <img className={styles.page__header_navbar_profilepic} src={profilePic} alt='profile pic'/></Link>
        </nav>
        <div className={styles.page__header_menu_button} onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className={styles.page__header_hamburger} />
        </div>
        <div className={`${styles.pages} ${isMobileMenuOpen ? styles.pages_show : ''}`}>
          <Link className={styles.page} to="/" onClick={closeMobileMenu}>Home</Link>
          <Link className={styles.page} to="/about" onClick={closeMobileMenu}>About</Link>
          <Link className={styles.page} to="/contact" onClick={closeMobileMenu}>Contact</Link>
          <Link className={styles.page} to="/chat" onClick={closeMobileMenu}>MedBuddy</Link>
          <Link className={styles.page} to="/profile" onClick={closeMobileMenu}>Profile</Link>
        </div>
      </header>
    </>
  );
}