import React, { Component } from "react";
import { ColorSwatches } from "./components/color-swatches";
import { Button } from "./components/button";
import "./containers/app.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      colors: [],
      hex: "",
      disabled: false,
      message: "",
      showButton: false,
      showColor: false
    };
  }

  //getting 6 colors from noops hexbot api
  componentDidMount() {
    fetch("http://api.noopschallenge.com/hexbot?count=6")
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            isLoaded: true,
            colors: data.colors,
            hex: this.rndHexValue(data.colors),
            disabled: false,
            message: "",
            showButton: false,
            showColor: false
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  //select random color
  rndHexValue = colors => {
    const values = colors.map(item => item.value);
    return values[Math.floor(Math.random() * values.length)];
  };

  //change color hexcode to rgb
  hexToRGB = () => {
    const { hex } = this.state;
    let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  //check to see if color the clicked on matches random color
  checkWin = e => {
    let isWin = false;
    if (this.state.disabled === false) {
      let swatch = document.getElementsByClassName("swatch");
      for (let i = 0; i < swatch.length; i++) {
        if (//if selected color matches, turn background green
          swatch[i].style.backgroundColor === this.hexToRGB() &&
          e.target.style.backgroundColor === this.hexToRGB()
        ) {
          swatch[i].parentNode.style.backgroundColor = "rgb(137, 219, 137)";
          isWin = true;
        } else {//if selected color is not a match, turn background red
          swatch[i].parentNode.style.backgroundColor = "rgb(231, 97, 97)";
        }
      }
      //winning/losing messages to be displayed
      if (isWin) {
        this.setState({ message: `Congratulations, You Win!` });
      } else {
        this.setState({
          message: `You Lose. The correct color is: `,
          showColor: true
        });
      }
    }
    //disable clicking on area after win or lose and show "play again" button
    this.setState({
      disabled: true,
      showButton: true
    });
  };

  //refresh componenet for new colors
  newColors = () => {
    let box = document.getElementsByClassName("box");
    for (let i = 0; i < box.length; i++) {
      box[i].style.backgroundColor = "whitesmoke";
    }
    this.componentDidMount();
  };

  //show correct color (used when player selects a wrong match)
  correctColor = () => (
    <div
      className="correct-color"
      style={{ backgroundColor: this.hexToRGB() }}
    />
  );

  render() {
    const {
      error,
      isLoaded,
      colors,
      showButton,
      message,
      showColor
    } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div>
            <h1>Color Game</h1>
            <h5>{this.hexToRGB()}</h5>
            <div>
              <div>
                <ColorSwatches colors={colors} checkWin={this.checkWin} />
                {
                  <div>
                    <p>{message}</p>
                    {showColor ? this.correctColor() : null}
                  </div>
                }
              </div>
              <div>
                {showButton ? <Button newColors={this.newColors} /> : null}
              </div>
              <p>
                To play this game look at the RGB (red, green, blue) numbers
                above and choose which of the six blocks is the correct color.
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;