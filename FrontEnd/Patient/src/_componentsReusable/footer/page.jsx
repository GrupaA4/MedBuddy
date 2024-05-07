import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './page.module.scss';
import Logo from '../../images/MedBuddy__logo-light.svg';
import facebook_icon from '../../images/facebook-icon.svg';
import twitter_icon from '../../images/twitter-icon.svg';
import '../../fonts/Oswald/static/Oswald-Bold.ttf'

export default function Footer(){
    const location = useLocation();
    return(
        <>
            <footer className={styles.page__footer}>
                <div className={`${styles.footer__main_info}`}>
                    <Link className={styles.page__logoLink} to="/pages/home"><img className={styles.page__footer__logo} src={Logo} alt="MedBuddy logo"/></Link>
                    <nav className={`${styles.page__footer__navbar}`}>
                        <Link className={`${styles.page__footer_navbar_link} ${location.pathname === "/" ? styles.active : ""}`} to='/'>Home</Link>
                        <Link className={`${styles.page__footer_navbar_link} ${location.pathname === "/pages/about" ? styles.active : ""}`} to='/pages/about'>About</Link>
                        <Link className={`${styles.page__footer_navbar_link} ${location.pathname === "/pages/contact" ? styles.active : ""}`} to='/pages/contact'>Contact</Link>
                        <Link className={`${styles.page__footer_navbar_link} ${location.pathname === "/pages/chat" ? styles.active : ""}`} to='/pages/chat'>MedBuddy</Link>
                    </nav>
                    <div className={`${styles.footer__socials}`}>
                        <Link className={styles.page__footer__link} to="/"><img className={styles.footer__socials_link} src={facebook_icon} alt="Facebook icon"/></Link>
                        <Link className={styles.page__footer__link} to="/"><img className={styles.footer__socials_link} src={twitter_icon} alt="Instagram icon"/></Link>
                    </div>
                </div>
                <div className={`${styles.footer__line}`}></div>
                <p className={`${styles.footer__rights}`}>@MedBuddy. All rights Reserved</p>
            </footer>
        </>
    );
}