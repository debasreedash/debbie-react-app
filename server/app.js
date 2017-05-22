const express = require('express');
const path = require('path');

app = express();

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(function(req, res, next) {
   res.set("Access-Control-Allow-Origin", "*");
   next();
});

var issueRoute = require('./routes/issue.route');
app.get("/issuetypes/:type", (req, res) => {
    var issues = issueRoute.getIssueTypes(req.params.type);
    res.send(issues);
});

app.get("/issues/:id", (req, res) => {
   var issue = issueRoute.getIssueEstimateById(req.params.id);
   res.send(issue);
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', '../app/index.html'));
});


module.exports = app;