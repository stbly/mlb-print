import React, { Component, PropTypes } from 'react'

import classNames from 'classnames';

import '../../stylesheets/components/game-synopsis.scss'

class GameSynopsis extends Component {
	constructor(props) {
		super(props)
	}

	render () {

		// var name = !this.props.synopsis || <ResultsHeader name={this.props.synopsis}  />

		return (
			<div className='game-synopsis'>

				<p>
					<span className='headline'>
						<span className='game-date'>August 18, 2011</span>
						Trout hits first Major League homer in bout with Orioles
					</span>
				Trout began his quest for baseball immortality last night, going yard for the first time since being called up from AAA Salt Lake. Mark Worrel was on the losing end of the pitching duel, with Trout depositing a 3-1 offering into the left field bleachers.</p>

			</div>
		)
	}
}

GameSynopsis.propTypes = {
	synopsis: React.PropTypes.string,
	date: React.PropTypes.string,
}


export default GameSynopsis;
