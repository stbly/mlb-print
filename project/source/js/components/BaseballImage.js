import React, { Component, PropTypes } from 'react'

import classNames from 'classnames';

import {removeSpaces} from '../helpers/stringUtils'

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

import BoxScoreAdjustable from '../components/BoxScoreAdjustable'
import '../../stylesheets/components/baseball-image.scss'

class BaseballImage extends Component {
	constructor(props) {
		super(props)
	}

	render () {

		var image = this.props.image;

		return (
			<div className='baseball-image'>
				<div className='container container-boxscore show-baseball' ref={(ref) => this.baseballImage = ref}>
					<BoxScoreAdjustable
						boxscore={this.props.boxscore}
						secondBoxscore={this.props.secondBoxscore}
						adjustments={this.props.boxscoreAdjustments}
						handleDragEnd={this.props.handleImageAdjusted}/>
				</div>

				<div className="container container-guides">
					<svg className='baseball-mask' width="100%" viewBox="0 0 540 180" version="1.1">
		                <defs>
						    <clipPath id="baseballMaskBleed" >
								<path fill-rule="evenodd" clip-rule="evenodd" d="M148.6,9.8c15.6,5.2,31,9.8,46.3,14.9c10.1,3.4,20.5,5.5,31,8.4
									c5,1,10.1,1.9,15.1,2.9c6.4,1.6,13.8,0.7,20.4,2.2c2.2,0,4.5,0,6.7,0c4.8,0,10.3,0.5,14.4-0.5c4.5-1,9.1-0.1,13.4-1.2
									c9.5-2.3,19.1-3,28.1-5.8c6.8-2.1,13.7-3.5,20.4-5.8c22.1-7.4,44-14.3,67.2-20.9c6-1.7,12.4-1.9,18.7-3.4c2.8-0.6,5.8-0.1,8.4-0.7
									H95.2C115.9,0.3,132.7,4.5,148.6,9.8z"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M539.8,98.6c-1.3,5.6-1.2,11.2-2.9,16.3c-8.9,27.2-25.6,45.7-50.6,56.6
									c-4.8,2.1-9.5,3.2-14.9,4.8c-6.5,1.9-15.1,3.2-24,3.6H540V97C539.9,97.6,539.9,98.2,539.8,98.6z"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M449.5,0.2c1.3,0,2.6,0,3.8,0c2.1,0.5,4.5,0.2,6.7,0.7c7.1,1.7,14.2,2.7,20.4,5
									c4,1.5,7.5,2.7,11.3,4.3c16.6,7.3,33,23.9,40.3,40.6c1.8,4.1,2.8,8.1,4.3,12.7c1.5,4.5,1.9,9.9,3.1,15.1c0.1,2,0.2,4,0.2,6
									c0.1,0.4,0.2,1.1,0.2,1.8V0h-92C448.6,0.1,449.1,0.2,449.5,0.2z"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M0.2,84c0.1-2.2,0.2-4.5,0.2-6.7C2,70.5,2.3,63.7,4.3,57.6
									c3.8-11.5,9.3-20.2,15.8-28.8c1.6-2.1,4.8-4.8,7-6.5c3.3-2.5,6.3-5.4,9.8-7.7C45.6,9.2,55.7,6,66.7,2.9c5-1.4,10.4-1.2,15.6-2.4
									C84.5,0,88,1.1,89.8,0H0v85.4C0.1,84.9,0.1,84.4,0.2,84z"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M421.9,177.8c-6.1-1.4-12.2-2.9-18.2-4.3c-13.1-4.3-26.1-7.9-39.1-12.2
									c-30.3-10.2-59.9-19.7-100.6-19.7c-8.6,0-17.6,0.8-25,2.6c-4.4,1.1-8.5,1-12.7,2.2c-8.8,2.5-18.1,4.4-26.4,7.2
									c-3.6,1.2-6.8,1.7-10.3,2.9c-13,4.3-25.9,8.6-38.9,13c-4.1,1.4-8,2-12.2,3.4C116.2,180.1,83.1,183,59,175
									c-25.6-8.5-42.8-23.7-52.8-47.8c-1.9-4.5-2.5-9.1-3.8-14.2c-0.9-3.3-1.1-7.3-1.9-10.8c-0.1-2.2-0.2-4.3-0.2-6.5
									c-0.1-0.4-0.2-0.9-0.2-1.5V180h438C432.3,179.8,426.7,179.1,421.9,177.8z"/>
						    </clipPath>
						    <clipPath id="baseballMaskSafe" >
								<path fill-rule="evenodd" clip-rule="evenodd" d="M0,0v180h540V0H0z M516.7,103c-7.1,28.3-21.9,42.5-48.5,51.1
	c-3.6,1.2-8,1.9-12,2.9c-2.5,0.2-5,0.3-7.4,0.5c-2.3,0.5-6.6,0.5-8.9,0c-1,0-2.1,0-3.1,0c-8.2-1.9-16.3-2.1-23.8-4.6
	c-23.9-7.8-47.3-14.6-71-22.3c-8.2-2.7-16.5-3.7-25.2-6c-12.8-3.4-27.4-5.2-43-5.3c-4.3,0-9.7-0.7-13.9,0.2c-1.4,0-2.7,0-4.1,0
	c-2.4,0.5-5.3,0.1-7.9,0.7c-8.3,1.9-17,1.8-25,4.1c-5.2,1.5-10.8,2.1-16.1,3.8c-14.6,4.8-29.5,8.5-43.4,13.7c-3,1.1-5.9,1.5-8.9,2.6
	c-10.3,3.8-21.5,6.7-32.6,9.8c-4.7,1.3-9.1,1.2-14.2,2.4c-5.6,1.3-15.3,1.9-21.4,0.5c-1.6-0.1-3.2-0.2-4.8-0.2
	c-7.2-1.7-14.2-2.3-20.4-4.8C41.4,144,31.1,132.8,25,110.9c-0.8-2.9-1.2-6.5-1.9-9.6c-0.1-1.9-0.2-3.8-0.2-5.8
	c-0.4-2.1-0.8-8.4-0.2-10.8c1.4-6.4,1-13,2.9-18.7c2.9-8.8,6.8-15.7,11.8-22.3c1.3-1.7,3.3-3.3,5-4.6c2.1-1.6,4-3.6,6.2-5
	c6.9-4.4,15.1-6.9,24-9.4c3.7-0.6,7.4-1.1,11-1.7c1.9-0.4,5,0.5,6.5-0.5c19.7-0.4,35.1,3.3,49.7,8.2c7.8,2.6,15.4,4.5,22.8,7.2
	c14.7,5.5,30,9,45.1,13.9c4,1.3,7.7,1.5,11.8,2.6c7.9,2.2,16.7,2.8,25.2,4.8c3.9,0.9,7.7,0.1,11.8,1c3.5,0.8,7.8-0.4,11.8,0.5
	c0.9,0.2,2.9,0.5,4.1,0.2c3.5-0.8,8.1,0.3,11.8-0.5c8-1.8,16.6-1.1,24.2-3.1c6.6-1.7,13.4-2.3,19.9-4.3c13.6-4.2,27.1-7.6,40.3-12
	c8.4-2.8,17.2-5.8,25.7-8.6c5.5-1.8,11.1-3,16.6-4.8c5.4-1.8,10.7-1.9,16.6-3.4c6.2-1.5,18.2-2.8,25.4-1.2c2,0.2,4,0.3,6,0.5
	c5.3,1.3,10.8,1.9,15.6,3.8c19.8,8.1,33.2,19.6,40.1,40.6C517.1,76.4,519.4,92.1,516.7,103z"/>
						    </clipPath>

						    <pattern id="stadiumImage" patternUnits="userSpaceOnUse" width="100%" height="100%">
								<rect width="100%" height="100%" fill="white" />
							</pattern>
						</defs>
		                <svg className='baseball-image' width="100%" height="100%" clipPath="url(#baseballMaskBleed )">
				            <rect width="100%" height="100%" fill="url(#stadiumImage)" />
						</svg>
			      	</svg>
		            <svg className='baseball-guides' width="100%" viewBox="0 0 540 180" opacity="0.5" version="1.1"  clipPath="url(#baseballMaskSafe )">
		                <svg className='baseball-bleed' width="100%" height="100%" version="1.1">
				            <use xlinkHref={ require('../../images/baseball_bleed.svg') } />
						</svg>
		                <svg className='baseball-normal' width="100%" height="100%" version="1.1">
				            <use xlinkHref={ require('../../images/baseball_normal.svg') } />
						</svg>
		            </svg>
		        </div>
			</div>
		)
	}
}

BaseballImage.propTypes = {
	image: React.PropTypes.string,
	boxscore: React.PropTypes.object,
	secondBoxscore: React.PropTypes.object,
	boxscoreAdjustments: React.PropTypes.object
}


export default BaseballImage;
