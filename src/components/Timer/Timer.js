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
      if (currentGameInformation?.timer?.startedBy === props?.user?.uid) {
        const timeElapsed = Date.now() - currentGameInformation?.timer?.startTime;
        const millisecondsRemaining = Math.max(600000 - timeElapsed, 0); // 10 minute game
        const formattedTimeRemaining = msToTime(millisecondsRemaining);
        currentGameRef.child('timer').child('timeRemaining').set(formattedTimeRemaining);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [currentGameInformation?.timer?.startTime, currentGameInformation?.timer?.startedBy, props?.user?.uid]);

  return (<center>
    <div style={{ width: '100px' }}>
      <div style={{ fontSize: '32px', textAlign: 'left' }}>
        {currentGameInformation?.timer?.timeRemaining}
      </div>
    </div>
  </center>);
};

export default Timer;
