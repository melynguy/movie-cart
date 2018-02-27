import React from "react";
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

const POSTER = "http://image.tmdb.org/t/p/w185";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mdl-card-wide mdl-shadow--4dp item">
                <div className="movie-image">
                    <img src={POSTER + this.props.movie.poster_path}/>
                </div>
                <div className="movie-info">
                    <div className="movie-title">
                        <h2>{this.props.movie.title}</h2>
                    </div>
                    
                    <p>
                        {this.props.children}
                    </p>

                    <div className="movie-text">
                        <p>{this.props.movie.overview}</p>
                    </div>
                </div> 
            </div>
        );
    }
}