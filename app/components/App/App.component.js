/**
 * @author Debasree Dash
 */
import React, {Component} from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Home from '../../components/Home/Home.component';
require('../../index.css');

/**
 * Component: App
 * Loads the Home Container
 */
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Route exact path="" component={Home} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;