import fetch from 'isomorphic-fetch'
import {formatDate} from '../../helpers/dateUtils'

let initialState = {
	fetching: false,
	didInvalidate: false,
	boxscoreId: null,
	data: null,
	adjustments: {}
}

export function requestBoxscores() {
	console.log('requesting boxscores')
	return { type: 'REQUEST_BOXSCORES' }
}

export function receiveBoxscores (boxscores, id) {
	return { type: 'RECEIVE_BOXSCORES', boxscores: boxscores, id: id }
}

export function fetchBoxscore(boxscoreId) {
	console.log('fetching...')
	return function (dispatch) {

		dispatch(requestBoxscores())

		var url = '/api/boxscore/' + boxscoreId //process.env.NODE_ENV === 'development' ? '/api/boxscores' : './data/boxscores.json'

		// console.log(url);

		return fetch(url)
			.then(function(response) {
				console.log(response)
				response.json().then(function(data) {
					console.log('---about to recieve', boxscoreId)
					dispatch(receiveBoxscores(data, boxscoreId))
				})
			})
	}
}

export function fetchBoxscoreIfNeeded(boxscoreId) {

	return (dispatch, getState) => {

		var state = getState()

		var boxscoreDateIsCurrentDate = (formatDate(new Date()) === formatDate(state.events.eventDate))

		if (!boxscoreId || boxscoreDateIsCurrentDate) {
			// console.log('not going to fetch boxscore')
			return Promise.resolve('No boxscore available for the requested game.')
		}

		// console.log('fetching boxscores')

	    if (shouldFetchBoxscores(boxscoreId, state)) {
	    	// console.log('getting new boxscores')
			return dispatch(fetchBoxscore(boxscoreId))
	    } else {
	    	// console.log('using old boxscores')
			dispatch(receiveBoxscores(state.boxscores.data, boxscoreId))
			// Let the calling code know there's nothing to wait for.
			return Promise.resolve()
	    }
	}
}

function shouldFetchBoxscores(boxscoreId, state) {
	var currentBoxscore = state.boxscores.data

	var boxscoreAlreadyFetched

	if (currentBoxscore) {
		if (boxscoreId === state.boxscores.boxscoreId) {
			// console.log('already have boxscore')
			boxscoreAlreadyFetched = true
		}
	}

	if ((!boxscoreAlreadyFetched && !state.boxscores.fetching)) {
		return true
	} else {
		return false
	}
}

export function adjustBoxscoreElementPosition(element, adjustment) {
	return { type: 'ADJUST_BOXSCORE_POSITION', adjustment, element }

}

export default function reducer (state = initialState, action) {
	var newState = state
	switch (action.type) {

		case 'REQUEST_BOXSCORES':
			newState = Object.assign({}, state, {
				fetching: true
			})
			break

		case 'RECEIVE_BOXSCORES':
			// console.log('receiving boxscores', action.id, action.boxscores)
			newState = Object.assign({}, state, {
				fetching: false,
				boxscoreId: action.id,
				data: action.boxscores
				// boxscoreLists: returnPlayerLists( action.boxscores )
			})
			// localStorage.setItem('AuctionToolPlayerList',JSON.stringify(newState.data))
			break

		case 'ADJUST_BOXSCORE_POSITION':

			var newAdjustments = Object.assign({}, state.adjustments, {
				[action.element]: action.adjustment
			})

			newState = Object.assign({}, state, {
				adjustments: newAdjustments
			})
			break

		/*case 'SET_BOXSCORE_ID':
			newState = Object.assign({}, state, {
				boxscoreId: action.id,
				didInvalidate: true
			})
			break*/

		default:
			break
	}
	return newState
}