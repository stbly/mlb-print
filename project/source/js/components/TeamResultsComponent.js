import React, { Component, PropTypes } from 'react'

import classNames from 'classnames';
import LineScoreElement from './LineScoreElement'

import Results from './Results'
import ResultsSynopsis from './ResultsSynopsis'

import {BATTING_STATS, PITCHING_STATS, SYNOPSIS_BATTING_STATS} from '../helpers/constants'

class TeamResultsComponent extends Component {
	constructor(props) {
		super(props)
	}

	componentWillReceiveProps(nextProps) {
	}

	handleClick (e) {
		if (this.props.handleClick) {
			this.props.handleClick(e);
		}
	}

	render () {

		var boxscore = this.props.boxscore,
			teamtype = this.props.team

		var batters = boxscore[teamtype + '_batters'],
			pitchers = boxscore[teamtype + '_pitchers'],
			batterTotals = boxscore[teamtype + '_batter_totals'],
			pitcherTotals = boxscore[teamtype + '_pitcher_totals'],
			teamName = boxscore[teamtype + '_team'].first_name.toUpperCase()

		return (
			<div onClick={this.handleClick.bind(this)} className='team-results'>
				<Results teamName={teamName} players={batters} stats={BATTING_STATS} totals={batterTotals} />
				<ResultsSynopsis stats={SYNOPSIS_BATTING_STATS} players={batters} />
				<Results teamName={teamName} players={pitchers} stats={PITCHING_STATS} />
			</div>
		)
	}
}

TeamResultsComponent.propTypes = {
	team: React.PropTypes.string,
	boxscore: React.PropTypes.object,
	handleClick: React.PropTypes.func
}


export default TeamResultsComponent;
