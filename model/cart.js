// cart model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
	products: [],
	total: Number,
	created_at: Date,
	updated_at: Date
});


var Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;