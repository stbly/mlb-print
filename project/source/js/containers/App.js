import React, { Component, PropTypes } from 'react'
import { Router, RouteHandler, Link, browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import '../../stylesheets/components/app.scss'

import EventSearch from './EventSearch'
import BoxScore from './BoxScore'

class App extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (

			<div className='app'>
				<EventSearch />
				<BoxScore />
			</div>
		)
	}
}

export default App;


				// {this.props.children || "No Child Route yet"}