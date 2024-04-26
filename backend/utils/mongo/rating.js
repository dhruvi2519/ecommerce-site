const Rating = require("../../models/rating");
const productService = require("../mongo/product")

async function createRating(req,user){
    const product = await productService.findProductById(req.productId);


    const rating = new Rating({
        
        product : product._id,
        user:user._id,
        rating : reqData.rating,
        createAt : new Date(),
    })
    
    return await review.save();
}

async function getProductRating(productId){
   
    return await Rating.find({product:productId})
}

module.exports = {createRating,getProductRating};