import React from "react";
import {Link, IndexLink} from "react-router";

import {store} from "./shared-state.js";

export default class App extends React.Component {
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

    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li><IndexLink to="/" activeClassName="active">Products</IndexLink></li>
                        <li><Link to="/components/cart" activeClassName="active">Cart ({this.state.items.length})</Link></li>
                    </ul>
                </nav>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}
