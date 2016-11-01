var express = require('express');
var router = express.Router();
var config = require('../../config.js');
var User = require('../../model/user');

router.get("/auth", function(req, res){
	
	var data = [];
	
	data['page_title'] = "Login";
	data['page_description'] = "Please login";
	data['header_navigation'] = config.header_navigation;
	
	res.render('auth/index', data);
	
});

router.get("/auth/:slug", function(req, res){
	
	var data = [];
	data['header_navigation'] = config.header_navigation;
	var slug = req.params.slug;
	
	
	switch(slug){

		case 'signup': 
						req.session.destroy();
						
						data['page_title'] = "Signup";
						data['page_description'] = "Signup page";
						
						res.render('auth/signup', data);
						
			break;
				
		case 'logout': req.session.destroy();
				res.redirect('/');
				
		
			break;
			
	}
	
});


router.post("/auth", function(req, res){
	
	var data = [];
	
	data['page_title'] = "Login";
	data['page_description'] = "Please login";
	data['header_navigation'] = config.header_navigation;
		
	if (req.body) {
		
		if (req.body.username && req.body.password) {
			
			
			User.findOne({"userName": { $eq: req.body.username }, "password": { $eq: req.body.password }}, function (err, userObject) {
				
				if (err) return handleError(err);
				
				if (userObject) {
					
					req.session.user = userObject;
					req.session.authenticated = true;
					res.redirect('/admin/dashboard');
					
				} else {
					
					data['alert'] = {type: 'info', message: 'Incorrect username / password.'};
					res.render('auth/index', data);
					
				}
				
			});
			
		} else {
			
			data['alert'] = {type: 'info', message: 'Please provide valid details.'};
			res.render('auth/index', data);
			
		}
		
	}
	
	
});

module.exports = router;