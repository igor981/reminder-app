/* eslint-disable no-case-declarations */
/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import * as actionTypes from '../constants/reminderListConstants';
import { Task } from '../../interfaces';

const initialState: Task[] = [];
interface Action {
    type: string,
    payload: any
}

export const reminderListReducer = (state = initialState, action:Action) => {
  switch (action.type) {
    case actionTypes.SET_LIST: {
      return action.payload;
    }
    case actionTypes.CHECK_TASK: {
      const newState: Task[] = state;
      const indexFound = newState.findIndex((item: Task) => item.taskId === action.payload.taskId);
      const foundObj: Task = state[indexFound];

      foundObj.checked = !foundObj.checked;

      newState[indexFound] = foundObj;

      return newState;
    }
    case actionTypes.DELETE_TASK: {
      const newState = state.filter((item: Task) => item.taskId !== action.payload.taskId);
      return newState;
    }

    default:
      return state;
  }
};
