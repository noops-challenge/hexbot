import React, { Component } from "react";

export class Button extends Component {
  render() {
    return (//button to get new colors
      <div>
        <button type="button" onClick={this.props.newColors}>
          Play Again
        </button>
      </div>
    );
  }
}
