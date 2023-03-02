import React, { useState, useEffect } from 'react';
import './Card.css';
import Button from '../Button/Button';

function Card({pokemonInfo={}}) {
    const { image, name } = pokemonInfo;
    return (
    <div>
        <img src={image || ''} className="App-logo" alt="logo" />
        <p>{name || ''}</p>
    </div>
      );

}

export default Card;
