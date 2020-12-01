import React, { useEffect, useState } from 'react';
import PlayerInGameView from '../PlayerInGameView/PlayerInGameView';
import JoinGameButton from '../JoinGameButton/JoinGameButton';
import LeaveGameButton from '../LeaveGameButton/LeaveGameButton';
import StartGameButton from '../StartGameButton/StartGameButton';
import EndGameButton from '../EndGameButton/EndGameButton';
import fire from '../../fire';
import './Player.css';
import PlayerList from '../PlayerList/PlayerList';
import Timer from '../Timer/Timer';

const currentGameRef = fire.database().ref('current_game_information');

function msToTime(duration) {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);

  const displayMinutes = (minutes < 10) ? "0" + minutes : minutes;
  const displaySeconds = (seconds < 10) ? "0" + seconds : seconds;

  return displayMinutes + ":" + displaySeconds;
}

const Player = props => {
  const [currentGameInformation, setCurrentGameInformation] = useState({ players: {} });
  useEffect(() => {
    currentGameRef.on('value', (snapshot) => {
      const rawCurrentGameData = snapshot.val();
      console.log(rawCurrentGameData);
      const playersBeforeVoteTally = rawCurrentGameData.players ? Object.values(rawCurrentGameData.players).reduce((aggregatePlayers, player) => ({ ...aggregatePlayers, [player.uid]: { ...player, votesAgainst: 0 } }), {}) : {}
      const playersWithVotesAgainst = Object.values(rawCurrentGameData.players).reduce((aggregatePlayers, currentPlayerVoting) => {
        if (currentPlayerVoting.vote) return { ...aggregatePlayers, [currentPlayerVoting.vote]: { ...aggregatePlayers[currentPlayerVoting.vote], votesAgainst: aggregatePlayers[currentPlayerVoting.vote].votesAgainst + 1 } }
        return aggregatePlayers;
      }, playersBeforeVoteTally);
      const gameInformationWithVotes = {
        ...rawCurrentGameData,
        players: playersWithVotesAgainst,
      };
      setCurrentGameInformation(gameInformationWithVotes);
    });
  }, []);

  const playerIsInGame = Object.keys(currentGameInformation?.players || {}).includes(props?.user?.uid);
  const gameIsInProgress = currentGameInformation?.status === 'in progress';

  if (gameIsInProgress && playerIsInGame) {
    return <>
      <PlayerInGameView currentGameInformation={currentGameInformation} {...props} />
      <hr />
      <Timer currentGameInformation={currentGameInformation} {...props} />
      <PlayerList currentGameInformation={currentGameInformation} {...props} />
      <hr />
      <EndGameButton currentGameInformation={currentGameInformation} {...props} />
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
