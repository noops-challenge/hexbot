import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
      error: null,
      isLoaded: false,
      colors: []
    }
  }

  componentDidMount() {
    fetch("http://api.noopschallenge.com/hexbot")
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

  setBackground = () => {
    const { colors } = this.state;
    const colorValue =  colors.map((item) => {
      return item.value;
   })
   document.body.style.background = `${colorValue}`;
  }

  render(){
    const { error, isLoaded } = this.state;

    this.setBackground();

    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <div>
            <h1>Welcome</h1>
          </div>
        </div>
          
      );
    }
  }
}

export default App;
