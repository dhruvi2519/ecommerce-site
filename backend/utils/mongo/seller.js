const Seller = require("../../models/seller");

const createSeller = async (userData) => {
  try {
    let { firstname, lastname, email, password, shopname, phoneno } = userData;

    const isUserExist = await Seller.findOne({ email });

    if (isUserExist) {
      throw new Error("Email already exists", email);
    }

    // Hash the password before saving it to the database
    password = await bcrypt.hash(password, 10);

    const user = await Seller.create({
      firstname,
      lastname,
      email,
      password,
      shopname,
      phoneno,
    });

    console.log("created seller", user);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

async function getSeller() {
  try {
    const seller = await Seller.find();
    console.log("seller", seller);
    return seller;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/categories at getSeller ==> Error : ",
      error
    );
  }
}

module.exports.createSeller = createSeller;
module.exports.getSeller = getSeller;
