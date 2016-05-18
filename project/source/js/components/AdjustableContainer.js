import React, { Component, PropTypes } from 'react'
import { Router, RouteHandler, Link, browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import classNames from 'classnames';

import * as boxscoreActions from '../redux/modules/boxscores'

import LineScoreComponent from '../components/LineScoreComponent'
import TeamResultsComponent from '../components/TeamResultsComponent'

import '../../stylesheets/components/box-score.scss'

class AdjustableContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isAdjusting: false,
			adjustments: {
				x: 0,
				y: 0
			}
		}
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.adjustments) {
			console.log('adjustments found!', nextProps.adjustments)
			this.setState({adjustments: nextProps.adjustments})
		}
	}

	handleDragStart (e) {
		this.setState({isAdjusting: true})

		e.dataTransfer.setDragImage(document.getElementById('drag-image'),50,50);

		this.dragOffsetX = this.state.adjustments.x ;
		this.dragOffsetY = this.state.adjustments.y;

		console.log(this.state)
		this.dragStartX = e.nativeEvent.screenX;
		this.dragStartY = e.nativeEvent.screenY;
	}

	handleDrag (e) {
		var diffX = (e.nativeEvent.screenX - this.dragStartX) / 2,
			diffY = (e.nativeEvent.screenY - this.dragStartY) / 2

		console.log(this.state.adjustments)

		if (e.nativeEvent.clientY !== 0 || e.nativeEvent.clientX !== 0) {
			this.setState({
				adjustments: {
					x: diffX + this.dragOffsetX,
					y: diffY + this.dragOffsetY
				}
			})
		}
	}

	handleDragEnd (e) {
		this.setState({isAdjusting: false})
		if (this.props.handleDragEnd) {
			this.props.handleDragEnd( this.state.adjustments )
		}
	}

	render () {
		var adjustments = this.state.adjustments;

		var	offsetX = this.props.ignoreX ? 0 : adjustments.x,
			offsetY = this.props.ignoreY ? 0 : adjustments.y

		return (
			<div className='drag-container'
				style={{transform: 'translate3d(' + offsetX + '%,' + offsetY + '%,0)'}}
				draggable={true}
				onDragStart={this.handleDragStart.bind(this)}
				onDrag={this.handleDrag.bind(this)}
				onDragEnd={this.handleDragEnd.bind(this)} >
					<div id='drag-image'></div>
					{this.props.children}
			</div>
		)
	}
}

/*
function mapDispatchToProps(dispatch) {

}
*/

export default AdjustableContainer;