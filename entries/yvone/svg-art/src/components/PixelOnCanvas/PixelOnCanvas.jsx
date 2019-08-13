import React from 'react';
import './PixelOnCanvas.css';
import ReactSVG from 'react-svg';
import rose from '../../rose.svg'

function PixelOnCanvas(props) {
	let { color1, color2, color3, color4 } = props;

	return (
		<React.Fragment>
			<div className="pixel-on-canvas">
				<ReactSVG
					src={rose}
					afterInjection={(error, svg) => {
						if (error) {
							console.error(error)
							return
						}
						let leaves = document.querySelector('g.svg-leaf-detail');
						leaves.style.fill = color1;
						let leafDetails = document.querySelector('g.svg-leaves');
						leafDetails.style.fill = color2;
						let rose = document.querySelector('g.svg-rose-detail');
						rose.style.fill = color3;
						let roseDetails = document.querySelector('path.svg-rose');
						roseDetails.style.fill = color4;
					}}
					beforeInjection={svg => {
						svg.classList.add('svg-class-name')
						svg.setAttribute('style', 'width: 200px')
					}}
					evalScripts="always"
					fallback={() => <span>Error!</span>}
					loading={() => <span>Loading</span>}
				/>
			</div>
			<div className="pixel-on-canvas-tag">
				Icons made by <a href="https://www.flaticon.com/authors/ddara" title="dDara">dDara</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
			</div>
		</React.Fragment>
	)
}

export default PixelOnCanvas;
