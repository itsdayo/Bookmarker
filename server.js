// require is a node js keyword like "import" in typescript

// express library, create running server. can listen to incoming request
const express = require("express");
// app is a instance of express library. We are going to use it to be able to create server and be able to respond http request coming from browser/client side.
const app = express();
// Library used to be able to parse incoming data. Client is going to send us JSON data. body-parse helps us to parse the data from the body. It knows how to parse images, file, etc.
const bodyParser = require("body-parser");
// http library allows us to create http servers
const http = require("http");
const path = require("path");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const session = require("express-session");

const knex = require("knex");
const knexConfig = require("./knexfile");

const db = knex(knexConfig.production);
const passport = require("./passport-config");

app.use(cookieParser(process.env.SESSION_SECRET|| "test"));

if (process.env.SESSION_SECRET) {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        secure: true, // true if on HTTPS
        sameSite: "None", // cross-site cookie
        path: "/",
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true, // prevents access by JavaScript
        domain: process.env.CORS_ORIGIN,
        cookie: { secure: false },
      },
    })
  );
} else {
  app.use(
    session({
      secret: "test",
      resave: true,
      saveUninitialized: true,
    })
  );
}

app.use(passport.initialize());
app.use(passport.session());

// Initialize bodyparser. We are turn on the feature to parse json data.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, "dist")));


const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:4200",
  credentials: true, // Allow credentials (cookies, authorization headers)
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: [
    "X-PINGOTHER",
    "Content-Type",
    "X-Requested-With",
    "Authorization",
    "Application-Context",
    "recaptcha",
    "Apollo-Require-Preflight",
  ], // Allowed headers
  optionsSuccessStatus: 204, // Response status code for successful OPTIONS request
};

app.use(cors(corsOptions));


const port = process.env.PORT || "3100";
app.set("port", port);

// Create HTTP server
const server = http.createServer(app);

require("./server/app")(app);

app.get("/test-connection", async (req, res) => {
  try {
    const result = await db.raw("SELECT 1");
    res.send("Database connection successful: " + JSON.stringify(result));
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).send("Database connection error");
  }
});

// For Build: Catch all other routes and return the index file -- BUILDING
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

// server.listen(port);
server.listen(port, function () {
  console.log("Running on " + app.get("port"));
});
