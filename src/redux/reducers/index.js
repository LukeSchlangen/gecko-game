import { combineReducers } from 'redux';
import user from './userReducer';
import horses from './horsesReducer';

const store = combineReducers({
  user,
  horses,
});

export default store;
