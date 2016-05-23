import React, { Component, PropTypes } from 'react'

import classNames from 'classnames';

import ResultsHeader from './ResultsHeader'
import ResultsPlayers from './ResultsPlayers'
import ResultsTotals from './ResultsTotals'

import '../../stylesheets/components/results.scss'

class BatterResults extends Component {
	constructor(props) {
		super(props)
	}

	componentWillReceiveProps(nextProps) {
	}

	render () {


		var hasTotals = this.props.totals,
			totals = !hasTotals || <ResultsTotals name={this.props.teamName} totals={this.props.totals} stats={this.props.stats} type={this.props.type} />

		return (
			<div className='results'>
				<ResultsHeader name={this.props.teamName} stats={this.props.stats} type={this.props.type} />
				<ResultsPlayers players={this.props.players} stats={this.props.stats} type={this.props.type} />
				{totals}
			</div>
		)
	}
}

BatterResults.propTypes = {
	teamName: React.PropTypes.string,
	players: React.PropTypes.array,
	stats: React.PropTypes.array,
	totals: React.PropTypes.object,
	type: React.PropTypes.string
}

export default BatterResults;