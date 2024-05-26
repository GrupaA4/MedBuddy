import React, { useState } from "react";
import styles from "./page.module.scss";
import Header from '../../_componentsReusable/header/page';
import Footer from '../../_componentsReusable/footer/page';

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
          title="Who are we?" 
          content="MedBuddy is a revolutionary health technology company committed to making healthcare accessible and efficient for everyone. Our team includes top-tier doctors, skilled engineers, and dedicated support staff who are passionate about integrating advanced technology with healthcare. We aim to empower individuals with the tools they need to manage their health effectively." 
        />
        <Section 
          title="What do we do?" 
          content="Our primary offering is a virtual assistant that leverages AI to provide diagnostic insights based on user conversations. The virtual assistant is designed to help users understand their symptoms and guide them towards appropriate medical care." 
        />
        <Section 
          title="What is our mission?" 
          content="MedBuddy combines cutting-edge technology with a user-friendly interface to deliver personalized healthcare guidance. We prioritize user privacy and data security, ensuring that your health information is safe. Our goal is to empower individuals with the knowledge they need to make informed health decisions." 
        />
      </div>
    </div>
  );
};

export default function About() {
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  return (
    <div className={styles.body__content}>
      <Header setIsMobileMenu={setIsMobileMenu} />
      {!isMobileMenu && (
        <>
          <Container />
          <Footer />
        </>
      )}
    </div>
  );
}
