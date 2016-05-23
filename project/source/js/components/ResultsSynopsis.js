import React, { Component, PropTypes } from 'react'

import classNames from 'classnames';

import '../../stylesheets/components/results-synopsis.scss'

import ResultsHeader from './ResultsHeader'

const SYNOPSIS_BATTING_STATS = [
	{name:'left_on_base', abbreviation: 'LOB'},
	{name:'doubles', abbreviation: '2B'},
	{name:'tripes', abbreviation: '3B'},
	{name:'home_runs', abbreviation: 'HR'},
	{name:'rbi', abbreviation: 'RBI'},
	{name:'stolen_bases', abbreviation: 'SB'},
]

class ResultsSynopsis extends Component {
	constructor(props) {
		super(props)
	}

	getStats () {
		return SYNOPSIS_BATTING_STATS.filter(stat => {
			var playersWithStat = this.getPlayersWithStat(stat.name)
			return playersWithStat.length > 0
		})
	}

	getPlayersWithStat (stat) {
		return this.props.players.filter(player => player[stat] > 0)
	}

	getStatString (stat) {
		var string = this.getPlayersWithStat(stat.name).map((player, index) => {
			var statValue = player[stat.name]

			var num = statValue > 1 ? ' (' + statValue.toString() + ')' : '',
				prefix = index === 0 ? ' ' : ', '

			return prefix + player.last_name + num
		})

		return string.concat()
	}

	render () {

		var name = !this.props.name || <ResultsHeader name={this.props.name}  />

		return (
			<div className='results-synopsis'>

				{name}

				{this.getStats().map( (stat, index) =>
					<span key={index} className='category'>
						<span className='category-name'>{stat.abbreviation}:</span>
						{this.getStatString(stat)}
					</span>
				)}
			</div>
		)
	}
}

ResultsSynopsis.propTypes = {
	players: React.PropTypes.array,
	stats: React.PropTypes.array
}


export default ResultsSynopsis;
