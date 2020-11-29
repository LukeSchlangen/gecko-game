import React from 'react';
import fire from '../../fire';

const currentGameRef = fire.database().ref('current_game_information');

const LeaveGameButton = (props) => {

  const leaveGame = () => {
    currentGameRef
      .child('players')
      .child(props.user.uid)
      .remove();
  }

  return (
    <div className="selection-board start-game-button">
      <button
        className="selection-button"
        onClick={leaveGame}
      >
        <span className="start-game">
          Leave Game
        </span>
      </button>
    </div>
  );
}

export default LeaveGameButton;
