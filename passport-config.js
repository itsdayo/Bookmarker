const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt-nodejs");
const userModel = require("./server/models/user/user.model.server"); // Adjust the path to your user model

passport.use(new LocalStrategy(localStrategy));

function localStrategy(username, password, done) {
  userModel
    .findUserByUsername(username)
    .then((user) => {

      // Check if user exists and compare passwords
      if (user && bcrypt.compareSync(password, user.password)) {
        return done(null, user); // Successfully authenticated
      } else {
        return done(null, false, { message: "Invalid credentials." }); // Authentication failed
      }
    })
    .catch((err) => {
      console.error("Database error:", err);
      return done(err); // Handle any errors from the database
    });
}

passport.serializeUser((user, done) => {
  done(null, user); // Store user ID in the session
});

passport.deserializeUser((user, done) => {
  userModel
    .findUserById(user.id)
    .then((user) => {
      done(null, user); // Retrieve user by ID from the database
    })
    .catch((err) => {
      done(err); // Handle errors
    });
});

module.exports = passport;
