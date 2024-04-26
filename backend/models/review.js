const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
 
 review : {
    type : String,
    required : true,
 },
    product : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Product",
    required : true,
 },
user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Register",
    required :true ,
},
   
   createdAt: {
    type: Date,
    default: Date.now
}
});

const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews;