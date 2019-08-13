import React from 'react';
import axios from 'axios';
import PixelOnCanvas from './components/PixelOnCanvas';
import './App.css';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			colors: ["#294f1a", "#305c1e", "#a30000", "#bd0000"]
		}
	}

	getColors = async () => {
		let newColors = [];

		await axios.get('https://api.noopschallenge.com/hexbot?count=4')
			.then((result) => result.data.colors)
			.then((colors) => {
				newColors = colors.map(color => color.value);
			})

		this.setState({ colors: newColors })
	}

	render() {
		return (
			<div className="App">
				<PixelOnCanvas 
					color1={this.state.colors[0]}
					color2={this.state.colors[1]}
					color3={this.state.colors[2]}
					color4={this.state.colors[3]}
				/>

				<button className="hexbot-btn" onClick={this.getColors}>
					MIX UP!
				</button>
			</div>
		);
	}
}

export default App;
