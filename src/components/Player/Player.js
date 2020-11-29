import React, { useEffect, useState } from 'react';
import PlayerInGameView from '../PlayerInGameView/PlayerInGameView';
import JoinGameButton from '../JoinGameButton/JoinGameButton';
import LeaveGameButton from '../LeaveGameButton/LeaveGameButton';
import StartGameButton from '../StartGameButton/StartGameButton';
import Logout from '../Logout/Logout';
import fire from '../../fire';
import './Player.css';

const currentGameRef = fire.database().ref('current_game_information');

const Player = props => {
  const [currentGameInformation, setCurrentGameInformation] = useState({});
  useEffect(() => {
    currentGameRef.on('value', (snapshot) => {
      setCurrentGameInformation(snapshot.val());
    });
  }, [currentGameRef]);

  const playerIsInGame = Object.keys(currentGameInformation?.players || {}).includes(props?.user?.uid);
  const gameIsInProgress = props?.currentGameInformation?.status === 'in progress';
  return (
    <div>
      <pre>
        {JSON.stringify(currentGameInformation, null, 2)}
      </pre>
      <Logout currentGameInformation={currentGameInformation} user={props.user} />
      {/* 
        - Player Logged out
        - Game Not Started
        - Player in game
        - Player not in game
        PlayerInGameInProgress

      */}
      {
        // check if game has started and if player is in the game
        gameIsInProgress
          ? <PlayerInGameView currentGameInformation={currentGameInformation} {...props} />
          : <span>
            {(!playerIsInGame && gameIsInProgress) ? <div>This game is already in progress. The next game should start soon!</div> :
              <>
                {playerIsInGame ? <>
                  <LeaveGameButton {...props} />
                  <StartGameButton {...props} />
                </> :
                  <JoinGameButton {...props} />
                }
              </>
            }
            {
              Object.values(props?.currentGameInformation?.players || {}).map(player => (
                <div key={player.uid} className="selection-board">
                  <button onClick={() => { }} className="selection-button">
                    {<img src={player.photoUrl || 'assets/robots/robot-1.png'} alt={player.name} className="player-image" />}
                    <div className="player-horse-name-container">
                      <div className="horse-name">
                        {player.name}
                      </div>
                    </div>
                  </button>
                </div>
              ))
            }
          </span>
      }
    </div>
  )
};

export default Player;
