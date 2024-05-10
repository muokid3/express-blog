const passport = require("passport");

module.exports = function (req, res, next) {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    if (!user) {
      // Custom error message for unauthorized access
      const err = new Error("Invalid email address or password");
      err.status = 401;
      return next(err);
    }
    next()
  })(req, res, next);
}