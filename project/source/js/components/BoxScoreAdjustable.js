import React, { Component, PropTypes } from 'react'
import { Router, RouteHandler, Link, browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import classNames from 'classnames';

import * as boxscoreActions from '../redux/modules/boxscores'

import LineScoreComponent from '../components/LineScoreComponent'
import TeamResultsComponent from '../components/TeamResultsComponent'
import AdjustableContainer from '../components/AdjustableContainer'

import '../../stylesheets/components/box-score.scss'

class BoxScoreAdjustable extends Component {
	constructor(props) {
		super(props)
	}


	createAdjustmentHandler (name) {
		return (coordinates) => {
			if (this.props.handleDragEnd) {
				this.props.handleDragEnd(name, coordinates)
			}
		}
	}

	getAdjustmentsFor (name) {
		var adjustments;

		if (this.props.adjustments) {
			adjustments = this.props.adjustments[name];
		}

		return adjustments
	}

	render () {
		var boxscore = this.props.boxscore;

		if (!boxscore) {
			return (<div></div>)
		}

		return (
			<div className='boxscores'>
				<AdjustableContainer
					ignoreX
					data-name='container-1'
					adjustments={this.getAdjustmentsFor('container-1')}
					handleDragEnd={this.createAdjustmentHandler('container-1')}>
						<TeamResultsComponent boxscore={this.props.boxscore} team={'away'} />
				</AdjustableContainer>

				<AdjustableContainer
					ignoreX
					data-name='container-1'
					adjustments={this.getAdjustmentsFor('container-2')}
					handleDragEnd={this.createAdjustmentHandler('container-2')}>
					<LineScoreComponent boxscore={this.props.boxscore}/>
				</AdjustableContainer>

				<AdjustableContainer
					ignoreX
					data-name='container-1'
					adjustments={this.getAdjustmentsFor('container-3')}
					handleDragEnd={this.createAdjustmentHandler('container-3')}>
					<TeamResultsComponent boxscore={this.props.boxscore} team={'home'} />
				</AdjustableContainer>
			</div>
		)
	}
}

/*
function mapDispatchToProps(dispatch) {

}
*/

export default BoxScoreAdjustable;