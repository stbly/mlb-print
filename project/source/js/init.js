import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, Link, browserHistory, hashHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './redux/store'

import App from './containers/App'
import EventPage from './containers/EventPage'
import EventIdPage from './containers/EventIdPage'
import BaseballImagePage from './containers/BaseballImagePage'

//import configureStore from './store/configureStore'
//import * as actions from './actions/index'

const store = configureStore();

var historyType = process.env.NODE_ENV === 'development' ? browserHistory : hashHistory;

const history = syncHistoryWithStore(historyType, store)

render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<Route path="events" component={EventPage}>
					<Route path =':id' component={EventIdPage}/>
				</Route>
				<Route path="boxscore/:id" component={BaseballImagePage} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
)

// <Route name='boxscore' path="/boxscore/:id" component={Boxscore} />
// <Route path='box-score-search' component={BoxScoreSearch} />
