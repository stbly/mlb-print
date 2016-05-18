import React, { Component, PropTypes } from 'react'
import { Router, RouteHandler, Link, browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import classNames from 'classnames';

import * as boxscoreActions from '../redux/modules/boxscores'

import LineScoreComponent from '../components/LineScoreComponent'
import TeamResultsComponent from '../components/TeamResultsComponent'

import '../../stylesheets/components/box-score.scss'

class BoxScore extends Component {
	constructor(props) {
		super(props)
	}

	render () {
		var boxscore = this.props.boxscore;

		if (!boxscore) {
			return (<div></div>)
		}

		return (
			<div className='boxscores'>
				<TeamResultsComponent boxscore={this.props.boxscore} team={'away'} />
				<LineScoreComponent boxscore={this.props.boxscore}/>
				<TeamResultsComponent boxscore={this.props.boxscore} team={'home'} />
			</div>
		)
	}
}

/*
function mapDispatchToProps(dispatch) {

}
*/

export default BoxScore;