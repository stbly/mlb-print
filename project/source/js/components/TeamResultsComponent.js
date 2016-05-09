import React, { Component, PropTypes } from 'react'

import classNames from 'classnames';
import LineScoreElement from './LineScoreElement'

import '../../stylesheets/components/team-results.scss'

import TeamResultsHeader from './TeamResultsHeader'
import TeamResultsPlayers from './TeamResultsPlayers'
import TeamResultsTotals from './TeamResultsTotals'
import TeamResultsSynopsis from './TeamResultsSynopsis'

const BATTING_STATS = [
	{name:'at_bats', abbreviation: 'AB'},
	{name:'runs', abbreviation: 'R'},
	{name:'hits', abbreviation: 'H'},
	{name:'rbi', abbreviation: 'RBI'},
	{name:'avg', abbreviation: 'AVG'}
];

const PITCHING_STATS = [
	{name:'innings_pitched', abbreviation: 'IP'},
	{name:'hits_allowed', abbreviation: 'H'},
	{name:'runs_allowed', abbreviation: 'R'},
	{name:'earned_runs', abbreviation: 'ER'},
	{name:'walks', abbreviation: 'BB'},
	{name:'strike_outs', abbreviation: 'K'},
	{name:'era', abbreviation: 'ERA'}
];

const SYNOPSIS_BATTING_STATS = [
	{name:'left_on_base', abbreviation: 'LOB'},
	{name:'doubles', abbreviation: '2B'},
	{name:'tripes', abbreviation: '3B'},
	{name:'home_runs', abbreviation: 'HR'},
	{name:'rbi', abbreviation: 'RBI'},
	{name:'stolen_bases', abbreviation: 'SB'},
]

class TeamResultsComponent extends Component {
	constructor(props) {
		super(props)
	}

	componentWillReceiveProps(nextProps) {
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
			<div className='team-results'>
				<TeamResultsHeader name={teamName} stats={BATTING_STATS} type={'batter'} />
				<TeamResultsPlayers players={batters} stats={BATTING_STATS} type={'batter'} />
				<TeamResultsTotals name={teamName} totals={batterTotals} stats={BATTING_STATS} type={'batter'} />
				<TeamResultsSynopsis stats={SYNOPSIS_BATTING_STATS} players={batters} />
				<TeamResultsHeader name={teamName} stats={PITCHING_STATS} type={'pitcher'} />
				<TeamResultsPlayers players={pitchers} stats={PITCHING_STATS} type={'pitcher'} />
			</div>
		)
	}
}

TeamResultsComponent.propTypes = {
	team: React.PropTypes.string,
	boxscore: React.PropTypes.object
}


export default TeamResultsComponent;
