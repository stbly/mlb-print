import React, { Component, PropTypes } from 'react'

import classNames from 'classnames';

import DataRow from './DataRow'

class LineScoreElement extends Component {
	constructor(props) {
		super(props)
	}

	render () {
		this.props.totals.errors = this.props.errors

		return (
			<DataRow classes='line-score'>

				<div className='team-name'> {this.props.team} </div>

				{this.props.periodScores.map( (score, index) => {
					var value = score >= 0 ? score : null

					return <span key={index} className='period'> {value} </span>
				})}

				{this.props.stats.map( (stat, index) => {
					var value = this.props.totals[stat.name]

					return <div key={index} className='team-totals'> {value} </div>
				})}

			</DataRow>
		)
	}
}

LineScoreElement.propTypes = {
	showHeaders: React.PropTypes.bool,
	errors: React.PropTypes.number,
	totals: React.PropTypes.object,
	team: React.PropTypes.string,
	stats: React.PropTypes.array,
	periodScores: React.PropTypes.array
}

export default LineScoreElement;