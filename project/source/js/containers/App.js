import React, { Component, PropTypes } from 'react'
import { Router, RouteHandler, Link, browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import '../../stylesheets/components/app.scss'

class App extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (

			<div className='baseball-printing-app'>
				{this.props.children || "No page yet"}
			</div>
		)
	}
}

export default App;


				// {this.props.children || "No Child Route yet"}