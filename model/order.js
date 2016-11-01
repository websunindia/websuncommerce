// cart model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
	cart_id: Schema.Types.ObjectId,
	customer_id: Schema.Types.ObjectId,
	status: String,
	total: Number,
	created_at: Date,
	updated_at: Date
});


var Order = mongoose.model('Order', orderSchema);
module.exports = Order;