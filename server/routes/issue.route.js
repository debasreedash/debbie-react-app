/**
 * Created by debbie
 */

const fs = require('fs');
const bugs = JSON.parse(fs.readFileSync('server/data/bugs.json', 'utf8'));
const stories = JSON.parse(fs.readFileSync('server/data/stories.json', 'utf8'));


module.exports.getIssueTypes = function (type) {
    switch (type.toLowerCase()) {
        case 'bug':
            return bugs;
        case 'story':
            return stories;
        default:
            return {issues:[]};
    }
};

module.exports.getIssueEstimateById = function(id) {
    return JSON.parse(fs.readFileSync('server/data/issue-' + id + '.json', 'utf8'));
};