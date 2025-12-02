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

// CORS configuration
const allowedOrigins = [
  "https://bookmarker-storer.netlify.app",
  "https://bookmarker-storer.netlify.app/",
  "https://bookmarker-server.onrender.com",
  "https://bookmarker-server.onrender.com/"
];

// Add development origins if not in production
if (process.env.NODE_ENV !== "production") {
  allowedOrigins.push(
    "http://localhost:4200",
    "http://localhost:4200/",
    "http://localhost:3000",
    "http://localhost:3000/"
  );
}

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // For debugging
    console.log('CORS blocked for origin:', origin);
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "X-PINGOTHER",
    "Content-Type",
    "X-Requested-With",
    "Authorization",
    "Application-Context",
    "recaptcha",
    "Apollo-Require-Preflight",
  ],
  optionsSuccessStatus: 204,
  preflightContinue: false,
  maxAge: 600 // 10 minutes
};

// Apply CORS before other middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Trust first proxy in production (important for secure cookies)
if (process.env.NODE_ENV === "production") {
  app.set('trust proxy', 1);
}

// Session configuration
const sessionConfig = {
  secret: process.env.SESSION_SECRET || "test-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production", // true in production
    sameSite: process.env.NODE_ENV === "production" ? 'None' : 'Lax',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    path: '/',
  },
  name: 'bookmarker.sid' // Custom session cookie name
};

app.use(cookieParser(process.env.SESSION_SECRET || "test"));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// Initialize bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || "3100";
app.set("port", port);

// Create HTTP server
const server = http.createServer(app);

// Import routes
require("./server/app")(app);

// Test database connection
app.get("/test-connection", async (req, res) => {
  try {
    const result = await db.raw("SELECT 1");
    res.send("Database connection successful: " + JSON.stringify(result));
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).send("Database connection error");
  }
});

// For Build: Catch all other routes and return the index file
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

// Start server
server.listen(port, function () {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${port}`);
  console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
});