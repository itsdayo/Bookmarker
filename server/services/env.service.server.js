require("dotenv").config();
// const donenv = require("dotenv")
// dotenv.config();
module.exports = function (app) {
  app.get("/env", (req, res) => {
    res.json(process.env);
  });
};
