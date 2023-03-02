import React from 'react';
import './FinishScreen.css';
import Button from '../Button/Button';

function FinishScreen({score, prevResult, onSubmit, backToStart, resetResult}) {
  
  return (
    <>Количесство правильных ответов:
    <p>{score}</p>
    <Button textContent={`Еще раз?`} onSubmit={onSubmit}/>
    <Button textContent={`На стартовый экран`} onSubmit={backToStart}/>
    {prevResult && <Button textContent={`Сбросить результат`} onSubmit={resetResult}/>}
    <p>{prevResult && `Ваш лучший результат ${prevResult}`}</p>
    </>
  );
}

export default FinishScreen;


