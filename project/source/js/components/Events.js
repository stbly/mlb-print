import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import classNames from 'classnames';

import {removeSpaces} from '../helpers/stringUtils'

import '../../stylesheets/components/events.scss'

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class Events extends Component {
	constructor(props) {
		super(props)
	}

	componentWillReceiveProps(nextProps) {
	}

	eventClick (e) {
		if (this.props.eventClick) {
			this.props.eventClick(e)
		}
	}

	render () {

		var skipEvents = !this.props.events;
		var events = skipEvents || this.props.events.event.map( (event, index) => {
			var eventName = event.away_team.abbreviation + ' at ' + event.home_team.abbreviation
			var homeTeam = event.home_team.team_id
			return <Link to={'/events/' + event.event_id} key={index}> <button className={classNames(homeTeam, 'color-1')}> {eventName} </button> </Link>
		})

		var day = this.props.date.getDate(),
			month = this.props.date.getMonth(),
			year = this.props.date.getFullYear()

		return (
			<div className='events'>
				<h2>Games found on {MONTH_NAMES[month] + ' ' + day + ', ' + year}</h2>
				{events}
			</div>
		)
	}
}

Events.propTypes = {
	events: React.PropTypes.object,
	date: React.PropTypes.instanceOf(Date),
	eventClick: React.PropTypes.func
}

export default Events;
