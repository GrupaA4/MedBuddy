
import React, { useState} from 'react';
import Cookies from "js-cookie";




function NewDiagnosis(props){
    const [diagnoses, setDiagnoses] = useState("");
    const [medication, setMedication] = useState("");
    const [validationError, setValidationError] = useState(false);

    
    const handleAddNew = async(event) => {

        event.preventDefault();

        if (!diagnoses || !medication) {
            setValidationError(true); // Setarea variabilei de stare pentru validare
            return; // Nu continua cu salvarea dacă unul sau ambele câmpuri sunt goale
        }

        const email = Cookies.get("user_email");
        const password = Cookies.get("user_pass");
    
        const credentials = btoa(`${email}:${password}`);

        const data={
            diagnosis: diagnoses,
            treatment: medication
        };
        console.log('Data to be sent:', data);
        
        try {
          const response = await fetch(
            `http://localhost:7264/medbuddy/addmedicalhistoryentry/${props.id}`,
            {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`
              },
              body: JSON.stringify(data),
            });
            window.location.reload();
            if(response.status !== 201){
                if(response.status === 418 || response.status === 500){
                    throw new Error('Internal backend error');
                }
                else if(response.status === 401){
                    throw new Error('Wrong email and password in the header');
                }
                else if(response.status === 400){
                    throw new Error('Typo in the URL or not the right path variable type');
                }
                else if(response.status === 403){
                    throw new Error('Another user with this email exists');
                }
                else{
                    throw new Error('Unknown error');
                }
            }
            else{
                console.log('New diagnosis and treatement added!');
            }
           // window.location.href='/diagnosesMedic/:' + props.id ;
          

    }catch (error) {
       // console.error('Error',error);
       // window.alert('An error occured.Please try again later.');
    }
}

    return(
        <div className="new_diagnoses_section">
<div className="new_diagnoses_section__diagnose">
<div className="diagnoses_section__diagnose_column">
  <div className="diagnoses_section__diagnose_medication">
    <div className="diagnoses_section__diagnose_medication_bold">
      Diagnosis:
    </div>
    <input
    className={`diagnoses-input ${validationError && !diagnoses ? 'error' : ''}`} 
     type='text'
     onChange={(e)=>setDiagnoses(e.target.value)}
     />
  </div>
  <div className="diagnoses_section__diagnose_medication">
    <div className="diagnoses_section__diagnose_medication_bold">
      Medication:
    </div>
    <input 
    className={`diagnoses-input ${validationError && !medication ? 'error' : ''}`}  
    type='text'
    onChange={(e)=>setMedication(e.target.value)}/>
  </div>
</div>
<div className="new-diagnoses-button-section">

  <button className="diagnoses-button" onClick={handleAddNew}>Save</button>
  </div>
</div>
</div>
    );

}

export default NewDiagnosis;