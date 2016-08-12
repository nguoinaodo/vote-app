'use strict';
/*
var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {
	
	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}
	
	var clickHandler = new ClickHandler();

	app.route('/')
		.get(function (req, res) {
			res.redirect('/polls');
		});
	
	app.route('/polls')
		.get(function(req, res) {
		     
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});
	
	// authenticate
	////////////////////////////////////////////////
	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
	/////////////////////////////////////////////////
	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
};
*/

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
	/*
	app.use('/api/polls/:pollId', function(req, res, next) {
		if (req.query.vote)
			controller.vote(req, res);
		else if (req.query.option)
			controller.voteCustom(req, res);
	});
	*/
	
	//app.route('/api/polls/:pollId/vote)
	//	.get(controller.voteCustom);
	
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

