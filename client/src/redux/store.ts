
import { createStore, combineReducers, applyMiddleware } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import {userReducer} from './reducers/userReducer'

const reducer = combineReducers({
    user: userReducer,

})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware())
);

export default store