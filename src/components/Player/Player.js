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
      const playersWithVotesAgainst = Object.values(rawCurrentGameData.players).reduce((aggregatePlayers, currentPlayerVoting) => {
        if (currentPlayerVoting.vote) return { ...aggregatePlayers, [currentPlayerVoting.vote]: { ...aggregatePlayers[currentPlayerVoting.vote], votesAgainst: (aggregatePlayers[currentPlayerVoting.vote].votesAgainst || 0) + 1 } }
        return aggregatePlayers;
      }, rawCurrentGameData.players || {});
      const gameInformationWithVotes = {
        ...rawCurrentGameData,
        players: playersWithVotesAgainst,
      };
      setCurrentGameInformation(gameInformationWithVotes);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if(currentGameInformation?.timer?.startedBy === props?.user?.uid) {
        const timeElapsed = Date.now() - currentGameInformation?.timer?.startTime;
        const millisecondsRemaining = Math.max(600000 - timeElapsed, 0); // 10 minute game
        const formattedTimeRemaining = msToTime(millisecondsRemaining);
        currentGameRef.child('timer').child('timeRemaining').set(formattedTimeRemaining);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [currentGameInformation?.timer?.startTime]);

  const playerIsInGame = Object.keys(currentGameInformation?.players || {}).includes(props?.user?.uid);
  const gameIsInProgress = currentGameInformation?.status === 'in progress';

  if (gameIsInProgress && playerIsInGame) {
    return <>
      <PlayerInGameView currentGameInformation={currentGameInformation} {...props} />
      <hr />
      <Timer {...props} />
      <PlayerList currentGameInformation={currentGameInformation} {...props} />
      <hr />
      <EndGameButton />
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
