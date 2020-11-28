import { USER_ACTIONS } from '../actions/userActions';
import trimFirebaseUser from '../../helpers/trimFirebaseUser';

const user = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return trimFirebaseUser(action.user);
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};

export default user;
