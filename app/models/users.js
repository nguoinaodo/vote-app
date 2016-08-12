'use strict';
/*
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	github: {
		id: String,
		displayName: String,
		username: String
	},
    polls: {
        
    }
});

module.exports = mongoose.model('User', User);
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    github: {
        id: String,
        displayName: String,
        username: String
    }
});

module.exports = mongoose.model('User', User);