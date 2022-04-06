
import * as actionTypes from '../constants/reminderConstants'


const initialState: any = {}
interface Action {
    type: string,
    payload: any
}




export const reminderReducer = (state = initialState , action:Action) => {
    switch (action.type) {
        case actionTypes.SET_REMINDER:
            return action.payload;
        case actionTypes.UPDATE_REMINDER:
            return action.payload;
        case actionTypes.DELETE_REMINDER:
            const deletedState = {}
            return deletedState;
        case actionTypes.ADD_SUBTASK: {

            const newState = {
                ...state,
                subtasks: [...state.subtasks, action.payload]
            }
            return newState;
        }
        case actionTypes.DELETE_SUBTASK:
            const newSubtasks = state.subtasks.filter((item: any) => {
                
                if (item && item.subTaskId !== action.payload) {
                    return item
                }
            } )

            

            const newState = {
                ...state,
                subtasks: newSubtasks
            }
            return newState;
        default:
            return state;
    }
}