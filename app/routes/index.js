'use strict';


var Controller = require(process.cwd() + '/app/controllers/controller.server.js');

module.exports = function(app, passport) {
	var controller = new Controller();
	
	app.route('/')
		.get(function(req, res) {
			res.redirect('/polls');	
		});
	
	app.route('/polls')
		.get(controller.showAllPolls);
	
	app.route('/polls/:pollId')
		.get(controller.showPoll)
		.post(controller.make);
	
	app.route('/mypolls')
		.get(controller.showMyPolls);
	
	app.route('/newpoll')
		.get(controller.createNewPoll);
	
	// authenticate
	/////////////////////////////////////////////////////
	app.route('/auth/github')
		.get(passport.authenticate('github'));
		
	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/polls',
			failureRedirect: '/polls'
		}));
	
	app.route('/signout')
		.get(function(req, res) {
			req.logout();
			res.redirect('/polls');
		});
	/////////////////////////////////////////////////////
	
	app.route('/api/polls')
		.get(controller.getAllPolls);
	
	app.route('/api/polls/:pollId')
		.get(controller.getPoll)
		.post(function(req, res) {
			console.log('hi');
			if (req.body.hasOwnProperty('vote'))
				controller.vote(req, res);
			else if (req.body.hasOwnProperty('option'))
				controller.voteCustom(req, res);
		});
	
	app.route('/delete/:pollId')
		.get(controller.delete);
	
	app.route('/api/:userId/polls')
		.get(controller.getMyPolls);
	
};

