import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      colors: [],
      values: [],
      hex: ''
    }
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

  hexValuesToArr = () => {
    const { colors, values } = this.state;
    colors.forEach((item) =>{
      let val = item.value;
      values.push(val);
    })
    console.log(values);
  }

  getRandomHexValue = () => {
    const { values } = this.state;
    let hex = values[Math.floor(Math.random() * values.length)];
    console.log(hex);
  }

  hexToRGB = () => {
    const { hex } = this.state;
    let r = 0, g = 0, b = 0;
    
    if (hex.length === 7){
      r = `0x${hex[1]}${hex[2]}`;
      g = `0x${hex[3]}${hex[4]}`;
      b = `0x${hex[5]}${hex[6]}`;
    }
    
    console.log(`rgb(${r}, ${g}, ${b})`);
    console.log(hex);
    return `rgb(${r}, ${g}, ${b})`;
  }

  render(){
    const { error, isLoaded, colors } = this.state;

    this.hexValuesToArr();
    this.getRandomHexValue();
    // this.hexToRGB();

    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <div>
            <h1>Color Game</h1>
            <div className="flex-container">
              <div className="container">
                <div className="box box1">
                  <div className="swatch" style={{backgroundColor: colors[0].value}}></div>
                </div>
                <div className="box box2">
                  <div className="swatch" style={{backgroundColor: colors[1].value}}></div>
                </div>
                <div className="box box3">
                  <div className="swatch" style={{backgroundColor: colors[2].value}}></div>
                </div>
                <div className="box box4">
                  <div className="swatch" style={{backgroundColor: colors[3].value}}></div>
                </div>
                <div className="box box5">
                  <div className="swatch" style={{backgroundColor: colors[4].value}}></div>
                </div>
                <div className="box box6">
                  <div className="swatch" style={{backgroundColor: colors[5].value}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;