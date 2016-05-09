import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import events from './events'
import boxscores from './boxscores'

const rootReducer = combineReducers({
    events,
    boxscores,
    routing: routerReducer
})

export default rootReducer