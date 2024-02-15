/**
 * Required External Modules
 */
const express = require("express")       // server
const path = require("path")
const mongoose = require('mongoose')     // DB
const fileupload = require("express-fileupload")
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')

/**
 * App Variables
 */
const app = express()
const port = process.env.PORT || "8000"
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/kino_db"

/**
 *  App Configuration
 */
// pug config
app.set("views", path.join(__dirname, "src/views"))
app.set("view engine", "pug")
// bootstrap
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')))
// file upload
app.use(fileupload())
// expressjs config
app.use(express.static(path.join(__dirname, "public")))
// parse application/json
app.use(express.json( { extended: false } ))
// parse application/x-www-form-urlencoded
app.use(express.urlencoded( { extended: false } ))
// user authentication with secret as param
app.use(cookieParser())
app.use(session({
  secret: 'indiana jones is the best',  // a secret string used to sign the session ID cookie
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
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
require('./src/routes/tools/defaults')(app)
require('./src/routes/routes')(app)
require('./src/routes/tools/errors')(app)

/**
 * Server Activation
 */
const start = async () => {
    try {
      await mongoose.connect(mongoURI)
      app.listen(port, () => console.log(`Listening to requests on http://localhost:${port}`))
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
}

start()
