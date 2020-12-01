import React from 'react';
import fire from '../../fire';

const currentGameRef = fire.database().ref('current_game_information');

const EndGameButton = (props) => {
  const endGame = () => {
    fire.database().ref('game_history').push(props.currentGameInformation);
    currentGameRef.child('status').set('waiting for players');
    Object.keys(props.currentGameInformation.players).forEach(playerID => currentGameRef.child('players').child(playerID).child('vote').remove());
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
