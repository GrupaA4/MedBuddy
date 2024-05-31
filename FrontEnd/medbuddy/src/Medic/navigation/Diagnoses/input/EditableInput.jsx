import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './EditableInput.css';
import ButtonIcon from './ButtonIcon';
import { mdiPencil } from '@mdi/js';

function EditableInput({ value, type = '', onBlur, ...props }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  function turnOnEditMode() {
    setIsEditMode(true);
    setTimeout(() => inputRef.current.focus(), 0); 
  }

  function handleBlur() {
    setIsEditMode(false);
    if (onBlur) {
      onBlur(inputValue); 
    }
  }

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  return (
    // <div className={`flex justify-between items-center ${css.wrapper}`}>
    <div className='wrapper'>
      <span className="input">
        <input
          ref={inputRef}
          type={type}
          value={inputValue}
          readOnly={!isEditMode}
          onClick={turnOnEditMode}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
      </span>

      {!isEditMode && (
        <ButtonIcon
          onClick={turnOnEditMode}
          // className={`hover:bg-gray-200 rounded-full ${css.button}`}
          className='button'
          path={mdiPencil}
          size={0.65}
          color="grey"
        />
      )}
    </div>
  );
}

EditableInput.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  onBlur: PropTypes.func,
};

export default EditableInput;

