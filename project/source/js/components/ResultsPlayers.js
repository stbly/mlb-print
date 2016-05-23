import React, { Component, PropTypes } from 'react'

import classNames from 'classnames';

import DataRow from './DataRow'

class ResultsPlayers extends Component {
	constructor(props) {
		super(props)
	}

	getStatsFor (player) {
		return this.props.stats.map((stat,index) => {

			var name = stat.name,
				value, classes

			switch (true) {
				case name === 'avg':
					value = player[name].toFixed(3)
					break
				case name === 'era':
					if (player.innings_pitched === 0 && player.earned_runs > 0) {
						value = 'INF'
					} else {
						value = player[name].toFixed(2)
					}
					break
				case name === 'innings_pitched':
					var inningsPitched = player[name].toFixed(0),
						remainder = (player[name].toFixed(1) % 1).toFixed(1),
						oneThird = remainder === '0.1',
						twoThirds = remainder === '0.2'
					// value = inningsPitched

					if (inningsPitched > 0) {
						value = inningsPitched
					} else {
						if (oneThird || twoThirds) {
							value = null
						} else {
							value = (0).toFixed(1).toString()
						}
					}
					classes = classNames(classes, {'one-third': oneThird}, {'two-thirds':twoThirds})
					break;
				default:
					value = player[name]
			}

			return {name, value, classes}
		})
	}

	getPositionFor (player) {
		var value
		if (this.props.type === 'batter') {
			value = player.position.toLowerCase()
		} else {
			switch (true) {
				case player.win:
					value = '(W)'
					break
				case player.loss:
					value = '(L)'
					break
				case player.hold:
					value = '(H)'
					break
				case player.save:
					value = '(S)'
					break
				default:
					value = ''
					break
			}
		}
		return value
	}

	render () {
		return (
			<div className='players'>
				{this.props.players.map( (player, index) => {

					var playerName = player.first_name.charAt(0) + '. ' + player.last_name,
						playerPosition = this.getPositionFor(player)

					return (
						<DataRow key={index} classes={classNames('player', this.props.type, {'sub-batting-order': player.sub_bat_order > 0})}>
							<div className='name'>
								{playerName + ' ' + playerPosition}
							</div>

							{this.getStatsFor(player).map( (stat, index) =>
								<div key={index} className={classNames('stat', stat.name, stat.classes)}>
									{stat.value}
								</div>
							)}
						</DataRow>
					)
				})}
			</div>
		)
	}
}

ResultsPlayers.propTypes = {
	players: React.PropTypes.array,
	stats: React.PropTypes.array
}


export default ResultsPlayers;
