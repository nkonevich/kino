/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');

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
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
// expressjs config
app.use(express.static(path.join(__dirname, "public")));

// parse application/json
app.use(express.json( { extended: false } ));
// parse application/x-www-form-urlencoded
app.use(express.urlencoded( { extended: false } ));

/**
 * Routes Definitions
 */
require('./routes')(app);


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
