const mongoose= require('mongoose');

const checkoutSchema = new  mongoose.Schema({
firstname: String,
  lastname: String,
  productId: mongoose.Schema.Types.ObjectId,
  address: String,
  amount: Number,
  payment: String,
  status: String,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const checkoutModel= mongoose.model("checkout",checkoutSchema);

module.exports = checkoutModel;