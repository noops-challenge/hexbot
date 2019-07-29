import React, { Component } from "react";
import "../containers/color-swatches.css";

export class ColorSwatches extends Component {
  render() {
    return (//renders the color blocks for the game
      <div className="flex-container">
        <div className="container" onClick={this.props.checkWin}>
          <div className="box">
            <div
              className="swatch"
              style={{ backgroundColor: this.props.colors[0].value }}
            />
          </div>
          <div className="box">
            <div
              className="swatch"
              style={{ backgroundColor: this.props.colors[1].value }}
            />
          </div>
          <div className="box">
            <div
              className="swatch"
              style={{ backgroundColor: this.props.colors[2].value }}
            />
          </div>
          <div className="box">
            <div
              className="swatch"
              style={{ backgroundColor: this.props.colors[3].value }}
            />
          </div>
          <div className="box">
            <div
              className="swatch"
              style={{ backgroundColor: this.props.colors[4].value }}
            />
          </div>
          <div className="box">
            <div
              className="swatch"
              style={{ backgroundColor: this.props.colors[5].value }}
            />
          </div>
        </div>
      </div>
    );
  }
}
