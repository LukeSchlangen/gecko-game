import React, { useState } from 'react';
import fire from '../../fire';

const currentGameRef = fire.database().ref('current_game_information');

const ClueForm = props => {
  const publicPlayerClueWord = props?.currentGameInformation?.players[props.user.uid].clueWord;
  const [clueWord, setClueWord] = useState('');
  const onSetPlayerClueClick = () => {
    console.log(clueWord)
    currentGameRef.child('players').child(props.user.uid).child('clueWord').set(clueWord);
  }
  // const playerClueWord = '';
  return (!publicPlayerClueWord &&
    <center>
      <hr />
      <input type="text" onChange={event => setClueWord(event.target.value)} value={clueWord} style={{height: '60px', fontSize: '24pt'}}/>
      <button className="primary-button" onClick={onSetPlayerClueClick}>
        Submit Clue Word
      </button>
    </center>
  )
};

export default ClueForm;

