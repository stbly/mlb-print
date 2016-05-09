import React, { Component, PropTypes } from 'react'

import classNames from 'classnames';

class DataRow extends Component {
	constructor(props) {
		super(props)
	}

	render () {

		var rowClasses = classNames('row', this.props.classes)

		return (
			<div className={rowClasses}>
				{this.props.children}
			</div>
		)
	}
}

DataRow.propTypes = {
	classes: React.PropTypes.string
}

export default DataRow;