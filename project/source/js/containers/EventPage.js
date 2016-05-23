import React, { Component, PropTypes } from 'react'
import { Router, RouteHandler, Link, browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import classNames from 'classnames';

import BoxScore from '../components/BoxScore'
import Events from '../components/Events'
import BaseballImage from '../components/BaseballImage'

import * as eventActions from '../redux/modules/events'
import * as boxscoreActions from '../redux/modules/boxscores'

import '../../stylesheets/components/event-page.scss'


class EventPage extends Component {
	constructor(props) {
		super(props)
		this.props.eventActions.fetchEventsIfNeeded();
	}

	componentWillReceiveProps(nextProps) {
		this.props.eventActions.fetchEventsIfNeeded().then()
	}

	// onEventClick (e) {
	// 	var eventId = e.target.getAttribute('data-id')
	// 	this.props.boxscoreActions.setBoxscoreId(eventId)
	// }


	render () {
		var previewMode = this.props.params.id;

		var renderBoxscore = this.props.boxscore,
			boxscore = !renderBoxscore || (
				<div className='boxscore-info'>
					<BoxScore boxscore={this.props.boxscore} />
					<Link to={'/boxscore/' + this.props.boxscoreId} >
						<BaseballImage
							boxscore={this.props.boxscore}
							boxscoreAdjustments={this.props.boxscoreAdjustments} />
					</Link>
				</div>
			)

		return (
			<div className='event-page'>
				<Events events={this.props.events} date={this.props.date} />
				{this.props.children}
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
		date: state.events.eventDate,
		boxscore: state.boxscores.data,
		boxscoreAdjustments: state.boxscores.adjustments
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);