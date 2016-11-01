var express = require('express');
var router = express.Router();
var config = require('../../config.js');
var Product = require('../../model/product');

router.get('/', function(req, res){

	if (req.session.page_views) req.session.page_views++;
	else req.session.page_views = 1;
		
	var data = [];
	
	data['page_title'] = 'homepage';
	data['page_description'] = 'This is home page';
	data['page_views'] =req.session.page_views
	data['header_navigation'] = config.header_navigation;
	
	Product.find().exec(function(err, products){
		if (err) return handleError(err);
		data['products'] = products;	
		res.render('page/index', data);
	});
	
	
});

router.get('/page/:slug', function(req, res){
	
	var slug =  req.params.slug;
	var data = [];
	
	
	switch(slug) {
		
		case  'aboutus': var pageData = {page_title: 'about us', page_description: 'This is about us page'};
			break;
			
		case  'contactus': var pageData = {page_title: 'contact us', page_description: 'This is contact us page'};
			break;
			
		default: var pageData = {page_title: '404', page_description: 'Page Not Found'};
	}
	
	data = pageData;
	data['header_navigation'] = config.header_navigation;
	
	res.render('page/index', data);
	
});

router.post('/', function(req, res){
	res.send('POST route on things.');
});

//export this router to use in our index.js
module.exports = router;