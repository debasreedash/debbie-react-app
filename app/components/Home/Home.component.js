/**
 * Created by Debasree Dash
 */

import React, {Component} from 'react';
import ExternalEstimate from '../../components/ExternalEstimate/ExternalEstimate.component';
require('./Home.css');

var apiServer = require('../../utils/api');
var config = require('Config');
var common = require('../../utils/common');

'use strict';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            counts: []
        };
        this.types = config.types || ['Bug', 'Story', 'Task'];
        this.api =  apiServer(config.serverUrl || 'http://localhost:4000');
        common.processEstimates(this.api, this.types)
            .then(counts => {
                this.setState(function() {
                    return {
                        counts,
                        err: null
                    }
                })
            }, () => {
                this.setState(function() {
                    return {
                        counts: [],
                        err: 'Poor thing, Something went terribly wrong..Check your api root'
                    }
                })
            });
    }

    updateEstimates(estimates) {
        this.setState(function() {
            return {
                counts:estimates,
                err: null
            }
        });
    }

    showErr() {
        this.setState(function() {
            return {
                counts: [],
                err: 'Poor thing, Something went terribly wrong..Check your api root'
            }
        })
    }


    render() {
        return (
            <div>
                <h2 className="title">JIRA Issue Estimates</h2>
                <div className="home-container">
                    {
                        this.state.err ? <h2 className="err">{this.state.err}</h2> : (
                            <div className="issue-list">
                                <label>Current Estimate</label>
                                <ul>
                                    {this.state.counts.map(estimate => (
                                        <li key={estimate.type}>{estimate.type}:{estimate.count}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }
                    <ExternalEstimate onFetch={this.updateEstimates.bind(this)} onErr={this.showErr.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default Home
