const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    const error = new Error(
      "Auth not provided. You are not authorised to access this resource"
    );
    error.status = 401;
    return next(error);
  }

  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    const error = new Error(
      "Authorisation token was not provided. Access denied."
    );
    error.status = 401;
    return next(error);
  }

  //verify token
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);

    const exists = await User.findOne({ where: { email: result.user.email } });

    if (exists) {
      req.user = result.user;
      next();
    } else {
      const error = new Error("You are not authorised to access this resource");
      error.status = 401;
      return next(error);
    }
  } catch (error) {
    error.status = 401;
    return next(error);
  }
};
