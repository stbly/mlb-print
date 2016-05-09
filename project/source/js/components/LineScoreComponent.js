import React, { Component, PropTypes } from 'react'

import classNames from 'classnames';
import LineScoreElement from './LineScoreElement'

import '../../stylesheets/components/line-scores.scss'

import DataRow from './DataRow'

const STATS = [
	{name:'runs', abbreviation: 'R'},
	{name:'hits', abbreviation: 'H'},
	{name:'errors', abbreviation: 'E'}
];

class LineScoreComponent extends Component {
	constructor(props) {
		super(props)
	}

	render () {

		var boxscore = this.props.boxscore

		return (
			<div className='line-scores'>
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
					team={boxscore.away_team.first_name}
					periodScores={boxscore.away_period_scores}
					errors={boxscore.away_errors}
					totals={boxscore.away_batter_totals}
					stats={STATS} />

				<LineScoreElement
					team={boxscore.home_team.first_name}
					periodScores={boxscore.home_period_scores}
					errors={boxscore.home_errors}
					totals={boxscore.home_batter_totals}
					stats={STATS} />
			</div>
		)
	}
}

LineScoreComponent.propTypes = {
	boxscore: React.PropTypes.object
}


export default LineScoreComponent;
