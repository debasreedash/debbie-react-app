/**
 * @author Debasree Dash.
 */

var axios = require('axios');

/**
 * Contains the http services to return data from the server using axios
 * @param apiServer path of the server url
 * @returns {*}
 */
module.exports = function(apiServer) {
    return {
        getIssuesForType(type) {
            return axios.get(apiServer + '/issuetypes/' + type)
                .then(res => res.data.issues);
        },
        getIssueEstimateById(id) {
            return axios.get(apiServer + id)
                .then(res => parseInt(res.data.estimate));
        }
    };
};