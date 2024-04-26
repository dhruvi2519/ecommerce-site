const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  console.log("userId in jwt", userId);

  const token = jwt.sign(
    { userId: userId },
    "mynameisdhruviandmysurnameispatelhelooooo",
    { expiresIn: "3d" }
  );
  return token;
};

const getUserIdFromToken = (token) => {
  // console.log(" getUserIdFromToken called with ",token);
  const jwtToken = token?.split(" ")[1];
  console.log("tokennnnnn", jwtToken);
  const decodedToken = jwt.verify(
    jwtToken,
    "mynameisdhruviandmysurnameispatelhelooooo"
  );
  console.log("decodedToken", decodedToken);
  return decodedToken.userId;
};

module.exports = { generateToken, getUserIdFromToken };
