import fetch from 'isomorphic-fetch'
import {formatDate} from '../../helpers/dateUtils'

var defaultDate = new Date()
defaultDate.setDate(defaultDate.getDate()-1);

// var tempData = {"events_date":"2016-05-16T00:00:00-04:00","count":9,"event":[{"event_id":"20160516-cincinnati-reds-at-cleveland-indians","event_status":"completed","sport":"MLB","start_date_time":"2016-05-16T18:10:00-04:00","season_type":"regular","away_team":{"team_id":"cincinnati-reds","abbreviation":"CIN","active":true,"first_name":"Cincinnati","last_name":"Reds","conference":"National","division":"Central","site_name":"Great American Ball Park","city":"Cincinnati","state":"Ohio","full_name":"Cincinnati Reds"},"home_team":{"team_id":"cleveland-indians","abbreviation":"CLE","active":true,"first_name":"Cleveland","last_name":"Indians","conference":"American","division":"Central","site_name":"Progressive Field","city":"Cleveland","state":"Ohio","full_name":"Cleveland Indians"},"site":{"capacity":43429,"surface":"Grass","name":"Progressive Field","city":"Cleveland","state":"Ohio"},"away_period_scores":[1,1,2,0,2,0,0,0,0],"home_period_scores":[0,0,4,3,0,5,2,1,-1],"away_points_scored":6,"home_points_scored":15},{"event_id":"20160516-boston-red-sox-at-kansas-city-royals","event_status":"postponed","sport":"MLB","start_date_time":"2016-05-16T19:05:00-04:00","season_type":"regular","away_team":{"team_id":"boston-red-sox","abbreviation":"BOS","active":true,"first_name":"Boston","last_name":"Red Sox","conference":"American","division":"East","site_name":"Fenway Park","city":"Boston","state":"Massachusetts","full_name":"Boston Red Sox"},"home_team":{"team_id":"kansas-city-royals","abbreviation":"KC","active":true,"first_name":"Kansas City","last_name":"Royals","conference":"American","division":"Central","site_name":"Kauffman Stadium","city":"Kansas City","state":"Missouri","full_name":"Kansas City Royals"},"site":{"capacity":40793,"surface":"Grass","name":"Kauffman Stadium","city":"Kansas City","state":"Missouri"},"away_period_scores":[],"home_period_scores":[],"away_points_scored":-1,"home_points_scored":-1},{"event_id":"20160516-atlanta-braves-at-pittsburgh-pirates","event_status":"completed","sport":"MLB","start_date_time":"2016-05-16T19:05:00-04:00","season_type":"regular","away_team":{"team_id":"atlanta-braves","abbreviation":"ATL","active":true,"first_name":"Atlanta","last_name":"Braves","conference":"National","division":"East","site_name":"Turner Field","city":"Atlanta","state":"Georgia","full_name":"Atlanta Braves"},"home_team":{"team_id":"pittsburgh-pirates","abbreviation":"PIT","active":true,"first_name":"Pittsburgh","last_name":"Pirates","conference":"National","division":"Central","site_name":"PNC Park","city":"Pittsburgh","state":"Pennsylvania","full_name":"Pittsburgh Pirates"},"site":{"capacity":38496,"surface":"Grass","name":"PNC Park","city":"Pittsburgh","state":"Pennsylvania"},"away_period_scores":[0,0,0,0,0,2,0,3,0],"home_period_scores":[3,0,2,0,1,0,2,0,-1],"away_points_scored":5,"home_points_scored":8},{"event_id":"20160516-miami-marlins-at-philadelphia-phillies","event_status":"completed","sport":"MLB","start_date_time":"2016-05-16T19:05:00-04:00","season_type":"regular","away_team":{"team_id":"miami-marlins","abbreviation":"MIA","active":true,"first_name":"Miami","last_name":"Marlins","conference":"National","division":"East","site_name":"Marlins Park","city":"Miami","state":"Florida","full_name":"Miami Marlins"},"home_team":{"team_id":"philadelphia-phillies","abbreviation":"PHI","active":true,"first_name":"Philadelphia","last_name":"Phillies","conference":"National","division":"East","site_name":"Citizens Bank Park","city":"Philadelphia","state":"Pennsylvania","full_name":"Philadelphia Phillies"},"site":{"capacity":43500,"surface":"Grass","name":"Citizens Bank Park","city":"Philadelphia","state":"Pennsylvania"},"away_period_scores":[0,1,0,0,1,1,2,0,0],"home_period_scores":[0,0,0,1,0,0,1,0,1],"away_points_scored":5,"home_points_scored":3},{"event_id":"20160516-tampa-bay-rays-at-toronto-blue-jays","event_status":"completed","sport":"MLB","start_date_time":"2016-05-16T19:07:00-04:00","season_type":"regular","away_team":{"team_id":"tampa-bay-rays","abbreviation":"TB","active":true,"first_name":"Tampa Bay","last_name":"Rays","conference":"American","division":"East","site_name":"Tropicana Field","city":"Saint Petersburg","state":"Florida","full_name":"Tampa Bay Rays"},"home_team":{"team_id":"toronto-blue-jays","abbreviation":"TOR","active":true,"first_name":"Toronto","last_name":"Blue Jays","conference":"American","division":"East","site_name":"Rogers Centre","city":"Toronto","state":"Ontario","full_name":"Toronto Blue Jays"},"site":{"capacity":49230,"surface":"Field Turf","name":"Rogers Centre","city":"Toronto","state":"Ontario"},"away_period_scores":[2,3,4,2,0,0,0,1,1],"home_period_scores":[0,0,0,0,1,0,0,1,0],"away_points_scored":13,"home_points_scored":2},{"event_id":"20160516-minnesota-twins-at-detroit-tigers","event_status":"completed","sport":"MLB","start_date_time":"2016-05-16T19:10:00-04:00","season_type":"regular","away_team":{"team_id":"minnesota-twins","abbreviation":"MIN","active":true,"first_name":"Minnesota","last_name":"Twins","conference":"American","division":"Central","site_name":"Target Field","city":"Minneapolis","state":"Minnesota","full_name":"Minnesota Twins"},"home_team":{"team_id":"detroit-tigers","abbreviation":"DET","active":true,"first_name":"Detroit","last_name":"Tigers","conference":"American","division":"Central","site_name":"Comerica Park","city":"Detroit","state":"Michigan","full_name":"Detroit Tigers"},"site":{"capacity":41255,"surface":"Grass","name":"Comerica Park","city":"Detroit","state":"Michigan"},"away_period_scores":[0,2,1,4,0,0,1,0,0],"home_period_scores":[8,0,0,0,0,0,1,1,-1],"away_points_scored":8,"home_points_scored":10},{"event_id":"20160516-new-york-yankees-at-arizona-diamondbacks","event_status":"completed","sport":"MLB","start_date_time":"2016-05-16T21:40:00-04:00","season_type":"regular","away_team":{"team_id":"new-york-yankees","abbreviation":"NYY","active":true,"first_name":"New York","last_name":"Yankees","conference":"American","division":"East","site_name":"Yankee Stadium","city":"Bronx","state":"New York","full_name":"New York Yankees"},"home_team":{"team_id":"arizona-diamondbacks","abbreviation":"ARI","active":true,"first_name":"Arizona","last_name":"Diamondbacks","conference":"National","division":"West","site_name":"Chase Field","city":"Phoenix","state":"Arizona","full_name":"Arizona Diamondbacks"},"site":{"capacity":49033,"surface":"Grass","name":"Chase Field","city":"Phoenix","state":"Arizona"},"away_period_scores":[0,0,0,1,1,0,0,0,0],"home_period_scores":[1,1,0,0,5,1,1,3,-1],"away_points_scored":2,"home_points_scored":12},{"event_id":"20160516-texas-rangers-at-oakland-athletics","event_status":"completed","sport":"MLB","start_date_time":"2016-05-16T22:05:00-04:00","season_type":"regular","away_team":{"team_id":"texas-rangers","abbreviation":"TEX","active":true,"first_name":"Texas","last_name":"Rangers","conference":"American","division":"West","site_name":"Globe Life Park in Arlington","city":"Arlington","state":"Texas","full_name":"Texas Rangers"},"home_team":{"team_id":"oakland-athletics","abbreviation":"OAK","active":true,"first_name":"Oakland","last_name":"Athletics","conference":"American","division":"West","site_name":"O.co Coliseum","city":"Oakland","state":"California","full_name":"Oakland Athletics"},"site":{"capacity":35067,"surface":"Grass","name":"O.co Coliseum","city":"Oakland","state":"California"},"away_period_scores":[0,0,0,0,0,0,1,0,0],"home_period_scores":[0,0,0,2,0,0,1,0,-1],"away_points_scored":1,"home_points_scored":3},{"event_id":"20160516-los-angeles-angels-at-los-angeles-dodgers","event_status":"completed","sport":"MLB","start_date_time":"2016-05-16T22:10:00-04:00","season_type":"regular","away_team":{"team_id":"los-angeles-angels","abbreviation":"LAA","active":true,"first_name":"Los Angeles","last_name":"Angels","conference":"American","division":"West","site_name":"Angel Stadium of Anaheim","city":"Anaheim","state":"California","full_name":"Los Angeles Angels"},"home_team":{"team_id":"los-angeles-dodgers","abbreviation":"LAD","active":true,"first_name":"Los Angeles","last_name":"Dodgers","conference":"National","division":"West","site_name":"Dodger Stadium","city":"Los Angeles","state":"California","full_name":"Los Angeles Dodgers"},"site":{"capacity":56000,"surface":"Grass","name":"Dodger Stadium","city":"Los Angeles","state":"California"},"away_period_scores":[0,0,4,0,0,0,3,0,0],"home_period_scores":[0,2,0,1,0,0,1,2,0],"away_points_scored":7,"home_points_scored":6}]}

// console.log(defaultDate);

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
	// console.log('fetching...')


	return function (dispatch) {

		// dispatch(receiveEvents(tempData))

		dispatch(requestEvents())

		// console.log('date to fetch:',state.events.eventDate)

		var eventDate = formatDate(state.events.eventDate)

		var url = '/api/' + eventDate //process.env.NODE_ENV === 'development' ? '/api/events' : './data/events.json'

		// console.log(url);

		return fetch(url)
			.then(function(response) {
				// console.log(response)
				response.json().then(function(data) {
					dispatch(receiveEvents(data))
				})
			})
	}
}

export function fetchEventsIfNeeded() {
	// console.log('fetchEventsIfNeeded()')
	return (dispatch, getState) => {

		var state = getState()

		// console.log('fetching')

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