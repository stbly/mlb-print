import React, { Component, PropTypes } from 'react'

import classNames from 'classnames';

import '../../stylesheets/components/results-synopsis.scss'


class TeamResultsSynopsis extends Component {
	constructor(props) {
		super(props)
	}

	getStats () {
		return this.props.stats.filter(stat => {
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

		return (
			<p className='results-synopsis'>
				{this.getStats().map( (stat, index) =>
					<span key={index} className='category'>
						<span className='category-name'>{stat.abbreviation}:</span>
						{this.getStatString(stat)}
					</span>
				)}
			</p>
		)
	}
}

TeamResultsSynopsis.propTypes = {
	players: React.PropTypes.array,
	stats: React.PropTypes.array
}


export default TeamResultsSynopsis;
