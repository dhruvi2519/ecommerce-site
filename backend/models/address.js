const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  firstname: {
    type: String,
    // required:[true,"Please provide your First Name"]
  },
  lastname: {
    type: String,
    // required:[true,"Please provide your First Name"]
  },
  streetAddress: {
    type: String,
    // required : [ true , "Address is required" ]
  },

  city: {
    type: String,
    // required : [ true , "city is required" ]
  },
  state: {
    type: String,
    // required : [ true , "state is required" ]
  },
  zipCode: {
    type: Number,
    // required : [ true , "zipCode is required" ]
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Register",
  },
  mobile: {
    type: String,
    // match: [/^[0-9]{10}$/, "Mobile number must be 10 digits"],
    // required : [ true , "mobile number is required"]
  },
});

const Address = new mongoose.model("Address", AddressSchema);

module.exports = Address;
