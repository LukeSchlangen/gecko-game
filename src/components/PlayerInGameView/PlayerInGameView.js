import React, { Component } from 'react';
import fire from '../../fire';
import './PlayerInGameView.css';

const PlayerInGameView = (props) => {
  const currentGameRef = fire.database().ref('current_game_information');
  const endGame = () => {
    currentGameRef.child('status').set('waiting for players');
  }
  return (
    <>
      { props?.currentGameInformation?.geckoPlayerID === props.user.uid ? 'You are the Gecko!' : `You are not the gecko. The secret word is ${props?.currentGameInformation?.secretWord}` }
      <p>
        The words are:
      </p>
      <ul>
        {props?.currentGameInformation?.allWords.map((word) => (<li key={word}>{word}</li>))}
      </ul>
      <div className="selection-board start-game-button">
        <button
          className="selection-button"
          onClick={() => endGame()}
        >
          <span className="start-game">
            End Game
          </span>
        </button>
      </div>
    </>
  )
}

export default PlayerInGameView;
