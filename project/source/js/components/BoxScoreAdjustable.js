import React, { Component, PropTypes } from 'react'
import { Router, RouteHandler, Link, browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import classNames from 'classnames';

import LineScoreComponent from './LineScoreComponent'
import TeamResultsComponent from './TeamResultsComponent'
import AdjustableContainer from './AdjustableContainer'
import GameSynopsis	from './GameSynopsis'
import ResultsSynopsis from './ResultsSynopsis'
import Results from './Results'
import BoxScore from './BoxScore'

import '../../stylesheets/components/box-score.scss'

import {BATTING_STATS, PITCHING_STATS, SYNOPSIS_BATTING_STATS} from '../helpers/constants'

import {getTeamName} from '../helpers/stringUtils'

class BoxScoreAdjustable extends BoxScore {
	constructor(props) {
		super(props)
	}


	createAdjustmentHandler (name) {
		return (coordinates) => {
			if (this.props.handleDragEnd) {
				this.props.handleDragEnd(name, coordinates)
			}
		}
	}

	getAdjustmentsFor (name) {
		var adjustments;

		if (this.props.adjustments) {
			adjustments = this.props.adjustments[name];
		}

		return adjustments || 0
	}

	render () {
		var boxscore = this.props.boxscore;

		if (!boxscore) {
			return (<div></div>)
		}

		console.log('boxscore adjustments:',this.props)

		return (
			<div className='boxscores'>
				<AdjustableContainer ignoreX
					adjustments={this.getAdjustmentsFor('container-1')}
					handleDragEnd={this.createAdjustmentHandler('container-1')}>

						<Results
							teamName={this.props.boxscore.away_team.first_name.toUpperCase()}
							players={this.props.boxscore.away_batters}
							stats={BATTING_STATS}
							totals={this.props.boxscore.away_batter_totals} />
						<Results
							teamName={this.props.boxscore.home_team.first_name.toUpperCase()}
							players={this.props.boxscore.home_batters}
							stats={BATTING_STATS}
							totals={this.props.boxscore.home_batter_totals} />



				</AdjustableContainer>

				<AdjustableContainer ignoreX
					adjustments={this.getAdjustmentsFor('container-2')}
					handleDragEnd={this.createAdjustmentHandler('container-2')}>

						<LineScoreComponent boxscore={this.props.boxscore}/>
						<GameSynopsis />

				</AdjustableContainer>

				<AdjustableContainer ignoreX
					adjustments={this.getAdjustmentsFor('container-3')}
					handleDragEnd={this.createAdjustmentHandler('container-3')}>


						<Results
							teamName={this.props.boxscore.away_team.first_name.toUpperCase()}
							players={this.props.boxscore.away_pitchers}
							stats={PITCHING_STATS} />

						<ResultsSynopsis
							stats={SYNOPSIS_BATTING_STATS}
							players={this.props.boxscore.away_batters} />

						<Results
							teamName={this.props.boxscore.home_team.first_name.toUpperCase()}
							players={this.props.boxscore.home_pitchers}
							stats={PITCHING_STATS} />

						<ResultsSynopsis
							stats={SYNOPSIS_BATTING_STATS}
							players={this.props.boxscore.home_batters} />



				</AdjustableContainer>
			</div>
		)
	}
}

BoxScoreAdjustable.propTypes = {
	boxscore: React.PropTypes.object,
	secondBoxscore: React.PropTypes.object,
	adjustments: React.PropTypes.object,
	handleDragEnd: React.PropTypes.func
}

export default BoxScoreAdjustable;