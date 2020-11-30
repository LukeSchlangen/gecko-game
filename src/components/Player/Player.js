import React, { useEffect, useState } from 'react';
import PlayerInGameView from '../PlayerInGameView/PlayerInGameView';
import JoinGameButton from '../JoinGameButton/JoinGameButton';
import LeaveGameButton from '../LeaveGameButton/LeaveGameButton';
import StartGameButton from '../StartGameButton/StartGameButton';
import fire from '../../fire';
import './Player.css';
import PlayerList from '../PlayerList/PlayerList';

const currentGameRef = fire.database().ref('current_game_information');

const Player = props => {
  const [currentGameInformation, setCurrentGameInformation] = useState({});
  useEffect(() => {
    currentGameRef.on('value', (snapshot) => {
      setCurrentGameInformation(snapshot.val());
    });
  }, [currentGameRef]);

  const playerIsInGame = Object.keys(currentGameInformation?.players || {}).includes(props?.user?.uid);
  const gameIsInProgress = currentGameInformation?.status === 'in progress';

  if (gameIsInProgress && playerIsInGame) {
    return <>
      <PlayerInGameView currentGameInformation={currentGameInformation} {...props} />
      <PlayerList currentGameInformation={currentGameInformation} {...props} />
    </>
  }

  if (gameIsInProgress) {
    return <>
      <div>
        This game is already in progress. The next game should start soon!
      </div>
      <PlayerList currentGameInformation={currentGameInformation} {...props} />
    </>
  }

  if (playerIsInGame) {
    return <>
      <LeaveGameButton {...props} />
      <StartGameButton currentGameInformation={currentGameInformation} {...props} />
      <PlayerList currentGameInformation={currentGameInformation} {...props} />
    </>
  }

  return <>
    <JoinGameButton {...props} />
    <PlayerList currentGameInformation={currentGameInformation} {...props} />
  </>
};

export default Player;
