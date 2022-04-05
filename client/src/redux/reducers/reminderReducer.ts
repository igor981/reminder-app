
import * as actionTypes from '../constants/reminderConstants'

let initialState = {}


interface Action {
    type: string,
    payload: any
}




export const reminderReducer = (state = initialState, action:Action) => {
    switch (action.type) {
        case actionTypes.SET_REMINDER:
            return action.payload;
        case actionTypes.UPDATE_REMINDER:
            return action.payload;
        default:
            return state;
    }
}