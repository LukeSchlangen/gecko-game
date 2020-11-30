import React from 'react';
import fire from '../../fire';

const EndGameButton = () => {
  const currentGameRef = fire.database().ref('current_game_information');
  const endGame = () => {
    currentGameRef.child('status').set('waiting for players');
  }
  return (
    <>
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

export default EndGameButton;
