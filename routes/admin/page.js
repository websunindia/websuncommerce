var express = require('express');
var router = express.Router();
var config = require('../../config.js');
var User = require('../../model/user');
var Product = require('../../model/product');
var Order = require('../../model/order');

router.get('/admin', function(req, res){
	
	if (req.session.page_views) req.session.page_views++;
	else req.session.page_views = 1;
	
	var data = {
		page_title: 'Dashboard', 
		page_description: 'This is dashboard', 
		page_views: req.session.page_views 
	};
	
	data['header_navigation'] = config.admin_header_navigation;
	
	res.render('adminPage/index', data);
	
});

router.get('/admin/:slug', function(req, res){
	
	var slug =  req.params.slug;
	var data = [];
	
	data['header_navigation'] = config.admin_header_navigation;
	data['user'] = req.session.user;
	
	switch(slug) {
		
		case  'dashboard': 
		
				data['page_title'] = 'Dashboard';
				data['page_description'] = 'Welcome to Dashboard';
				res.render('adminPage/index', data);
				
			break;

		case  'product': 
		
				data['page_title'] = 'Product';
				data['page_description'] = 'Welcome to Product';
				
				Product.find().exec(function(err, products){
					
					if (err) return handleError(err);
					
					data['products'] = products;
					
					res.render('adminPage/product', data);
					
				});
				
			break;

		case  'sale': 
		
				data['page_title'] = 'Sale';
				data['page_description'] = 'Welcome to Sales';
				Order.find().exec(function(err, orders){
					
					if (err) return handleError(err);
					
					if(orders) data['orders'] = orders;
					else data['orders'] = null;
						
					res.render('adminPage/order', data);
					
				});
				
				
				
			break;
				
		default: 
				data['page_title'] = '404';
				data['page_description'] = 'Page not found!!!';
				res.render('adminPage/index', data);
	}

});

router.post('/admin/:slug', function(req, res){
	var data = [];
	
	data['header_navigation'] = config.admin_header_navigation;
	data['user'] = req.session.user;	
	
	switch(req.params.slug) {
		
		case 'product':
					data['page_title'] = 'Products';
					data['page_description'] = 'Welcome to Products';
				
					if (req.body.productName && req.body.productDescription && req.body.productPrice && req.body.productQuantity) {
						
						var productObject = Product({
								name: req.body.productName,
								description: req.body.productDescription,
								price: req.body.productPrice,
								quantity: req.body.productQuantity
							});
						
						productObject.save(function(err) {
							
							if (err) return handleError(err);
							
							Product.find().exec(function(err, products){
								if (err) return handleError(err);
								
								data['products'] = products;	
								res.render('adminPage/product', data);
							});
					
						});
						
					} else {
						
						data['alert'] = {type: 'info', message: 'Please provide valid details'};
						
						Product.find().exec(function(err, products){
							if (err) return handleError(err);
							
							data['products'] = products;	
							res.render('adminPage/product', data);
							
						});
						
					}
					

					
				break;
				
	}
	
});
	
module.exports = router;