import React, { useState, useEffect } from 'react';
import './Button.css';

function Button({ textContent, onSubmit, isAnswered = false, isRight }) {

  function onChangeCheckbox() {
    onSubmit(isRight);
  };

  return (
    <button onClick={onChangeCheckbox} disabled={isAnswered}>{textContent}</button>
  );
}

export default Button;
