import React from 'react';
import fire from '../../fire';

const currentGameRef = fire.database().ref('current_game_information');

const PlayerList = props => {
  // vote for a player
  const currentVote = props?.currentGameInformation?.players[props?.user?.uid]?.vote;
  const onPlayerButtonClick = (player) => {
    if (props.currentGameInformation.timer.timeRemaining !== '00:00' && props.currentGameInformation.status === 'in progress') {
      const playerVoteRef = currentGameRef.child('players').child(props.user.uid).child('vote');
      if (player.uid === currentVote) {
        playerVoteRef.remove();
      } else {
        playerVoteRef.set(player.uid);
      }
    }
  }
  return (<>
    <hr />
    {
      Object.values(props?.currentGameInformation?.players).map(player => {
        return (
        <div key={player.uid} className="selection-board">
          <button onClick={() => onPlayerButtonClick(player)} className="selection-button">
            {<img src={player.photoUrl || 'assets/robots/robot-1.png'} alt={player.name} className="player-image" />}
            <div className="player-horse-name-container">
              <div className="horse-name">
                {player.name}
                {player.votesAgainst > 0 && ` - ${player.votesAgainst} Vote${player.votesAgainst > 1 ? 's' : ''} Against`}
              </div>
              {currentVote === player.uid &&
              <div className="player-name">
                You voted for this player.
              </div>
              }
            </div>
          </button>
        </div>
      )})
    }
  </>);
};

export default PlayerList;

