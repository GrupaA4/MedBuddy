import './Diagnoses.css';
import React, { useState } from 'react';
import Footer from '../common-components/Footer' ;
import Navbar from '../common-components/Navbar' ;
import Panel from '../common-components/panel.svg';

function Diagnoses(){

    const [isMobileMenu, setIsMobileMenu] = useState(false);
    return (
        <>
        <Navbar/>
        {!isMobileMenu &&
                <>
                    <section className="introduction_section">
                        <div className="introduction_section__text">
                            <h1 className="introduction_section__text_title">
                                My Diagnoses
                            </h1>
                            <div className="introduction_section__text_description">
                            The Diagnoses Page provides patients with a concise summary of past diagnoses and prescribed medications, 
                            complete with the prescribing doctor's details and dates, facilitating a clear and contextual review of their medical history.
                            </div>
                        </div>
                        <img className="introduction_section__image" src={Panel} alt= "An image"/>
                    </section>

                    <section className="diagnoses_section">
                        <div className="diagnoses_section__diagnose">
                            <div className="diagnoses_section__diagnose_column">
                                <div className="diagnoses_section__diagnose_title">
                                    Hypertension
                                </div>
                                <div className="diagnoses_section__diagnose_medication">
                                    <div className="diagnoses_section__diagnose_medication_bold">
                                        Medication: 
                                    </div>
                                    <div className="diagnoses_section__diagnose_medication_name">
                                        Lisinopril (10 mg once daily)
                                    </div>
                                </div>
                            </div>
                            <div className="diagnoses_section__diagnose_column">
                                Med Buddy
                            </div>
                            <div className="diagnoses_section__diagnose_column">
                                17/09/2023
                            </div>
                        </div>
                        <div className="diagnoses_section__diagnose">
                            <div className="diagnoses_section__diagnose_column">
                                <div className="styles.diagnoses_section__diagnose_title">
                                Type 2 Diabetes Mellitus
                                </div>
                                <div className="diagnoses_section__diagnose_medication">
                                    <div className="diagnoses_section__diagnose_medication_bold">
                                        Medication: 
                                    </div>
                                    <div className="diagnoses_section__diagnose_medication_name">
                                        Metformin (500 mg twice daily with meals)
                                    </div>
                                </div>
                            </div>
                            <div className="diagnoses_section__diagnose_column">
                                Dr. Andrei Ionescu 
                            </div>
                            <div className="diagnoses_section__diagnose_column">
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

export default Diagnoses;