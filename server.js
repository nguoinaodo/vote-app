'use strict';


var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();
require('dotenv').load();
require('./app/config/passport.js')(passport);

mongoose.connect(process.env.MONGOLAB_URI, function() {
	console.log('Database successfully connected.');	
});

app.use('/controllers', express.static('./app/controllers'));
app.use('/public', express.static('./public'));
app.use('/common', express.static('./app/common'));

app.set('view engine', 'jade');
app.set('views', 'templates');

app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
	secret: 'vote',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

app.listen(process.env.PORT, function() {
	console.log('App is listening at port ' + process.env.PORT);	
});