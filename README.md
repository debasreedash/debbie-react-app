Issues API Exercise

For this project, I learned the basics of React and 
React-Router-Dom (instead of Angular) to try something new!
I created a simple single page React App 
retrieve issues and their estimates. 

To run the project, do the following:

1) npm install
2) npm start

The app client will load on localhost port 8082
and the Express server loads on port 4000. If you would like
to modify this config, the defaults can be changed in the
webpack.config.js under Config -> 'serverUrl'.

The primary route to use an external API would be to load the
project and enter the server url (including protocol) and 
list the issue types in the second input box.

On page load, the estimates shown come from the json files
provided by the initial exercise and are located under the 
'data' folder.

I added another npm run command "npm run build" to
show how the package would be bundled to be production 
ready.

Assumptions:
1) Type names are case insensitive
2) External APIs are returning formatted json
3) Any invalid issue types given will default to an
estimate of 0.