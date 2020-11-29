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
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>
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
