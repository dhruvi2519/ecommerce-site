const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
 
 user : {
    type : mongoose.Schema.Types.ObjectId,
    ref: "Register",
    required : true,
 },
    product : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Product",
    required : true,
 },
rating : {
    type : Number,
    required : true,
},
   
   createdAt: {
    type: Date,
    default: Date.now
}
});

const Rating = mongoose.model("Ratings", ratingSchema);

module.exports = Rating;