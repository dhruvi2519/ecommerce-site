const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SellerSchema = new mongoose.Schema({
  firstname: { type: String, required: [true, "Firstname is required"] },
  lastname: { type: String, required: [true, "Lastname is required"] },
  phoneno: { type: Number },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: function (email) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      },
      message: (props) => `Email ${props.value} is invalid`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "seller",
  },
  shopname: {
    type: String,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],

  address: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  ],

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

SellerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

SellerSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
SellerSchema.methods.generateAuthToken = async function () {
  //console.log('pre');
  try {
    const token = jwt.sign(
      { userId: this.userId.toString() },
      "mynameisdhruviandmysurnameispatelhelooooo",
      { expiresIn: "3d" }
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    throw new Error("Error generating auth token: " + error.message);
  }
};

const Seller = new mongoose.model("Seller", SellerSchema);

module.exports = Seller;
