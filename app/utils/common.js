/**
 * Created by debbie
 */
var Promise = require('bluebird');
var config = require('Config');

module.exports = {
    updateIssueType(apiServer, type) {
        return apiServer.getIssueTypes(type)
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
            return this.updateIssueType(apiServer, type)
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