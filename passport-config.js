const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcrypt-nodejs");
const userModel = require("./server/models/user/user.model.server"); // Adjust the path to your user model

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.signedCookies) {
    ({ token } = req.signedCookies);
  }
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SESSION_SECRET || "test",
};

passport.use(
  "jwt",
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await db
        .table("users")
        .where({ username: jwt_payload.username })
        .first();
      if (user) {
        done(null, jwt_payload);
      }
    } catch (err) {
      console.log(err);
      done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
