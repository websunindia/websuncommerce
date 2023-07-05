var express = require('express');
var engine = require('ejs-locals');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var middleware = require('./routes/middleware');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: "Websun"}));
app.use('/public', express.static('public'));

var config = require('./config.js');

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs'); // so you can render('index')

// routing starts here
var config = require('./config.js');

//mongoose.connect('mongodb://127.0.0.1:27017/websun_db');
mongoose.connect('mongodb://sagar:sagar#123@ds061355.mlab.com:61355/websuncommerce');


var page = require('./routes/frontend/page.js');
var adminPage = require('./routes/admin/page.js');
var auth = require('./routes/auth/auth.js');
var signup = require('./routes/auth/signup.js');
var cart = require('./routes/cart/cart.js');

app.all('/', page);
app.all('/page/:slug', page);

app.all('/admin', middleware.authenticate, adminPage);
app.all('/admin/:slug', middleware.authenticate, adminPage);

app.all('/auth', auth);
app.all('/auth/:slug', middleware.authenticate, auth);
app.all('/signup', signup);

app.all('/cart', cart);
app.all('/cart/add/:id', cart);
app.all('/cart/checkout', cart);
app.all('/cart/placeorder/:status', cart);

app.listen(3000,function(){
	
	console.log("-------------------------------------------------------------");
	console.log("Websuncommerce: started at localhost:3000");
	console.log("-------------------------------------------------------------");
	console.log("-------------------------------------------------------------");
	
});
