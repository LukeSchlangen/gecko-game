// Displays list of all players
// allows user to join the game
// game starts when someone clicks start game and the game status in the database is updated

import React from 'react';
import fire from '../../fire';
// import Background from '../Background/Background';
import JoinGameButton from '../JoinGameButton/JoinGameButton';
import LeaveGameButton from '../LeaveGameButton/LeaveGameButton';
import StartGameButton from '../StartGameButton/StartGameButton';
import './Lobby.css';

const currentGameRef = fire.database().ref('current_game_information');

const Lobby = (props) => {
  return (
    <div>
      {/* <Background /> */}
      <pre>
        {JSON.stringify({props, playerIsInGame}, null, 2)}
      </pre>

    </div>
  );
}

export default Lobby;
