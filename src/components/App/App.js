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
  const [countTry, setCountTry]= useState(0);

  useEffect(() => {
      PokemonsApi.getAllPokemons()
      .then((res) => {
        setUnUsedPokemons(res.results);
        setAllPokemons(
          res.results.map((el, id) => {
          el.image = PokemonsApi.getImage(id+1);
          el.isUsed = false;
          el._id = id;
          return el;
        })
      );
      })
    .catch((err) => console.log(err)); 
  }, []);

  function handleScreen(isGame) {
    setIsGameScreen(isGame);
  }

  function getRandomCard() {
    setCountTry(countTry+1);
    const randomInt = getRandom(unUsedPokemons.length);
    const elemID = unUsedPokemons[randomInt]._id;
    allPokemons[elemID].isUsed = true;
    setUnUsedPokemons(unUsedPokemons.filter(item => !item.isUsed));
    return unUsedPokemons[randomInt];
  }

  function addScore() {
    setScore(score+1);
  }

  function resetGame() {
    setScore(0);
    setCountTry(0);
    isGameScreen(true);
  }

  function backToStart() {
    setIsGameScreen(false);
    resetGame();
  }

  function resetResult() {
    removeLocal('totalScore');
    backToStart();
  }

  function finishGame() {
    const prevResult = getLocal('totalScore') || 0;
    if (score > prevResult) {
      setLocal('totalScore', score);
    }

    return <FinishScreen 
              score={score} 
              prevResult = {prevResult} 
              onSubmit={resetGame} 
              backToStart={backToStart}
              resetResult = {resetResult}
            />
  }





  return (
    <div className="App">
      { !isGameScreen && <InfoScreen onSubmit={handleScreen}/>}   
      { isGameScreen && countTry <= 10 && <GameScreen onSubmit={handleScreen} getRandomCard = {getRandomCard} addScore = {addScore} score={score}/>}  
      { countTry > 10 && finishGame()}
    </div>
  );
}

export default App;
