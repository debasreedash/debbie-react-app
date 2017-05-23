/**
 * @author Debasree Dash
 */
var Promise = require('bluebird');
var config = require('Config');

/**
 * getEstimatesForIssueType: accepts a server url and a type and does the following:
 *  - calls the getIssuesForType http service to get matching issues
 *  - iterates and calls the getIssueByEstimateId http service to retrieve the estimates per issue (returns a promise)
 *  - reduces the responses to sum up all the estimates
 *
 *  processEstimates: accepts a server url and a type and calls the getEstimatesForIssueType function
 *  defined above (it is abstracted to the common utility to be used by both the Home Component
 *  and the External Estimate Component)
 */
module.exports = {
    getEstimatesForIssueType(apiServer, type) {
        return apiServer.getIssuesForType(type)
            .then(issues => {
                return Promise.map(issues, (issue) => {
                    return apiServer.getIssueEstimateById(issue);
                })
                .then(estimates => {
                    return estimates.reduce((acc, estimate) => acc + estimate, 0);
                });
            })
    },
    processEstimates(apiServer, types) {

        var types = types || config.types;

        return Promise.map(types, (type) => {
            return this.getEstimatesForIssueType(apiServer, type)
        }).then(estimates => {
            var counts = [];
            for (var i in types) {
                counts.push({
                    type: types[i],
                    count: estimates[i]
                });
            }
            return counts;
        });
    }
};