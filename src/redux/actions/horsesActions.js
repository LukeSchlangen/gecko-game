import fire from '../../fire';
import firebaseObjectToArray from '../../helpers/firebaseObjectToArray';

export const HORSES_ACTIONS = {
  SET_HORSES: 'SET_HORSES',
  SET_SELECTED_HORSE: 'SET_SELECTED_HORSE',
  UNSET_SELECTED_HORSE: 'UNSET_SELECTED_HORSE',
};

export const fetchHorses = () => (dispatch) => {
  const horsesRef = fire.database().ref('horses').orderByKey().limitToLast(100);
  horsesRef.on('value', (snapshot) => {
    const horses = firebaseObjectToArray(snapshot);
    dispatch({
      type: HORSES_ACTIONS.SET_HORSES,
      horses,
    });
  });
};

export const unsetSelectedHorse = () => (dispatch) => {
  dispatch({
    type: HORSES_ACTIONS.UNSET_SELECTED_HORSE,
  });
};
