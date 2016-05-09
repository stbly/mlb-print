import React, { Component, PropTypes } from 'react'

import classNames from 'classnames';

import DataRow from './DataRow'

class TeamResultsTotals extends Component {
	constructor(props) {
		super(props)
	}

	componentWillReceiveProps(nextProps) {
	}

	formatStat (stat) {
		return stat === 'avg' ? this.props.totals[stat].toFixed(3) : this.props.totals[stat]
	}

	render () {

		return (
			<DataRow classes={classNames('totals', this.props.type)}>
				<div className='name'>TOTALS</div>

				{this.props.stats.map( (stat, index) => (
					<div key={index} className={classNames('stat',stat.name)}>
						{this.formatStat(stat.name)}
					</div>
				))}
			</DataRow>
		)
	}
}

TeamResultsTotals.propTypes = {
	totals: React.PropTypes.object,
	stats: React.PropTypes.array
}


export default TeamResultsTotals;
