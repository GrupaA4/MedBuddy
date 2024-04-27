import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
import styles from './page.module.scss';
import '../../fonts/Bebas_Neue/BebasNeue-Regular.ttf';
import BrainVector from '../../images/brain_vector.svg';
import TechImg from '../../images/tech_image.svg';
import Header from '../../_components/header/page';
import Footer from '../../_components/footer/page'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Home(){
    const [feedback, setFeedback] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    
    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //trimitere form - vor fi
        console.log({
            firstName: firstName,
            lastName: lastName,
            email: email,
            feedback: feedback
        });

        //resetare form
        setFeedback('');
        setFirstName('');
        setLastName('');
        setEmail('');
        
    };

    const [isMobileMenu, setIsMobileMenu] = useState(false);

    return (
        <> 
        <Header setIsMobileMenu={setIsMobileMenu}/>
        {!isMobileMenu &&
        <>
            <section className={`${styles.welcome_section}`}>
                <div className={`${styles.welcome_section__text}`}>
                    <h1 className={`${styles.welcome_section__title}`}>
                        Welcome to MedBuddy!<br/>
                        Your Health, Your Journey, Our Guidance
                    </h1>
                    <p className={`${styles.welcome_section__subtitle}`}>Experience Personalized Care, Anytime, Anywhere. We Got You!</p>
                </div>
                <img className={`${styles.welcome_section__image}`} src={BrainVector} alt='Cute Brain that can be yours'/>
            </section>
            <section className={`${styles.motivation_section}`}>
                <div className={`${styles.motivation_section__text}`}>
                    <h1 className={`${styles.motivation_section__title}`}>
                        We Can Be Trusted! 
                    </h1>
                    <p className={`${styles.motivation_section__subtitle}`}>
                        Transform your life with artificial intelligence! Our model is created by the best engineers and enriched with the knowledge of thousands of health experts, ensuring you an extraordinary experience! 
                    </p>
                </div>
                <img className={`${styles.motivation_section__image}`} src={TechImg} alt='Beautiful'/>
            </section>
            <section className={`${styles.get_started_section}`}>
                <div className={`${styles.get_started_section__text}`}>
                    <h1 className={`${styles.get_started_section__title}`}>
                        What are you waiting for?
                    </h1>
                    <p className={`${styles.get_started_section__subtitle}`}>Start a conversation  with our Virtual Assistant!</p>
                </div>
                <button type="submit" className={`${styles.get_started_section__btn}`}>
                    Click Here To Start <FontAwesomeIcon icon={faArrowRight} className={styles.get_started_section__btn_icon}/>
                </button>
            </section>
            <section className={`${styles.form_section}`}>
                <h3 className={`${styles.form_section__title}`}>We are continuously improving! Give us a Feedback!</h3>
                <form onSubmit={handleSubmit} className={`${styles.form_section__form}`}>
                    <div className={`${styles.form__first_row}`}>
                        <div className={`${styles.form__first_row__item}`}>
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={handleFirstNameChange} required
                                placeholder="Write your name here..."
                            />
                        </div>
                        <div className={`${styles.form__first_row__item}`}>
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={handleLastNameChange} required placeholder="Write your surname here..."/>
                                
                        </div>
                    </div>
                    <div className={`${styles.form__email}`}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange} required
                            placeholder="Write your email here..."
                        />
                    </div>
                    <div className={`${styles.form__msg}`}>
                        <label htmlFor="feedback">Message:</label>
                        <textarea
                            className={`${styles.form_section__feedback_input}`}
                            value={feedback}
                            onChange={handleFeedbackChange} required
                            placeholder="Write your feedback here..."
                        ></textarea>
                    </div>
                    <button type="submit" className={`${styles.form__btn}`}>Submit</button>
                </form>
            </section>
            </>
        }
        <Footer/>
        </>
    );
}