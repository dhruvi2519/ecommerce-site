
const reviewService = require("../../utils/mongo/review");


const createReview = async(res,req)=>{
    const user = req.user;
    try {
        const review = await reviewService.createReview(req.body,user);
        return res.status(201).send(review);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}


const getAllReview = async(res,req)=>{
    const productId = req.params.productId;
    const user = req.user;
    try {
        const review = await reviewService.getAllReview(productId);
        return res.status(201).send(review);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

module.exports = {getAllReview,createReview}