import React, { useEffect, useState } from 'react';
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
            if (currentGameInformation?.timer?.startedBy === props?.user?.uid) {
                const timeElapsed = Date.now() - currentGameInformation?.timer?.startTime;
                const millisecondsRemaining = Math.max(600000 - timeElapsed, 0); // 10 minute game
                const formattedTimeRemaining = msToTime(millisecondsRemaining);
                currentGameRef.child('timer').child('timeRemaining').set(formattedTimeRemaining);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [currentGameInformation?.timer?.startTime]);

    return (<center>
        <div  style={{ width: '100px' }}>
        <div style={{ fontSize: '32px', textAlign: 'left' }}>
            {currentGameInformation?.timer?.timeRemaining}
        </div>
        </div>
    </center>);
};

export default Timer;
