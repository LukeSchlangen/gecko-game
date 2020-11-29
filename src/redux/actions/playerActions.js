import fire from '../../fire';
import firebaseObjectToArray from '../../helpers/firebaseObjectToArray';

export const PLAYER_ACTIONS = {
  SET_PLAYERS: 'SET_PLAYERS',
  SET_SELECTED_HORSE: 'SET_SELECTED_HORSE',
  UNSET_SELECTED_HORSE: 'UNSET_SELECTED_HORSE',
};

export const fetchPlayers = () => (dispatch) => {
  const horsesRef = fire.database().ref('players').orderByKey().limitToLast(100);
  horsesRef.on('value', (snapshot) => {
    const horses = firebaseObjectToArray(snapshot);
    dispatch({
      type: PLAYER_ACTIONS.SET_PLAYERS,
      horses,
    });
  });
};

export const unsetSelectedHorse = () => (dispatch) => {
  dispatch({
    type: PLAYER_ACTIONS.UNSET_SELECTED_HORSE,
  });
};
