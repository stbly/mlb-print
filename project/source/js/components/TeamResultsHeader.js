import React, { Component, PropTypes } from 'react'

import classNames from 'classnames';

import DataRow from './DataRow'

class TeamResultsHeader extends Component {
	constructor(props) {
		super(props)
	}

	componentWillReceiveProps(nextProps) {
	}

	render () {

		var name = this.props.name

		return (

			<DataRow classes={classNames('headers', this.props.type)}>

				<div className='name'>{name}</div>

				{this.props.stats.map( (stat, index) =>
					<div key={index} className={classNames('stat',stat.name)}> {stat.abbreviation} </div>
				)}

			</DataRow>
		)
	}
}

TeamResultsHeader.propTypes = {
	name: React.PropTypes.string,
	stats: React.PropTypes.array
}

export default TeamResultsHeader;