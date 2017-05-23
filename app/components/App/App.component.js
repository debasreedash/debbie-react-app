/**
 * Created by Debasree Dash
 */
import React, {Component} from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Home from '../../components/Home/Home.component';
import ExternalEstimate from '../../components/ExternalEstimate/ExternalEstimate.component';
require('../../index.css');
var apiServer = 'apiRoot=http://localhost:4000/';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Switch>
                        <Route exact path="" component={Home} />
                        <Route exact path="/estimate" component={ExternalEstimate} />
                        <Route render={function () {
                            return <p>Not found!</p>
                        }} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;