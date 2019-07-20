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
      values: [],
      hex: '',
      rgb: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.rndHexValue = this.rndHexValue.bind(this);
    this.hexValuesToArr = this.hexValuesToArr.bind(this);
    this.hexToRGB = this.hexToRGB.bind(this);
  }

  componentDidMount() {
    fetch("http://api.noopschallenge.com/hexbot?count=6")
      .then(res => res.json())
      .then((data) => {
        this.setState({
          isLoaded: true,
          colors: data.colors
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

  hexValuesToArr() {
    const { colors, values } = this.state;
    colors.forEach((item) =>{
      let val = item.value;
      values.push(val);
    });
  }

  rndHexValue() {
    const { values } = this.state;
    const val = values[Math.floor(Math.random() * values.length)];
    this.setState({ hex: val });
  }

  hexToRGB() {
    const { hex } = this.state;
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    
    this.setState({ rgb: `rgb(${r},${g},${b})`});
  }

  handleClick(e) {
    if (e.target.style.backgroundColor) {
      console.log(e.target.style.backgroundColor);
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
            <p></p>
            <div 
            onClick={this.handleClick}>
            <ColorSwatches 
              colors={colors} 
              hexArray={this.hexValuesToArr()} 
              setRndHex={this.rndHexValue}
              hexToRGB={this.hexToRGB}
              />
              </div>
          </div>
        </div>
      );
    }
  }
}

export default App;