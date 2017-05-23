/**
 * @author Debasree Dash
 */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
var common = require('../../utils/common');
var apiServer = require('../../utils/api');
var config = require('Config');
require('./ExternalEstimate.css');


/**
 * Component: EstimateBtn
 * Purpose: returns an encapsulated button to fetch estimates when the api url and type list are provided
 */
class EstimateBtn extends Component {
    constructor(props) {
        super(props);
        this.fetchEstimates = props.clickHandler;
    }
    render() {
        return (
            <div className="input-container">
                <Link className="button" to="/estimate" onClick={this.fetchEstimates}>Fetch Estimate</Link>
            </div>
        )
    }
}

/**
 * Component: ExternalEstimate
 * Purpose: Holds the required inputs and components to fetch an external estimate
 */
class ExternalEstimate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiRoot: config.serverUrl,
            types: config.types.join(',')
        };

        this.onFetch = props.onFetch;
        this.onErr = props.onErr;
        this.handleApiRootChange = this.handleApiRootChange.bind(this);
        this.handleTypesChange = this.handleTypesChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    //on change handler for any changes to the api root input field
    handleApiRootChange(event) {
        var value = event.target.value;
        this.setState(function() {
            return {
                apiRoot: value
            }
        });
    }

    //on change handler for any changes to the lists field
    handleTypesChange(event) {
        var value = event.target.value;
        this.setState(function() {
            return {
                types: value
            }
        });
    }

    //click handler to call common service to process estimates for given inputs
    handleClick(event) {
        event.preventDefault();
        var array = this.state.types.split(',');
        var api = apiServer(this.state.apiRoot);
        common.processEstimates(api, array)
            .then((count) => {
                this.onFetch(count);
            }, () => {
                this.onErr();
            });
    }

    render() {
        return (
            <div className="input-container">
                <label>Enter values for External API</label>
                <input
                    className="input-box-api"
                    id="apiRoot"
                    placeholder="Enter Api Root here"
                    value={this.state.apiRoot}
                    autoComplete="off"
                    type="text"
                    onChange={this.handleApiRootChange} />
                <input
                    className="input-box-types"
                    id="types"
                    placeholder="Enter Comma Delimeter Types"
                    value={this.state.types}
                    autoComplete="off"
                    type="text"
                    onChange={this.handleTypesChange} />
                <EstimateBtn clickHandler={this.handleClick}/>
            </div>
        )
    }
}

ExternalEstimate.propTypes = {
    apiRoot: PropTypes.string.isRequired,
    types: PropTypes.string.isRequired
};

ExternalEstimate.defaultProps = {
    apiRoot: '',
    types: ''
};

export default ExternalEstimate;