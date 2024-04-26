const mongoose = require("mongoose");
const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // quantity: {
  //   type: Number,
  //   default: 0,
  // },
});

const Size = mongoose.model("Size", sizeSchema);

module.exports = Size;
