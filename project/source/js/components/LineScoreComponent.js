import React, { Component, PropTypes } from 'react'

import classNames from 'classnames';
import LineScoreElement from './LineScoreElement'

import '../../stylesheets/components/line-scores.scss'

import DataRow from './DataRow'

import {getTeamName} from '../helpers/stringUtils'

const STATS = [
	{name:'runs', abbreviation: 'R'},
	{name:'hits', abbreviation: 'H'},
	{name:'errors', abbreviation: 'E'}
];

class LineScoreComponent extends Component {
	constructor(props) {
		super(props)
	}

	handleClick (e) {
		if (this.props.handleClick) {
			this.props.handleClick(e);
		}
	}

	render () {

		var boxscore = this.props.boxscore

		return (
			<div onClick={this.handleClick.bind(this)} className='boxscore-item line-scores'>
				<DataRow classes='headers'>
					<div className='team-name'>TEAM</div>

					{boxscore.away_period_scores.map( (score, index) =>
						<span key={index} className='period'> {index + 1} </span>
					)}

					{STATS.map( (stat, index) =>
						<span key={index} className='team-totals'> {stat.abbreviation} </span>
					)}
				</DataRow>

				<LineScoreElement
					team={getTeamName(boxscore.away_team.first_name, boxscore.away_team.last_name)}
					periodScores={boxscore.away_period_scores}
					errors={boxscore.away_errors}
					totals={boxscore.away_batter_totals}
					stats={STATS} />

				<LineScoreElement
					team={getTeamName(boxscore.home_team.first_name, boxscore.away_team.last_name)}
					periodScores={boxscore.home_period_scores}
					errors={boxscore.home_errors}
					totals={boxscore.home_batter_totals}
					stats={STATS} />
			</div>
		)
	}
}

LineScoreComponent.propTypes = {
	boxscore: React.PropTypes.object,
	handleClick: React.PropTypes.func
}


export default LineScoreComponent;
