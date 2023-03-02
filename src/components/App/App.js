import React, { useState, useEffect } from 'react';
import './App.css';
import PokemonsApi from '../../utils/pokeApi';
import InfoScreen from '../InfoScreen/InfoScreen';
import GameScreen from '../GameScreen/GameScreen';
import FinishScreen from '../FinishScreen/FinishScreen';
import { getRandom, setLocal, getLocal, removeLocal } from '../../utils/utils'

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [unUsedPokemons, setUnUsedPokemons] = useState([]);
  const [isGameScreen, setIsGameScreen] = useState(false);
  const [score, setScore] = useState(0);
  const [countTry, setCountTry] = useState(0);

  useEffect(() => {
    PokemonsApi.getAllPokemons()
      .then((res) => {
        setUnUsedPokemons(res.results);
        setAllPokemons(
          res.results.map((el, id) => {
            el.image = PokemonsApi.getImage(id + 1);
            el._id = id;
            return el;
          })
        );
      })
      .catch((err) => console.log(err));
  }, []);

  function handleScreen() {
    resetGame(true);
  }

  function getRandomCard() {
    setCountTry(countTry + 1);
    const randomInt = getRandom(unUsedPokemons.length);
    const elemID = unUsedPokemons[randomInt]._id;
    allPokemons[elemID].isUsed = true;
    setUnUsedPokemons(allPokemons.filter(item => !item.isUsed));
    return unUsedPokemons[randomInt];
  }

  function addScore() {
    setScore(score + 1);
  }

  function resetGame(isGame) {
    setScore(0);
    setCountTry(0);
    setIsGameScreen(!!isGame);
    setAllPokemons(updateIsUsed());
  }

  function backToStart() {
    resetGame();
  }

  function resetResult() {
    removeLocal('totalScore');
    backToStart();
  }

  function updateIsUsed() {
    return allPokemons.map(el => {
      el.isUsed = false;
      el.isRight = false;
      return el;
    });
  }

  function finishGame() {
    const prevResult = getLocal('totalScore') || 0;
    if (score > prevResult) {
      setLocal('totalScore', score);
    }

    return <FinishScreen
      score={score}
      prevResult={prevResult}
      onSubmit={handleScreen}
      backToStart={backToStart}
      resetResult={resetResult}
    />
  }

  return (
    <div className="App">
      {!isGameScreen && <InfoScreen onSubmit={handleScreen} />}
      {isGameScreen && countTry <= 10 && <GameScreen backToStart={backToStart} getRandomCard={getRandomCard} addScore={addScore} score={score} />}
      {countTry > 10 && finishGame()}
    </div>
  );
}

export default App;
