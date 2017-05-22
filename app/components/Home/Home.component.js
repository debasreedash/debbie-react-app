/**
 * Created by Debasree Dash
 */

import React, {Component} from 'react';
require('./Home.css');
var apiServer = require('../../utils/api');
var Promise = require('bluebird');
var QueryString = require('query-string');

'use strict';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            counts: []
        };
        var query = QueryString.parse(props.location.search);
        this.types = query.types || ['Bug', 'Story', 'Task'];
        this.api =  apiServer(query.apiRoot || 'http://localhost:4000');
        Promise.map(this.types, (type) => {
            return this.updateIssueType(type)
        }).then(estimates => {
            var counts = [];
            for (var i in this.types) {
                counts.push({
                    type: this.types[i],
                    count: estimates[i]
                });
            }
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
        this.updateIssueType = this.updateIssueType.bind(this);
    }

    updateIssueType(type) {
        return this.api.getIssueTypes(type)
            .then(issues => {
                return Promise.map(issues, (issue) => {
                    return this.api.getIssueEstimateById(issue);
                })
                .then(estimates => {
                   return estimates.reduce((acc, estimate) => acc + estimate, 0);
                });
            })
    }


    render() {
        return (
            <div>
                {
                    this.state.err ? <h2 className="err">{this.state.err}</h2> : (
                        <ul>
                            {this.state.counts.map(estimate => (
                                <li key={estimate.type}>{estimate.type}:{estimate.count}</li>
                            ))}
                        </ul>
                    )
                }

            </div>
        )
    }
}

export default Home
