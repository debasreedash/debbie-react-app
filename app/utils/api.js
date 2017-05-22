/**
 * Created by Debasree Dash.
 */

var axios = require('axios');

module.exports = function(apiServer) {
    return {
        getIssueTypes(type) {
            return axios.get(apiServer + '/issuetypes/' + type)
                .then(res => res.data.issues);
        },
        getIssueEstimateById(id) {
            return axios.get(apiServer + id)
                .then(res => parseInt(res.data.estimate));
        }
    };
};