/**
 * Required External Modules
 */
const express = require("express");       // server
const path = require("path");
const mongoose = require('mongoose');     // DB
const nodemailer = require('nodemailer'); // email client

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

// parse application/json
app.use(express.json( { extended: false } ));
// parse application/x-www-form-urlencoded
app.use(express.urlencoded( { extended: false } ));

/**
 *  Email client config
 */
const transporter = nodemailer.createTransport({
  port: 465,               // true for 465, false for other ports
  host: "smtp.gmail.com",
     auth: {
          user: 'nkonevich@gmail.com',
          pass: '231Roka@$342',
       },
  secure: true,
  });

/**
 * Routes Definitions
 */
require('./src/routes/routes')(app);


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
