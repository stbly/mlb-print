import fetch from 'isomorphic-fetch'
import {formatDate} from '../../helpers/dateUtils'

var defaultDate = new Date()
defaultDate.setDate(defaultDate.getDate()-1);

console.log(defaultDate);

let initialState = {
	fetching: false,
	didInvalidate: false,
	eventDate: defaultDate,
	data: null
}

export function requestEvents() {
	console.log('requesting events')
	return { type: 'REQUEST_EVENTS' }
}

export function receiveEvents (events) {
	return { type: 'RECEIVE_EVENTS', events: events }
}

export function dateSelected (date) {
	return { type: 'RECEIVE_DATE', date: formattedDate }
}


export function fetchEvents(state) {
	console.log('fetching...')
	return function (dispatch) {

		dispatch(requestEvents())

		console.log('date to fetch:',state.events.eventDate)

		var eventDate = formatDate(state.events.eventDate)

		var url = '/api/' + eventDate //process.env.NODE_ENV === 'development' ? '/api/events' : './data/events.json'

		console.log(url);

		return fetch(url)
			.then(function(response) {
				console.log(response)
				response.json().then(function(data) {
					dispatch(receiveEvents(data))
				})
			})
	}
}

export function fetchEventsIfNeeded() {
	console.log('fetchEventsIfNeeded()')
	return (dispatch, getState) => {

		var state = getState()

		console.log('fetching')

	    if (shouldFetchEvents(state)) {
			return dispatch(fetchEvents(state))
	    } else {
			dispatch(receiveEvents(state.events.data, state))
			// Let the calling code know there's nothing to wait for.
			return Promise.resolve()
	    }
	}
}

function shouldFetchEvents(state) {
	var events = state.events.data
	if (state.events.didInvalidate || (!events && !state.events.fetching)) {
		return true
	} else {
		return false
	}
}

export default function reducer (state = initialState, action) {
	var newState = state
	switch (action.type) {
		case 'INVALIDATE_EVENTS':
			newState = Object.assign({}, state, {
				didInvalidate: true
			})
			break

		case 'REQUEST_EVENTS':
			newState = Object.assign({}, state, {
				fetching: true,
				didInvalidate: false
			})
			break

		case 'RECEIVE_EVENTS':
			console.log('receiving events')
			newState = Object.assign({}, state, {
				fetching: false,
				didInvalidate: false,
				data: action.events
				// eventLists: returnPlayerLists( action.events )
			})
			// localStorage.setItem('AuctionToolPlayerList',JSON.stringify(newState.data))
			break

		case 'RECEIVE_DATE':
			newState = Object.assign({}, state, {
				eventDate: action.date,
				didInvalidate: true
			})
			break

		default:
			break
	}
	return newState
}