import React, { useState, useEffect } from 'react';
import styles from './page.module.scss';
import '../../fonts/Bebas_Neue/BebasNeue-Regular.ttf';
import Panel from '../../images/panel.svg';
import Header from '../../_componentsReusable/header/page';
import Footer from '../../_componentsReusable/footer/page';

export default function Diagnostic() {
    const [isMobileMenu, setIsMobileMenu] = useState(false);
    const [diagnoses, setDiagnoses] = useState([]);
    const [userId, setUserId] = useState("");

    const getCookieValue = (name) => {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        for(const cookie of cookies) {
            if(cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }
    const emailFromCookie = getCookieValue('user_email');
    const passwordFromCookie = getCookieValue('user_pass');
    const authorisation = btoa(`${emailFromCookie}:${passwordFromCookie}`);
    
    useEffect(() => {
        const fetchUserId = async() => {
            try {
                const response = await fetch(`http://localhost:7264/medbuddy/getuserid/${emailFromCookie}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Basic ${authorisation}`
                    }
                }); 
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserId(data.id);
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        }
        fetchUserId();
    }, [emailFromCookie, authorisation]);

    useEffect(() => {
        if (userId) {
            const fetchDiagnoses = async () => {
                try {
                    const response = await fetch(`http://localhost:7264/medbuddy/getusermedicalhistory/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Basic ${authorisation}`
                        }
                    }); 
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setDiagnoses(data);
                } catch (error) {
                    console.error('Error fetching diagnoses:', error);
                }
            };
            fetchDiagnoses();
        }
    }, [userId, authorisation]);

    return (
        <>
            <Header setIsMobileMenu={setIsMobileMenu} />
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
                        <img className={`${styles.introduction_section__image}`} src={Panel} alt="An image" />
                    </section>

                    <section className={`${styles.diagnoses_section}`}>
                        {diagnoses.map((diagnosis) => (
                            <div key={diagnosis.id} className={`${styles.diagnoses_section__diagnose}`}>
                                <div className={`${styles.diagnoses_section__diagnose_column}`}>
                                    <div className={`${styles.diagnoses_section__diagnose_title}`}>
                                        {diagnosis.diagnose}
                                    </div>
                                    <div className={`${styles.diagnoses_section__diagnose_medication}`}>
                                        <div className={`${styles.diagnoses_section__diagnose_medication_bold}`}>
                                            Medication: 
                                        </div>
                                        <div className={`${styles.diagnoses_section__diagnose_medication_name}`}>
                                            {diagnosis.treatment}
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.diagnoses_section__diagnose_column}`}>
                                    {diagnosis.name}
                                </div>
                                <div className={`${styles.diagnoses_section__diagnose_column_date}`}>
                                    {diagnosis.date_treatment}
                                </div>
                            </div>
                        ))}
                    </section>
                </>
            }
            <Footer />
        </>
    );
}
