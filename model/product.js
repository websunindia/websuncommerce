// product model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
	name: String,
	description: String,
	price: Number,
	quantity: Number,
	created_at: Date,
	updated_at: Date
});


var Product = mongoose.model('Product', productSchema);
module.exports = Product;