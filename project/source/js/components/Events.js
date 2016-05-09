import React, { Component, PropTypes } from 'react'

import classNames from 'classnames';

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
			var eventName = event.away_team.abbreviation + ' at ' + event.home_team.abbreviation;
			return <button key={index} data-id={event.event_id} onClick={this.eventClick.bind(this)}> {eventName} </button>
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
