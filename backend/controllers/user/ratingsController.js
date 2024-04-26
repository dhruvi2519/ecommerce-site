
const ratingService = require("../../utils/mongo/rating");


const createRating= async(res,req)=>{
    const user = req.user;
    try {
        const rating = await reviewService.createRatings(req.body,user);
        return res.status(201).send(rating);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}


const getAllRatings = async(res,req)=>{
    const productId = req.params.productId;
    const user = req.user;
    try {
        const review = await reviewService.getAllRatings(productId);
        return res.status(201).send(review);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

module.exports = {getAllRatings,createRating}