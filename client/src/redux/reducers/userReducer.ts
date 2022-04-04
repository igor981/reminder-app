
import * as actionTypes from '../constants/userConstants'

const storedUser = localStorage.getItem('reminder-user');
let initialState = {}

if (storedUser){
    initialState = JSON.parse(storedUser)
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
            console.log('reaching');
            
            const newState = null;
            return newState
         
        default:
            return state;
    }
}