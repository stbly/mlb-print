import React, { Component, PropTypes } from 'react'
import { Router, RouteHandler, Link, browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import * as boxscoreActions from '../redux/modules/boxscores'
import BaseballImage from '../components/BaseballImage'

import '../../stylesheets/components/baseball-image-page.scss'

import classNames from 'classnames';


class BaseballImagePage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			previewMode: false
		}
	}

	componentDidMount () {
		this.props.actions.fetchBoxscoreIfNeeded(this.props.params.id)
		this.forceUpdate()
	}

	handleImageAdjusted (element, adjustment) {
		this.props.actions.adjustBoxscoreElementPosition(element, adjustment)
	}

	shouldComponentUpdate (nextProps, nextState) {
		var propsAreTheSame = JSON.stringify(nextProps) === JSON.stringify(this.props),
			stateIsTheSame = JSON.stringify(nextState) === JSON.stringify(this.state)

		console.log(propsAreTheSame, stateIsTheSame, this.props.boxscoreAdjustments)

		return !propsAreTheSame || !stateIsTheSame || this.props.boxscoreAdjustments
	}

	togglePreviewMode () {
		this.setState({previewMode: !this.state.previewMode})
	}

	render () {

		var pageClasses = classNames('baseball-image-page', {'print-preview':this.state.previewMode})

		return (
			<div className={pageClasses}>
				<button><Link className='back-button' to={'/events/' + this.props.params.id}> Go Back</Link></button>

				<BaseballImage
					boxscore={this.props.boxscore}
					secondBoxscore={this.props.secondBoxscore}
					boxscoreAdjustments={this.props.boxscoreAdjustments}
					handleImageAdjusted={this.handleImageAdjusted.bind(this)} />
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(boxscoreActions, dispatch)
    }
}

function mapStateToProps (state,ownProps) {
	return {
		boxscore: state.boxscores.data,
		secondBoxscore: state.boxscores.dataPlaceholder,
		boxscoreAdjustments: state.boxscores.adjustments
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseballImagePage);