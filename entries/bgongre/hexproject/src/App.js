import React, { Component } from 'react';
import { ColorSwatches } from './components/color-swatches';
import './containers/App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      colors: [],
      hex: ''
    }
  }

  componentDidMount() {
    fetch("http://api.noopschallenge.com/hexbot?count=6")
      .then(res => res.json())
      .then((data) => {
        this.setState({
          isLoaded: true,
          colors: data.colors,
          hex: this.rndHexValue(data.colors)
        })
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  rndHexValue = (colors) => {
    const values = colors.map(item => item.value)
    return values[Math.floor(Math.random() * values.length)];
  }

  hexToRGB = () => {
    const { hex } = this.state;
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  handleClick = (e) => {
    if (e.target.style.backgroundColor === this.hexToRGB()){
      console.log(e.target.value)
      let box = document.getElementsByClassName("box");
      // for(let i = 0; i < box.length; i++){
      //   if(e.target.style.backgroundColor === this.hexToRGB() && e.target.value === box[i]){
      //   box[i].style.backgroundColor="rgb(137, 219, 137)";
      //   }
      // }
    }
  }

  render(){
    const { error, isLoaded, colors } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <div>
            <h1>Color Game</h1>
            <h5>{this.hexToRGB()}</h5>
            <div 
            onClick={this.handleClick}>
            <ColorSwatches 
              colors={colors}
              />
            </div>
            <p>To play this game look at the RGB (red, green, blue) numbers above and choose which of the six blocks is the correct color.</p>
          </div>
        </div>
      );
    }
  }
}

export default App;