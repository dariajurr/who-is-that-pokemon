import React, { useState, useEffect } from 'react';
import './InfoScreen.css';
import Button from '../Button/Button';

function InfoScreen({onSubmit}) {

    function onChangeScreen() {
        onSubmit(true);
    };

    return (
    <>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg`} className="App-logo" alt="logo" />
        <p>
          Отгадай максимальное количество покемонов за 10 попыток!
        </p>
        <Button textContent={`Let's go!`}
                onSubmit={onChangeScreen}
        />
    </>
      );

}

export default InfoScreen;
