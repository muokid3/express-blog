const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    const error = new Error(
      "Auth not provided. You are not authorised to access this resource"
    );
    error.status = 401;
    next(error);
  }

  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    const error = new Error(
      "Authorisation token was not provided. Access denied."
    );
    error.status = 401;
    next(error);
  }

  //verify token
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
