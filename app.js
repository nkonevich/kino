/**
 * Required External Modules
 */
const express = require("express");       // server
const path = require("path");
const mongoose = require('mongoose');     // DB
const fileupload = require("express-fileupload")
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo');

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
const mongoURI = "mongodb://localhost:27017";

/**
 *  App Configuration
 */
// pug config
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "pug");
// expressjs config
app.use(express.static(path.join(__dirname, "public")));
// file upload
app.use(fileupload())

// parse application/json
app.use(express.json( { extended: false } ));
// parse application/x-www-form-urlencoded
app.use(express.urlencoded( { extended: false } ));
// user authentication with secret as param
// app.use(cookieParser('123'))
app.use(session({
  secret: 'indiana jones is the best',
  resave: true,
  saveUninitialized: false,
  maxAge: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  store: MongoStore.create({
    mongoUrl: mongoURI,
    collectionName: "sessions",
    stringify: false,
    autoRemove: "interval",
    autoRemoveInterval: 1
  })
}))
 
/**
 * Routes Definitions
 */
require('./src/routes/tools/defaults')(app);
require('./src/routes/routes')(app);
require('./src/routes/tools/errors')(app);

/**
 * Server Activation
 */
const start = async () => {
    try {
      await mongoose.connect(mongoURI);
      app.listen(port, () => console.log(`Listening to requests on http://localhost:${port}`));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
};

start();
