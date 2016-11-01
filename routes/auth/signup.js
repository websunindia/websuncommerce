var express = require('express');
var router = express.Router();
var config = require('../../config.js');
var User = require('../../model/user');

router.get("/signup", function(req, res){
	
	var data = [];
	
	
	data['header_navigation'] = config.header_navigation;
	data['page_title'] = "Signup";
	data['page_description'] = "Signup page";
	
	res.render('auth/signup', data);
	
});

router.post("/signup", function(req, res){
	
	var data = [];
	
	if (req.body) {
		
		if (req.body.firstName && req.body.lastName && req.body.userName && req.body.password && req.body.email) {
			
			var userDoc = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				userName: req.body.userName,
				password: req.body.password,
				email: req.body.email,
				admin: true,
			});
			
			userDoc.save(function(err) {
				if (err) throw err;
				console.log('User saved successfully!');
			});

			req.session.authenticated = true;
			res.redirect('/admin/dashboard');
			
		} else {
			
			data['alert'] = {type: 'info', message: 'Please provide valid details.'};
			
		}
		
	}
		
	
	data['page_title'] = "Login";
	data['page_description'] = "Please login";
	data['header_navigation'] = config.header_navigation;
	
	res.render('auth/signup', data);
	
});

module.exports = router;