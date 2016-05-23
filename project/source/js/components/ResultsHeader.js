import React, { Component, PropTypes } from 'react'

import classNames from 'classnames';

import DataRow from './DataRow'

class ResultsHeader extends Component {
	constructor(props) {
		super(props)
	}

	componentWillReceiveProps(nextProps) {
	}

	render () {

		var name = this.props.name

		var stats = !this.props.stats || this.props.stats.map( (stat, index) =>
			<div key={index} className={classNames('stat',stat.name)}> {stat.abbreviation} </div>
		)

		return (

			<DataRow classes={classNames('headers', this.props.type)}>

				<div className='name'>{name}</div>

				{stats}

			</DataRow>
		)
	}
}

ResultsHeader.propTypes = {
	name: React.PropTypes.string,
	stats: React.PropTypes.array
}

export default ResultsHeader;