const mongoose = require('mongoose');
 
const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Register', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  // Add any other fields you need
});
 
const Wishlist = mongoose.model('Wishlist', wishlistSchema);
 
module.exports = Wishlist;