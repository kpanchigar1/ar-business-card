var app = require('express')();
var expressBrowserify = require('express-browserify');

app.get('./bundle.js', expressBrowserify('./assistant.js'));