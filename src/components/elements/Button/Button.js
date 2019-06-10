import React, { Component } from 'react';
import './Button.css';

class Button extends Component {

    render(){
        return (
            <div className="button-group">
                <button className="button popular">POPULAR</button>
                <button className="button rated">TOP RATED</button>
                <button className="button upcoming">UPCOMING</button>
                <button className="button playing">NOW PLAYING</button>
            </div>
        )
    }
}

export default Button;