const passport = require("passport");
const User = require("../models/User");

const ExtractJwt = require("passport-jwt").ExtractJwt;
const Strategy = require("passport-jwt").Strategy;

require("dotenv").config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new Strategy(options, async (jwtPayload, done) => {
  console.log(jwtPayload);
  try {
    const user = await User.findByPk(jwtPayload.id);
    if (user) {
      //successfully authenticated
      return done(null, user);
    } else {
      //invalid or expired token
      return done(null, false);
    }
  } catch (err) {
    //db error?
    console.log("Error:", err);
    return done(null, false);
  }
});

module.exports = jwtStrategy;
