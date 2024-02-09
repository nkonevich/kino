const { MovieShow } = require('../models/movieShowModel');

module.exports = function(app){
    const tools = require('./tools/tools');
    const { User } = require("../models/userModel");
    const { Order } = require("../models/orderModel");
    const { MovieShow } = require("../models/movieShowModel");

    app.get("/test", async (req, res, next)=> {
        const movieSowId = "65bff52ea4a2e59a9e6b94c3"
        const seatId = "65bff52ea4a2e59a9e6b94c4"


        const movieShow = await MovieShow.findById(movieSowId)
        console.log(movieShow.setAvailability(seatId, false))

        // const movieshow = await MovieShow.findById("65bff52ea4a2e59a9e6b94c3")
        // const price = movieshow.seatsPricing.find(item => {
        //         return item.seatType == req.body.seatType
        //     }).price
        // const

        // console.log(movieshow)
        // const doc = movieshow.seatsAvailability[1];
        // console.log(doc)
        res.status(200).render('test');
    })

    // app.get("/test", async (req, res, next)=> {
    //     const foundObjects = await tools.getAll( req, res, next, User, "-password")
        
    //     foundObjects.forEach(async user => {
    //         user.set(
    //             {
    //                 orders: await Order.find({user: user.id})
    //             }
    //         )
    //     });
    //     console.log(foundObjects)
    //     res.status(200).json(foundObjects);
    // })

    // app.get("/test", async (req, res, next)=> {
    //     if(!req.session.user) {
    //         // session not set-up yet
    //         if(!req.headers.authorization) {
    //             // no auth headers
    //             res.setHeader("WWW-Authenticate", "Basic")
    //             res.render("login");
    //         } else {
    //             // auth headers found, check credentials
    //             authData=new Buffer.from(req.headers.authorization.split(" ")[1], 'base64')
    //             userCredentials=authData.toString().split(":")
    //             const user = await User.findOne({ username: userCredentials[0], password: userCredentials[1] }).exec();
    //             if(user) {
    //                 // credentials are ok, create new session, render page
    //                 req.session.user=user.username
    //                 res.render("test");
    //             } else {
    //                 // wrong credentials
    //                 res.render("login");
    //             }
    //         }
    //     } else {
    //         const user = await User.findOne({ username: req.session.user }).exec();
    //         if(user) {
    //             // credentials exists and user is valid
    //             res.render("test");
    //         } else {
    //             // session was found but user is not valid
    //             req.session.destroy()
    //             res.render("login");
    //         }
    //     }
    // })
}