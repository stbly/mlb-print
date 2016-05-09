import React, { Component, PropTypes } from 'react'
import { Router, RouteHandler, Link, browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import classNames from 'classnames';

import Events from '../components/Events'

import * as eventActions from '../redux/modules/events'
import * as boxscoreActions from '../redux/modules/boxscores'

import '../../stylesheets/components/event-search.scss'


class EventSearch extends Component {
	constructor(props) {
		super(props)
		this.props.eventActions.fetchEventsIfNeeded();
	}

	componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps')
		this.props.eventActions.fetchEventsIfNeeded();
	}

	onEventClick (e) {
		var eventId = e.target.getAttribute('data-id')
		this.props.boxscoreActions.setBoxscoreId(eventId)
	}

	render () {

		var renderEvents = this.props.events,
			events = !renderEvents || <Events events={this.props.events} date={this.props.date} eventClick={this.onEventClick.bind(this)} />

		return (
			<div className='event-search'>
				{events}
			</div>
		)
	}
}

/*
function mapDispatchToProps(dispatch) {

}
*/

function mapDispatchToProps(dispatch) {
    return {
        eventActions: bindActionCreators(eventActions, dispatch),
        boxscoreActions: bindActionCreators(boxscoreActions, dispatch)
    }
}

function mapStateToProps (state,ownProps) {
	return {
		events: state.events.data,
		date: state.events.eventDate
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(EventSearch);