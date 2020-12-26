import React from 'react';
import fire from '../../fire';
import robotImage from '../../images/robot.png';

const currentGameRef = fire.database().ref('current_game_information');

const PlayerList = props => {
  // vote for a player
  const currentUser = props?.currentGameInformation?.players[props?.user?.uid];
  const currentVote = currentUser?.vote;
  const finalVote = currentUser?.finalVote;
  const onPlayerButtonClick = (player) => {
    if (props.currentGameInformation.timer.timeRemaining !== '00:00' && props.currentGameInformation.status === 'in progress' && !finalVote) {
      const playerVoteRef = currentGameRef.child('players').child(props.user.uid).child('vote');
      if (player.uid === currentVote) {
        playerVoteRef.remove();
      } else {
        playerVoteRef.set(player.uid);
      }
    } else if (props.currentGameInformation.status !== 'in progress') {
      if (window.confirm(`Are you sure you want to remove ${player.name} from the game?`)) {
        currentGameRef
          .child('players')
          .child(player.uid)
          .remove();
      }
    }
  }

  const onFinalizeVoteClick = () => {
    if (props.currentGameInformation.timer.timeRemaining !== '00:00' && props.currentGameInformation.status === 'in progress' && !finalVote) {
      const playerVoteRef = currentGameRef.child('players').child(props.user.uid).child('finalVote');
      playerVoteRef.set(currentVote);
    }
  }

  return (<>
    <hr />
    {
      Object.values(props?.currentGameInformation?.players).map(player => {
        return (
          <div key={player.uid}>
            <div className="selection-board">
              <button onClick={() => onPlayerButtonClick(player)} className={`primary-button selection-button${finalVote && finalVote !== player.uid ? ' disabled' : ''}`}>
                {<img src={player.photoURL || robotImage} alt={player.name} className="player-image" />}
                <div className="player-list-container">
                  <div className="align-left">
                    {player.name}
                    {player.clueWord && ` - ${player.clueWord}`}
                  </div>
                  <small>
                  <div className="align-left">
                    {player.votesAgainst > 0 && `${player.votesAgainst} Vote${player.votesAgainst > 1 ? 's' : ''} Against`}
                    {player.finalizedVotesAgainst > 0 && ` - ${player.finalizedVotesAgainst} Finalized`}
                  </div>
                  {currentVote === player.uid &&
                    <div className="align-left">
                      {finalVote ? 'You finalized your vote for this player.' : 'You voted for this player.'}
                    </div>
                  }
                  </small>
                </div>
              </button>
            </div>
            {currentVote === player.uid && props.currentGameInformation.timer.timeRemaining !== '00:00' && !finalVote &&
              <div className="selection-board">
                <button onClick={onFinalizeVoteClick} className="primary-button selection-button">
                  Finalize your vote for {player.name}
                </button>
              </div>
            }
          </div>
        )
      })
    }
  </>);
};

export default PlayerList;

