import React, { useState } from 'react';
import './Diagnoses.css';
import Panel from '../common-components/panel.svg';
import Navbar from '../common-components/Navbar';
import Footer from '../common-components/Footer';
import EditableInput from './input/EditableInput';


 function Diagnostic() {
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  // Sample data for diagnoses and medications
  const [diagnoses, setDiagnoses] = useState([
    { title: 'Hypertension', medication: 'Lisinopril (10 mg once daily)', doctor: 'Med Buddy', date: '17/09/2023' },
    { title: 'Type 2 Diabetes Mellitus', medication: 'Metformin (500 mg twice daily with meals)', doctor: 'Dr. Andrei Ionescu', date: '05/12/2023' }
  ]);

  // Handlers for updating the fields
  const handleTitleChange = (index, newValue) => {
    const updatedDiagnoses = diagnoses.map((diagnosis, i) => (i === index ? { ...diagnosis, title: newValue } : diagnosis));
    setDiagnoses(updatedDiagnoses);
  };

  const handleMedicationChange = (index, newValue) => {
    const updatedDiagnoses = diagnoses.map((diagnosis, i) => (i === index ? { ...diagnosis, medication: newValue } : diagnosis));
    setDiagnoses(updatedDiagnoses);
  };

return (
    <>
    <Navbar/>
    {!isMobileMenu &&(
            <>
                <section className="introduction_section">
                    <div className="introduction_section__text">
                        <h1 className="introduction_section__text_title">
                            Patient's Diagnoses
                        </h1>
                        <div className="introduction_section__text_description">
                        The Diagnoses Page offers doctors a concise summary of past diagnoses and prescribed medications for a patient, 
                        complete with the prescribing doctor's details and dates, facilitating a clear and contextual review of their medical history.
                        <br/>
                        Doctors can also alter the medication and diagnosis fields, ensuring that the patient's records are accurate and up-to-date based on the latest medical assessments and treatments.
                        </div>
                    </div>
                    <img className="introduction_section__image" src={Panel} alt= "An image"/>
                </section>

                <section className="diagnoses_section">
            {diagnoses.map((diagnosis, index) => (
              <div key={index} className="diagnoses_section__diagnose">
                 <div className="diagnoses_section__diagnose_column">
                 <div className="diagnoses_section__diagnose_medication">
                 <div className="diagnoses_section__diagnose_medication_bold">Diagnosis:</div>
                   <EditableInput
                    value={diagnosis.title}
                     onBlur={(newValue) => handleTitleChange(index, newValue)}
                  />
                  </div>
                  <div className="diagnoses_section__diagnose_medication">
                     <div className="diagnoses_section__diagnose_medication_bold">Medication:</div>
                     <EditableInput
                       value={diagnosis.medication}
                      onBlur={(newValue) => handleMedicationChange(index, newValue)}
                    />
                 </div>
                 </div>
                 <div className="diagnoses_section__diagnose_column">
                   {diagnosis.doctor}
                 </div>
                 <div className="diagnoses_section__diagnose_column">
                   {diagnosis.date}
                 </div>
               </div>
             ))}
           </section>
         </>
       )}
    <Footer/>
    </>
)
}

export default Diagnostic;