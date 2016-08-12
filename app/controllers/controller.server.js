'use strict';

var Polls = require('../models/polls.js');

function Controller() {
	this.vote = function(req, res) {
		var pollId = req.params.pollId;
		var vote = req.body.vote;
		console.log(vote);
		console.log(req.url);
		
		var query = Polls.findOne({id: pollId});
		
		
		Polls
			.findOne({id: pollId}, function(err, doc) {
				if (err) throw err;
					
					var options = doc.options;
					options[vote - 1][1]++;
					
					doc.options = [];
					options.forEach(function(option) {
						doc.options.push(option);	
					});
					doc.save(function(err, result) {
						if (err) throw err;
						
						var options = result.options;
						
						options.unshift(['Options', 'Vote']);
						console.log(options);
						res.json(options);
					});
			});
		
		
	};
	
	this.voteCustom = function(req, res) {
		var pollId = req.params.pollId;
		var option = req.body.option;
		console.log(option);
		
		Polls
			.findOne({id: pollId}, function(err, doc) {
				if (err) throw err;
				
				doc.options.push([option, 1]);
				doc.save(function(err, result) {
					if (err) throw err;
					
					var options = result.options;
				
					options.unshift(['Option', 'Vote']);
					res.json(options);	
				});
				
				
			});
	};
	
	this.delete = function(req, res) {
		var pollId = req.params.pollId;
		
		Polls
			.remove({id: pollId}, function(err) {
				if (err) throw err;
				
				res.redirect('/');
			});
	};
	
	this.make = function(req, res) {
		var newPoll = new Polls;
		
		newPoll.id = req.params.pollId;
		newPoll.userId = req.user.github.id;
		newPoll.title = req.body.title;
		newPoll.options = [];
		
		var options = req.body.options.split('\r\n');
		
		options.forEach(function(option) {
			newPoll.options.push([option, 0]);	
		});
		
		
		newPoll.save(function(err) {
			if (err) throw err;
			
			res.redirect('/polls/' + req.params.pollId);
		});
	};
	//
	this.getPoll = function(req, res) {
		Polls
			.findOne({id: req.params.pollId}, function(err, doc) {
				if (err) throw err;
				
				if(!doc) 
					res.redirect('/polls');
				else {
					var options = doc.options;
					
					options.unshift(['Option', 'Vote']);
					res.json(options);
				}
			});
	};
	
	this.getAllPolls = function(req, res) {
		Polls
			.find({}, {id: 1, title: 1}, function(err, docs) {
				if (err) throw err;
				
				res.json(docs);
			});
	};
	
	this.getMyPolls = function(req, res) {
		Polls
			.find({userId: req.params.userId}, {id: 1, title: 1}, function(err, docs) {
				if (err) throw err;
			
				res.json(docs);
			});	
	};
	
	this.showPoll = function(req, res) {
		Polls
			.findOne({id: req.params.pollId})
			.exec(function(err, doc) {
				if (err) throw err;
				
				if (!doc) 
					res.redirect('/polls');
				else {
					var auth = req.isAuthenticated();
					
					res.render('poll', {
						auth: auth,
						displayName: auth? req.user.github.displayName: '',
						title: doc.title,
						userId: auth? req.user.github.id: '',
						ownerId: doc.userId,
						pollId: req.params.pollId
					});
				}
			});
	};
	
	this.showAllPolls = function(req, res) {
		var auth = req.isAuthenticated();
		
		console.log(auth);
		
		res.render('polls', {
			auth: auth,
			href: 'polls',
			displayName: auth? req.user.github.displayName: '',
			cap1: 'Below are polls hosted by FCC',
			cap2: auth? 'Select a poll to see the results and vote, or make a new poll!': 'Select a poll to see the results and vote, or sign-in to make a new poll.'
		});
	};
	
	this.showMyPolls = function(req, res) {
		var auth = req.isAuthenticated();
		
		if (auth) {
			res.render('polls', {
				auth: auth,
				href: 'mypolls',
				displayName: req.user.github.displayName,
				cap1: 'Below are polls you own.',
				cap2: 'Select a poll to see the results and vote, or make a new poll!'
			});
		} else {
			res.redirect('/polls');
		}
	};
	
	this.createNewPoll = function(req, res) {
		var auth = req.isAuthenticated();
		
		if (auth) {
			res.render('newpoll', {
				displayName: req.user.github.displayName,
				action: '/polls/' + Date.now()
			});
		} else {
			res.redirect('/polls');
		}
	};
}

module.exports = Controller;

/*
var Users = require('../models/users.js');


function ClickHandler () {

	this.getClicks = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.nbrClicks);
			});
	};

	this.addClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

}

module.exports = ClickHandler;
*/