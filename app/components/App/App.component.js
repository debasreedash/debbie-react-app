/**
 * Created by Debasree Dash
 */
import React, {Component} from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import Home from '../../components/Home/Home.component';
require('../../index.css');
var apiServer = 'apiRoot=http://localhost:4000/';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Route path="" component={Home} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;