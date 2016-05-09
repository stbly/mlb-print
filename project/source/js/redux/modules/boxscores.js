import fetch from 'isomorphic-fetch'
import {formatDate} from '../../helpers/dateUtils'

let initialState = {
	fetching: false,
	didInvalidate: false,
	boxscoreId: null,
	data: null
}

export function requestBoxscores() {
	console.log('requesting boxscores')
	return { type: 'REQUEST_BOXSCORES' }
}

export function receiveBoxscores (boxscores) {
	return { type: 'RECEIVE_BOXSCORES', boxscores: boxscores }
}

export function setBoxscoreId (boxscoreId) {
	return { type: 'SET_BOXSCORE_ID', id: boxscoreId }
}

export function fetchBoxscores(state) {
	console.log('fetching...')
	return function (dispatch) {

		dispatch(requestBoxscores())

		var url = '/api/boxscore/' + state.boxscores.boxscoreId //process.env.NODE_ENV === 'development' ? '/api/boxscores' : './data/boxscores.json'

		console.log(url);

		return fetch(url)
			.then(function(response) {
				console.log(response)
				response.json().then(function(data) {
					dispatch(receiveBoxscores(data))
				})
			})
	}
}

export function fetchBoxscoreIfAvailable() {
	console.log('fetchBoxscoreIfAvailable()')
	return (dispatch, getState) => {

		var state = getState()

		var boxscoreId = state.boxscores.boxscoreId,
			boxscoreDateIsCurrentDate = (formatDate(new Date()) === formatDate(state.events.eventDate))
		if (!boxscoreId || boxscoreDateIsCurrentDate) {
			console.log('not going to fetch boxscore')
			return Promise.resolve('No boxscore available for the requested game.')
		}

		console.log('fetching boxscores')

	    if (shouldFetchBoxscores(state)) {
			return dispatch(fetchBoxscores(state))
	    } else {
			dispatch(receiveBoxscores(state.boxscores.data, state))
			// Let the calling code know there's nothing to wait for.
			return Promise.resolve()
	    }
	}
}

function shouldFetchBoxscores(state) {
	var boxscores = state.boxscores.data
	if (state.boxscores.didInvalidate || (!boxscores && !state.boxscores.fetching)) {
		return true
	} else {
		return false
	}
}

export default function reducer (state = initialState, action) {
	var newState = state
	switch (action.type) {
		case 'INVALIDATE_BOXSCORES':
			newState = Object.assign({}, state, {
				didInvalidate: true
			})
			break

		case 'REQUEST_BOXSCORES':
			newState = Object.assign({}, state, {
				fetching: true,
				didInvalidate: false
			})
			break

		case 'RECEIVE_BOXSCORES':
			console.log('receiving boxscores')
			newState = Object.assign({}, state, {
				fetching: false,
				didInvalidate: false,
				data: action.boxscores
				// boxscoreLists: returnPlayerLists( action.boxscores )
			})
			// localStorage.setItem('AuctionToolPlayerList',JSON.stringify(newState.data))
			break

		case 'SET_BOXSCORE_ID':
			newState = Object.assign({}, state, {
				boxscoreId: action.id,
				didInvalidate: true
			})
			break

		default:
			break
	}
	return newState
}