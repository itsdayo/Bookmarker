module.exports = function (app) {
  const userModel = require("../models/user/user.model.server.js");
  const bcrypt = require("bcrypt-nodejs");
  const jwt = require("jsonwebtoken");

  app.get("/api/user/:uid", findUserById);
  app.get("/api/user", findUser);
  app.post("/api/user", createUser);
  app.put("/api/user/:uid", updateUser);
  app.delete("/api/user/:uid", deleteUser);
  app.post("/api/register", register);
  app.post("/api/login", login);
  app.post("/api/logout", logout);
  app.post("/api/loggedIn", loggedin);

  function loggedin(req, res) {
    const token = req.body.authToken;;
    if (!token) return res.send("0");

    jwt.verify(
      token,
      process.env.SESSION_SECRET || "test",
      async (err, decoded) => {
        if (err) return res.send("0");

        const username = decoded.username;
        const data = await userModel.findUserByUsername(username);
        res.send(data);
      }
    );
  }

  function logout(req, res) {
    req.logOut((err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500)
      } else {
        res.json({ success: true });
      }
    });
  }

  async function login(req, res) {
    try {
      const user = req.body; // Assuming user data is in req.body
      const data = await userModel.findUserByUsername(user.username); // Fetch user data

      if (!data) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Compare the passwords
      bcrypt.compare(user.password, data.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ message: "Internal server error" });
        }

        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const payload = { username: data.username };
        const authToken = jwt.sign(
          payload,
          process.env.SESSION_SECRET || "test",
          {
            expiresIn: "1h",
          }
        );

        data.authToken = authToken;

        res.json(data);
      });
    } catch (err) {
      console.error(err, "login error");
      res.status(500).json({ message: "Internal server error" });
    }
  }

  function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
      .createUser(user)
      .then(function (user) {
        req.login(user, function (err) {
          res.json(user);
        });
      })
      .catch((error) => console.log(error));
  }

  function findUserById(req, res) {
    let uid = req.params["uid"];
    userModel.findUserById(uid).then((data) => {
      res.json(data);
    });
  }

  function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user).then((data) => {
      res.json(data);
    });
  }

  function findUser(req, res) {
    const username = req.query["username"];
    const password = req.query["password"];
    if (username && password) {
      userModel.findUserByCredentials(username, password).then((data) => {
        res.json(data);
      });
      return;
    }

    if (username) {
      userModel.findUserByUsername(username).then((data) => {
        res.json(data);
      });
      return;
    }
    // res.json(users);
    res.json(users);
  }

  function updateUser(req, res) {
    userId = req.params["uid"];
    var user = req.body;

    userModel.updateUser(userId, user).then((data) => {
      res.json(data);
    });
  }

  function deleteUser(req, res) {
    var userId = req.params["uid"];

    userModel.deleteUser(uid).then((data) => {
      res.json(data);
    });
  }
};
