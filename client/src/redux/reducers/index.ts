/* eslint-disable linebreak-style */
import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { reminderReducer } from './reminderReducer';
import { reminderListReducer } from './reminderListReducer';

const reducer = combineReducers({
  user: userReducer,
  reminder: reminderReducer,
  list: reminderListReducer,

});
export default reducer;
