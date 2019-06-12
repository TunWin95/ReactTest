import React from 'react';
import './ActorGrid.css';

const Grid = (props) => {

    const renderElements = () => {
        const gridElements = props.children.map((element, i) => {
            return (
                <div key={i} className="mov-grid-element">
                    {element}
                </div>
            )
        })
        return gridElements;
    }

    return (
        <div className="movie-grid">
            {props.header && !props.loading ? <h1>{props.header}</h1> : null}
            <div className="mov-grid-content">
                {renderElements()}
            </div>
        </div>
    )
}

export default Grid;