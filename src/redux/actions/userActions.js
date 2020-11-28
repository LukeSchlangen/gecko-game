import { firebaseAuth, loginWithGoogle } from '../../fire';
import { HORSES_ACTIONS } from './horsesActions';

export const USER_ACTIONS = {
  SET_USER: 'SET_USER_ACTION',
  UNSET_USER: 'UNSET_USER_ACTION',
  REQUEST_START: 'REQUEST_START_USER_ACTION',
  REQUEST_DONE: 'REQUEST_DONE_USER_ACTION',
};

const logoutFlow = (dispatch) => {
  dispatch({
    type: USER_ACTIONS.UNSET_USER,
  });
  dispatch({
    type: HORSES_ACTIONS.UNSET_SELECTED_HORSE,
  });
};

const loginFlow = (dispatch, user) => {
  dispatch({
    type: USER_ACTIONS.SET_USER,
    user,
  });
  dispatch({
    type: HORSES_ACTIONS.SET_HORSES,
  });
};

export const fetchUser = () => (dispatch) => {
  firebaseAuth.onAuthStateChanged(
    (user) => { loginFlow(dispatch, user); },
    () => { logoutFlow(dispatch); },
  );
};

export const logoutUser = () => (dispatch) => {
  firebaseAuth
    .signOut()
    .then(() => { logoutFlow(dispatch); });
};

export const loginUserWithGoogle = () => (dispatch) => {
  loginWithGoogle()
    .then(firebaseUserResponse => firebaseUserResponse.user)
    .then(
      (user) => { loginFlow(dispatch, user); },
      () => { logoutFlow(dispatch); },
    );
};
