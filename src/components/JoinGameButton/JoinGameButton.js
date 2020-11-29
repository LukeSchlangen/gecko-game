import React from 'react';
import fire from '../../fire';

const currentGameRef = fire.database().ref('current_game_information');

const JoinGameButton = (props) => {
  const joinGame = () => {
    currentGameRef
      .child('players')
      .child(props.user.uid)
      .set(props.user);
  }

  return (
    <div className="selection-board start-game-button">
      <button
        className="selection-button"
        onClick={joinGame}
      >
        <span className="start-game">
          Join Game
      </span>
      </button>
    </div>
  );
}

export default JoinGameButton;
