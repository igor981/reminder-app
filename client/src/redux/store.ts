
import { createStore, combineReducers, applyMiddleware } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import {userReducer} from './reducers/userReducer'
import { reminderReducer } from './reducers/reminderReducer'
import { reminderListReducer } from './reducers/reminderListReducer'

const reducer = combineReducers({
    user: userReducer,
    reminder: reminderReducer,
    list: reminderListReducer

})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware())
);

export default store