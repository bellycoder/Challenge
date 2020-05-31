import React, { Component } from 'react'
import './Canvas.css'

export default class Canvas extends Component {
    render() {
        return (
            <div className="contenedorCanvas">
                    <canvas id="canvas1" >
                    </canvas>
            </div>
        )
    }
}
