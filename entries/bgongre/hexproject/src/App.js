import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      colors: []
    }
  }

  componentDidMount() {
    fetch("http://api.noopschallenge.com/hexbot?count=2")
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

  hexToRGB = (hex) => {
    let r = parseInt(hex.slice(1,3), 16),
        g = parseInt(hex.slice(3,5), 16),
        b = parseInt(hex.slice(5,7), 16)
    return `rgb (${r}, ${g}, ${b})`;
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
            <h1>Color Swatches</h1>
            <div className="box1">
              <div className="color1" style={{backgroundColor: colors[0].value}}></div>
            </div>
            <div className="box2">
              <div className="color2" style={{backgroundColor: colors[1].value}}></div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;