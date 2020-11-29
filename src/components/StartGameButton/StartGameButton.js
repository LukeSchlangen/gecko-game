import React from 'react';
import fire from '../../fire';

const currentGameRef = fire.database().ref('current_game_information');

const StartGameButton = (props) => {
  const startGame = () => {
    currentGameRef.child('status').set('in progress');
  }

  return (
    <div className="selection-board start-game-button">
      <button
        className="selection-button"
        onClick={startGame}
      >
        <span className="start-game">
          Start Game
        </span>
      </button>
    </div>
  );
}

export default StartGameButton;
