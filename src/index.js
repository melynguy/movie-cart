import React from "react";
import {render} from "react-dom";

import App from "./components/app.jsx";
import Cart from "./components/cart.jsx";
import Products from "./components/products.jsx";

//import our stylesheet so webpack puts it into the bundle
import "./css/main.css";
//react-mdl stylesheet
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

import {Router, Route, IndexRoute, hashHistory} from "react-router";


var router = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Products}></IndexRoute>
            <Route path="/components/cart" component={Cart}></Route>
            <Route></Route>
        </Route>
    </Router>
);

//TODO: replace the JSX here with a Router configuration
//from the react router module (already a dependency in package.json)
render((router), document.getElementById("app"));


