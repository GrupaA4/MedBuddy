import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
import styles from './page.module.scss';
import '../../fonts/Bebas_Neue/BebasNeue-Regular.ttf';
import Panel from '../../images/panel.svg';
import Header from '../../_componentsReusable/header/page';
import Footer from '../../_componentsReusable/footer/page';

export default function Diagnostic(){

    const [isMobileMenu, setIsMobileMenu] = useState(false);
    return(
        <>
            <Header setIsMobileMenu={setIsMobileMenu}/>
            {!isMobileMenu &&
                <>
                    <section className={`${styles.introduction_section}`}>
                        <div className={`${styles.introduction_section__text}`}>
                            <h1 className={`${styles.introduction_section__text_title}`}>
                                My Diagnoses
                            </h1>
                            <div className={`${styles.introduction_section__text_description}`}>
                            The Diagnoses Page provides patients with a concise summary of past diagnoses and prescribed medications, 
                            complete with the prescribing doctor's details and dates, facilitating a clear and contextual review of their medical history.
                            </div>
                        </div>
                        <img className={`${styles.introduction_section__image}`} src={Panel} alt= "An image"/>
                    </section>

                    <section className={`${styles.diagnoses_section}`}>
                        <div className={`${styles.diagnoses_section__diagnose}`}>
                            <div className={`${styles.diagnoses_section__diagnose_column}`}>
                                <div className={`${styles.diagnoses_section__diagnose_title}`}>
                                    Hypertension
                                </div>
                                <div className={`${styles.diagnoses_section__diagnose_medication}`}>
                                    <div className={`${styles.diagnoses_section__diagnose_medication_bold}`}>
                                        Medication: 
                                    </div>
                                    <div className={`${styles.diagnoses_section__diagnose_medication_name}`}>
                                        Lisinopril (10 mg once daily)
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.diagnoses_section__diagnose_column}`}>
                                Med Buddy
                            </div>
                            <div className={`${styles.diagnoses_section__diagnose_column}`}>
                                17/09/2023
                            </div>
                        </div>
                        <div className={`${styles.diagnoses_section__diagnose}`}>
                            <div className={`${styles.diagnoses_section__diagnose_column}`}>
                                <div className={`${styles.diagnoses_section__diagnose_title}`}>
                                Type 2 Diabetes Mellitus
                                </div>
                                <div className={`${styles.diagnoses_section__diagnose_medication}`}>
                                    <div className={`${styles.diagnoses_section__diagnose_medication_bold}`}>
                                        Medication: 
                                    </div>
                                    <div className={`${styles.diagnoses_section__diagnose_medication_name}`}>
                                        Metformin (500 mg twice daily with meals)
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.diagnoses_section__diagnose_column}`}>
                                Dr. Andrei Ionescu 
                            </div>
                            <div className={`${styles.diagnoses_section__diagnose_column}`}>
                                05/12/2023
                            </div>
                        </div>
                    </section>
                </>
            }
            <Footer/>
        </>
    )
}