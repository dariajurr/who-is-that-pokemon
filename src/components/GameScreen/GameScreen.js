import React, { useState, useEffect } from 'react';
import './GameScreen.css';
import Button from '../Button/Button';
import Card from '../Card/Card';

function GameScreen({ backToStart, getRandomCard, addScore, score }) {
    const [randomePokemon, setRandomePokemon] = useState({});
    const [variables, setVariables] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);

    useEffect(() => {
        const currentCard = updateRandomCard();
        getVariables(currentCard);
    }, []);

    function getVariables(currentCard) {
        const arrayVariables = [];

        for (let i = 0; i < 3; i++) {
            arrayVariables.push(getRandomCard());
        }

        arrayVariables.push(currentCard);

        arrayVariables.sort(function (a, b) {
            if (a._id > b._id) {
                return 1;
            }
            if (a._id < b._id) {
                return -1;
            }
        });

        setVariables(arrayVariables);
    }

    function updateRandomCard() {
        const randomCard = getRandomCard();
        randomCard.isRight = true;
        setRandomePokemon(randomCard);
        return randomCard;
    }

    function updateVariables() {
        getVariables(updateRandomCard());
        setIsAnswered(false);
    }

    function checkAnswer(elem) {
        setIsAnswered(true);
        if (elem) {
            console.log(`yes`);
            addScore();
        } else {
            console.log(`no`);
        }
    }

    function onChangeScreen() {
        backToStart();
    };

    return (
        <>
            <p>Score: {score}</p>
            <Card pokemonInfo={randomePokemon} />
            <div>
                {variables.map((elem, id) =>
                    <Button textContent={elem.name} key={elem._id + id} onSubmit={checkAnswer} isAnswered={isAnswered} isRight={elem.isRight || false} />
                )
                }
            </div>
            <Button textContent={`Next!`}
                onSubmit={updateVariables}
                isAnswered={!isAnswered}
            />
            <Button textContent={`Let's back...`}
                onSubmit={onChangeScreen}
            />
        </>
    );
}

export default GameScreen;
