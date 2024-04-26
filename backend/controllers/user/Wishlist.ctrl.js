const express = require('express');
const router = express.Router();
const Wishlist = require('../../models/Wishlist');
const asyncHandler = require('express-async-handler')
 
// Add product to wishlist
const UseraddToWishlist = asyncHandler(async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const wishlistItem = new Wishlist({ userId, productId });
    await wishlistItem.save();
    res.json({ success: true, message: 'Product added to wishlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
 
// Get wishlist for a user
const UserGetwishlist = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.find({ userId }).populate('productId');
    res.json({ success: true, wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
 

module.exports.UseraddToWishlist = UseraddToWishlist
module.exports.UserGetwishlist = UserGetwishlist