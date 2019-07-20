import React from 'react';
import '../containers/color-swatches.css';

export const ColorSwatches = (props) => {
    return (
        <div className="flex-container">
            <div className="container">
                <div className="box box1">
                    <div className="swatch" style={{backgroundColor: props.colors[0].value}}></div>
                </div>
                <div className="box box2">
                    <div className="swatch" style={{backgroundColor: props.colors[1].value}}></div>
                </div>
                <div className="box box3">
                    <div className="swatch" style={{backgroundColor: props.colors[2].value}}></div>
                </div>
                <div className="box box4">
                    <div className="swatch" style={{backgroundColor: props.colors[3].value}}></div>
                </div>
                <div className="box box5">
                    <div className="swatch" style={{backgroundColor: props.colors[4].value}}></div>
                </div>
                <div className="box box6">
                    <div className="swatch" style={{backgroundColor: props.colors[5].value}}></div>
                </div>
            </div>
        </div>
    )
}