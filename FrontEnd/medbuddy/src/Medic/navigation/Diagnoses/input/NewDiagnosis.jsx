
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './EditableInput.css';
import ButtonIcon from './ButtonIcon';
import { mdiPencil } from '@mdi/js';
import EditableInput from "./EditableInput";



function NewDiagnosis(){
    return(
<div className="new_diagnoses_section__diagnose">
<div className="diagnoses_section__diagnose_column">
  <div className="diagnoses_section__diagnose_medication">
    <div className="diagnoses_section__diagnose_medication_bold">
      Diagnosis:
    </div>
    <input className="diagnoses-input" type='text'></input>
  </div>
  <div className="diagnoses_section__diagnose_medication">
    <div className="diagnoses_section__diagnose_medication_bold">
      Medication:
    </div>
    <input className="diagnoses-input" type='text'></input>
  </div>
</div>
<div className="new-diagnoses-button-section">
  <button className="diagnoses-button">Cancel</button>
  <button className="diagnoses-button">Save</button>
  </div>
</div>
    );
}

export default NewDiagnosis;