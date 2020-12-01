import React from 'react';
import fire from '../../fire';
import './PlayerInGameView.css';

const currentGameRef = fire.database().ref('current_game_information');

const PlayerInGameView = (props) => {
  const secretWord = props?.currentGameInformation?.secretWord;
  const isGecko = props?.currentGameInformation?.geckoPlayerID === props.user.uid;
  const timeIsUp = props?.currentGameInformation?.timer?.timeRemaining === '00:00';
  const geckoCardGuess = props?.currentGameInformation?.geckoCardGuess;
  const setGeckoCardGuess = (word) => {
    if (isGecko && !timeIsUp) {
      currentGameRef.child('geckoCardGuess').set(word);
    }
  }

  const determineEndGameMessage = () => {
    const gecko = props?.currentGameInformation?.players[props?.currentGameInformation?.geckoPlayerID];
    if (geckoCardGuess === secretWord) return <><div>The Gecko - {gecko.name} - wins!</div><div>They guessed the correct secret word!</div></>;
    const geckoCaught = Object.values(props?.currentGameInformation?.players).reduce((currentOutcome, player) => {
      // if another player has as many or more votes, then the gecko was not caught
      if (player.uid !== gecko.uid && player.votesAgainst >= gecko.votesAgainst) return false;
      return currentOutcome;
    }, true)
    if (geckoCaught) return <><div>The group wins!</div><div>They caught the Gecko - {gecko.name}!</div></>;
    return <><div>The Gecko - {gecko.name} - wins!</div><div>The group didn&apos;t catch them!</div></>;
  }

  return (
    <>
      {timeIsUp ? <>
        {determineEndGameMessage()}
      </> : <>
          <div>
            {isGecko ? (
              <>
                <h1>
                  You are the Gecko!
                </h1>
                {geckoCardGuess ? (
                  <div>
                    Your current guess is:
                    <br />
                    <h2 className="card" style={{ margin: '10px' }}>{geckoCardGuess}</h2>
                  </div>
                ) : (
                    <div>
                      Make sure to guess before time runs out.
                    </div>
                  )}
                <small>Guess a word by clicking it below. You can change your guess any time before time runs out.</small>
              </>
            ) : (
                <div>
                  You are not the gecko. The secret card is:
                  <br />
                  <h2 className="card" style={{ margin: '10px' }}>
                    {secretWord}
                  </h2>
                </div>
              )}
          </div>
          <br />
          <div>
            The category is: <b>{props?.currentGameInformation?.category}</b>
          </div>
        </>
      }
      <p>
        The cards are:
      </p>
      <div className="cards">
        {props?.currentGameInformation?.allWords.map((word) => (
          <div
            key={word}
            onClick={() => setGeckoCardGuess(word)}
            className={`card${((!isGecko || timeIsUp) && secretWord === word) ? ' secret-card' : ''}${((isGecko || timeIsUp) && geckoCardGuess === word) ? ' gecko-card-guess' : ''}`}
          >
            {word}
          </div>
        ))}
      </div>
    </>
  )
}

export default PlayerInGameView;
