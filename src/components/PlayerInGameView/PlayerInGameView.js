import React from 'react';
import fire from '../../fire';
import './PlayerInGameView.css';

const PlayerInGameView = (props) => {
  const secretWord = props?.currentGameInformation?.secretWord;
  const isGecko = props?.currentGameInformation?.geckoPlayerID === props.user.uid;
  return (
    <>
      { isGecko ? 'You are the Gecko!' : <div>You are not the gecko. The secret card is:<br /><h2 className="card" style={{margin: '10px'}}>{secretWord}</h2></div>}
      <p>
        The cards are:
      </p>
      <div className="cards">
        {props?.currentGameInformation?.allWords.map((word) => (<div key={word} className={`card${(!isGecko && secretWord === word) ? ' secret-card' : ''}`}>{word}</div>))}
      </div>
    </>
  )
}

export default PlayerInGameView;
