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
						<span className='game-date'>June 3, 2016</span>
						Scherzer pitches 8 innings to help Nats beat Marlins 8-2
					</span>
				Even when Max Scherzer eases up on the strikeouts, he can be plenty tough.</p>
				<p>Just ask the Miami Marlins. Scherzer fanned eight -- a modest total by his recent standards -- and allowed only two runs in eight innings Sunday to help the Washington Nationals beat Miami 8-2. Scherzer (5-3) gave up six hits, walked none and threw 103 pitches. He has 38 strikeouts in his past three starts, including a record-tying 20 against Detroit, but relied mostly on weak contact rather than whiffs against Miami.</p>
			</div>
		)
	}
}

GameSynopsis.propTypes = {
	synopsis: React.PropTypes.string,
	date: React.PropTypes.string,
}


export default GameSynopsis;
