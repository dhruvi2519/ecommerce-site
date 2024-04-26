const ErrorHandler = require("../utils/errorHandler");

const authorizeRoles = (...roles) => {
  //   console.log("here eeeeeee", roles);
  return (req, res, next) => {
    console.log("here eeeeeee", req);
    console.log("skdhakdhdshkajhskahskahskag");
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`Role: ${req.user.role} is not allowed`, 403)
      );
    }
    next();
  };
};

module.exports = authorizeRoles;
