import React, { Component } from 'react';

export class Button extends Component{

    newColors = () => {
        let box = document.getElementsByClassName("box");
        for (let i = 0; i < box.length; i++) {
        box[i].style.backgroundColor="whitesmoke";
        }
    }

    render(){
        return (
            <div>
                <button type="button" onClick={ this.newColors }>Play Again</button>
            </div>
        )
    }
}