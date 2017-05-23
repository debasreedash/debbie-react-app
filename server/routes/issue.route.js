/**
 * @author Debasree Dash
 */

const fs = require('fs');
const bugs = JSON.parse(fs.readFileSync('server/data/bugs.json', 'utf8'));
const stories = JSON.parse(fs.readFileSync('server/data/stories.json', 'utf8'));

/**
 * Returns the issue specific issue objects for each issu type provided
 * @param type type of issue given
 * @returns {{issues: Array}} array of matching issues
 */
module.exports.getIssuesForType = function (type) {
    switch (type.toLowerCase()) {
        case 'bug':
            return bugs;
        case 'story':
            return stories;
        default:
            return {issues:[]};
    }
};

/**
 * Returns the estimates for each issue by issue id
 * @param id the issue id
 */
module.exports.getIssueEstimateById = function(id) {
    return JSON.parse(fs.readFileSync('server/data/issue-' + id + '.json', 'utf8'));
};