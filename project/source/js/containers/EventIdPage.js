import React, { Component, PropTypes } from 'react'
import { Router, RouteHandler, Link, browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import classNames from 'classnames';

import BoxScore from '../components/BoxScore'
import Events from '../components/Events'
import BaseballImage from '../components/BaseballImage'

import * as eventActions from '../redux/modules/events'
import * as actions from '../redux/modules/boxscores'

import '../../stylesheets/components/event-page.scss'


class EventIdPage extends Component {
	constructor(props) {
		super(props)
		this.props.actions.fetchBoxscoreIfNeeded(this.props.params.id)
	}

	componentDidMount () {
		this.forceUpdate()
	}


	componentWillReceiveProps(nextProps) {
		this.props.actions.fetchBoxscoreIfNeeded(nextProps.params.id)
	}

	shouldComponentUpdate (nextProps, nextState) {

		var propsAreTheSame = JSON.stringify(nextProps) === JSON.stringify(this.props),
			stateIsTheSame = JSON.stringify(nextState) === JSON.stringify(this.state)

		console.log('shouldComponentUpdate?',!propsAreTheSame || !stateIsTheSame || this.props.boxscoreAdjustments)

		return !propsAreTheSame || !stateIsTheSame || this.props.boxscoreAdjustments
	}

	// onEventClick (e) {
	// 	var eventId = e.target.getAttribute('data-id')
	// 	this.props.boxscoreActions.setBoxscoreId(eventId)
	// }

	render () {
		return (
			<div className='boxscore-info'>
				<BoxScore boxscore={this.props.boxscore} />
				<Link to={'/boxscore/' + this.props.boxscoreId} >
					<BaseballImage boxscore={this.props.boxscore} boxscoreAdjustments={this.props.boxscoreAdjustments}/>
				</Link>
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
        actions: bindActionCreators(actions, dispatch)
    }
}

function mapStateToProps (state,ownProps) {
	console.log('------', state.boxscores.adjustments)
	return {
		boxscore: state.boxscores.data,
		boxscoreId: state.boxscores.boxscoreId,
		boxscoreAdjustments: state.boxscores.adjustments
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(EventIdPage);