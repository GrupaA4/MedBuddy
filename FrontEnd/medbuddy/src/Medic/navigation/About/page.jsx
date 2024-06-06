import React, { useState } from "react";
import styles from "./page.module.scss";
import Header from '../common-components/Navbar';
import Footer from '../common-components/Footer';

const Section = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.container__section} ${isOpen ? styles.active : ''}`}>
      <div className={styles.container__sectionTitle}>
        <div className={styles.container__sectionTitleText}>{title}</div>
        <button className={styles.container__sectionDropdownButton} onClick={toggleDropdown}>
          <span className={styles.container__sectionDropdownArrow}>&#9660;</span>
        </button>
      </div>
      {isOpen && <div className={`${styles.container__sectionText} ${styles.dropdownContent} ${isOpen ? styles.active : ''}`}>{content}</div>}
    </div>
  );
};

const Container = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>About MedBuddy</h1>
      <div className={styles.container__cards}>
        <Section 
          title="What do we do?" 
          content="Our primary offering is a virtual assistant that leverages AI to provide diagnostic insights based on user conversations. The virtual assistant is designed to help users understand their symptoms and guide them towards appropriate medical care." 
        />
        <Section 
          title="How It Works" 
          content={
            <ul>
              <li><strong>Chat with MEdBuddy:</strong> Our virtual assistant, MedBuddy, is available 24/7 to discuss your symptoms. MedBuddy can provide preliminary diagnoses based on the information you provide.</li>
              <li><strong>Receive a Diagnosis:</strong> After your interaction with MedBuddy, you will receive a suggested diagnosis that helps you understand your potential health issues. After this, you can continue the discussion with the right doctor using your email.</li>
              <li><strong>Medical Review:</strong> Your diagnosis is then reviewed,verified and updated by a licensed medical professional to ensure accuracy and provide you with the best possible care.</li>
            </ul>
          }
        />
        <Section 
          title="Who are we?" 
          content="MedBuddy is a revolutionary health technology company committed to making healthcare accessible and efficient for everyone. Our team includes top-tier doctors, skilled engineers, and dedicated support staff who are passionate about integrating advanced technology with healthcare. We aim to empower individuals with the tools they need to manage their health effectively." 
        />
      </div>
    </div>
  );
};

export default function About() {
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  return (
    <div className="AboutPage">
    <div className={styles.body__content}>
      <div className={styles.nav_container_about}>
      <Header  setIsMobileMenu={setIsMobileMenu} />
      </div>
      {!isMobileMenu && (
        
          <Container />
          
        
      )}
    </div>
    <Footer/>
    </div>
  );
}
