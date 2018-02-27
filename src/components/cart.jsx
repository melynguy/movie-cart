import React from "react";
import Movie from "./movie.jsx";
import {store, removeItem} from "./shared-state.js";


export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = store.getState();
    }

    componentDidMount() {
        this.unsub = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsub();
    }

    handleChange(increment, quantity) {
        if(increment) {
            quantity++;
        } else {
            quantity--;
        }
    }

    render() {
        var movies;

        if (this.state.items) {
            movies = this.state.items.map(m => 
            <Movie key={m.movieID} movie={m.item}>
                <button onClick={() => store.dispatch(removeItem(m.movieID))}>
                    Remove
                </button>
                <ul>
                    <li>Format: {m.format}</li>
                    <li>Price: ${m.price * m.quantity}</li>
                    <li>Quantity: <button onClick={() => this.handleChange(false, m.quantity)} disabled={m.quantity < 0}>-</button>{m.quantity}<button onClick={() => this.handleChange(true, m.quantity)} disabled={m.quantity < 0}>+</button></li>
                </ul>
            </Movie>
            );
        }
        return (
            <div className="container">
                <h1>Cart View</h1>
                <div className="movie-list">{movies}</div>
            </div>
        );
    }
}