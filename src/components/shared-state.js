import {createStore} from "redux";
import Movie from "./movie.jsx";

const ADD_DVD_ACTION = "addDVDToCart";
const ADD_BLU_RAY_ACTION = "addBluRayToCart"
const REMOVE_ITEM_ACTION = "removeItem";
const DEFAULT_STATE = {items: []};
const LS_KEY = "movie-store";

//takes initial/current state and action object to return new state 
export function reducer(state, action) {
    switch(action.type) {
        case ADD_DVD_ACTION:
            return Object.assign({}, {items: state.items.concat(action)});
            
        case ADD_BLU_RAY_ACTION:
            return Object.assign({}, {items: state.items.concat(action)});
            
        case REMOVE_ITEM_ACTION:
            return Object.assign({}, {items: state.items.filter(item => item.movieID != action.id)});
        default:
            return state;
    }
}

export function addDVD(item, id) {
    return {
        type: ADD_DVD_ACTION,
        format: "DVD",
        quantity: 1,
        price: 14.95,
        item: item,
        movieID: id + "dvd"
    }
}


export function addBluRay(item, id) {
    return {
        type: ADD_BLU_RAY_ACTION,
        format: "Blu-ray",
        quantity: 1,
        price: 19.95,
        item: item,
        movieID: id + "bluray"
    }
}


export function removeItem(id) {
    return {
        type: REMOVE_ITEM_ACTION,
        id: id
    }
}
var savedState = JSON.parse(localStorage.getItem(LS_KEY));
export var store = createStore(reducer, (savedState || DEFAULT_STATE));

store.subscribe(() => localStorage.setItem(LS_KEY, JSON.stringify(store.getState())));