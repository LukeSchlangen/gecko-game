import React, { useEffect } from 'react';
import fire from '../../fire';

const currentGameRef = fire.database().ref('current_game_information');

function msToTime(duration) {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);

  const displayMinutes = (minutes < 10) ? "0" + minutes : minutes;
  const displaySeconds = (seconds < 10) ? "0" + seconds : seconds;

  return displayMinutes + ":" + displaySeconds;
}

const Timer = props => {
  const currentGameInformation = props.currentGameInformation;

  useEffect(() => {
    const interval = setInterval(() => {
      const playersArray = Object.values(currentGameInformation.players);
      const numberOfPlayers = playersArray.length;
      const votesNeededToEndGame = Math.ceil(numberOfPlayers / 2);
      const playerVotedAsGecko = playersArray.find(player => player.finalizedVotesAgainst && player.finalizedVotesAgainst >= votesNeededToEndGame);
      const totalFinalizedVotes = playersArray.reduce((totalCount, player) => player.finalizedVotesAgainst ? totalCount + 1 : totalCount, 0);
      if(currentGameInformation?.geckoFinalAnswer || totalFinalizedVotes === numberOfPlayers || playerVotedAsGecko) {
        // if the gecko has guessed, end the game
        currentGameRef.child('timer').child('timeRemaining').set('00:00');
        clearInterval(interval);
      } else if (currentGameInformation?.timer?.startedBy === props?.user?.uid) {
        const timeElapsed = Date.now() - currentGameInformation?.timer?.startTime;
        const millisecondsRemaining = Math.max(600000 - timeElapsed, 0); // 10 minute game
        const formattedTimeRemaining = msToTime(millisecondsRemaining);
        currentGameRef.child('timer').child('timeRemaining').set(formattedTimeRemaining);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [currentGameInformation?.timer?.startTime, currentGameInformation?.timer?.startedBy, props?.user?.uid, currentGameInformation?.geckoFinalAnswer, currentGameInformation.players]);

  return (<center>
    <div style={{ width: '100px' }}>
      <div style={{ fontSize: '32px', textAlign: 'left' }}>
        {currentGameInformation?.timer?.timeRemaining}
      </div>
    </div>
    <pre>{JSON.stringify(currentGameInformation.players)}</pre>
  </center>);
};

export default Timer;
