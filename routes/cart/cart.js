var express = require('express');
var router = express.Router();
var config = require('../../config.js');
var Product = require('../../model/product');
var Cart = require('../../model/cart');
var Order = require('../../model/order');

router.get('/cart', function(req, res){

	var data = [];
	
	data['page_title'] = 'Cart';
	data['page_description'] = 'This is cart page';
	data['header_navigation'] = config.header_navigation;
	
	
	if (typeof(req.session.cart)!='undefined' && req.session.cart) {
		
		Cart.findOne({ '_id' : req.session.cart._id}).exec(function(err, cart){
			if (err) return handleError(err);
			
			data['cart'] = cart;	
			res.render('cart/cart', data);
			
		});
		
	} else {
		
		data['cart'] = null;
		res.render('cart/cart', data);
		
	}
	
});

router.all('/cart/add/:id', function(req, res) {
	
	var product_id = req.params.id;
	var data = [];

	Product.findOne({'_id': product_id}).exec(function(err, product){
		
		if (err) return handleError(err);
		
		if (product) {
			
			var product = product;
			
			if (typeof(req.session.cart)!='undefined' && req.session.cart) {
				
				var cartObject = Cart.findOne({'_id': req.session.cart._id}).exec(function(err, cart){
					
					if (cart) {
						cart.products.push(product);
						
						var total = 0;
						for(var i = 0; i<cart.products.length; i++) {
							total+=cart.products[i].price;
						}
						
						cart.total = total;
						
						cart.save();
						
						console.log('Product saved in cart.');
						
						res.redirect('/cart');
						
					} else {
						
						res.redirect('/cart');
						
					}
					
				});
								
			} else {
				
				var cartObj = new Cart({
					'products': product,
					'total': product.price
				});
				
				cartObj.save(function(err){
					if (err) return handleError(err);
					console.log('New cart created and saved');
					req.session.cart = cartObj;
					res.redirect('/cart');
				});
				
			}
			
		} else {
			
			res.redirect('/cart');
			
		}
		
	});
	
});

router.all('/cart/checkout', function(req, res) {
	
	var data = [];
	if(!req.session.cart) res.redirect('/cart');
	
	data['page_title'] = 'Quick Checkout';
	data['page_description'] = 'Quick Checkout';
	data['header_navigation'] = config.header_navigation;
	
	Cart.findOne({'_id': req.session.cart._id}).exec(function(err, cart){
		
		if (err) return handleError(err);
		data['cart'] = cart;
		res.render('cart/checkout', data);
		
	});
	
});

router.all('/cart/placeorder/:status', function(req, res) {
	
	if(!req.session.cart) res.redirect('/cart');
	
	var req = req;
	var data = [];
	var status = req.params.status;
	
	data['page_title'] = 'Order Status';
	data['page_description'] = '';
	data['header_navigation'] = config.header_navigation;
	
	switch(status) {
		
		case 'success': 
		
					var orderObj = new Order({
							cart_id: req.session.cart._id,
							customer_id: req.session.cart._id,
							status: status,
							total: req.session.cart.total
						});
					
					orderObj.save(function(err){
						
						if (err) return handleError(err);
						req.session.destroy();
						data['alert'] = {type: 'success', message: 'Order Placed Successfully.' };
						res.render('cart/placeorder', data);
						
					});
						
				break;
		
	}
	
});
	
//export this router to use in our index.js
module.exports = router;