/* eslint-disable no-case-declarations */
/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import * as actionTypes from '../constants/userConstants';

const storedUser = localStorage.getItem('reminder-user');
let initialState: any = null;

if (storedUser) {
  initialState = JSON.parse(storedUser);
}

interface Action {
    type: string,
    payload: any
}

export const userReducer = (state = initialState, action:Action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return action.payload;

    case actionTypes.USER_LOGOUT:
      const newState = null;
      return newState;

    default:
      return state;
  }
};
