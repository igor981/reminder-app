
import * as actionTypes from '../constants/reminderListConstants'


const initialState: any = []
interface Action {
    type: string,
    payload: any
}




export const reminderListReducer = (state = initialState , action:Action) => {
    switch (action.type) {
      case actionTypes.SET_LIST: {
          return action.payload;
      }
      case actionTypes.CHECK_TASK: {
          
          const newState = state;
          const indexFound = newState.findIndex((item: any) => item.taskId === action.payload.taskId)
          const foundObj = state[indexFound]
          
          foundObj.checked = !foundObj.checked
          console.log(foundObj);

         
          
          newState[indexFound] = foundObj

          console.log(newState);
          
          return newState;
      }
      case actionTypes.DELETE_TASK: {
          console.log('reach');
          
          const newState = state.filter((item: any) => item.taskId !== action.payload.taskId )
          return newState
      }
      
      default:
        return state;
    }
}