module.exports = function(app){
    const tools = require('./tools/tools');
    const { User } = require("../models/userModel");

    app.get("/test", async (req, res, next)=> {
        // if (req.session.user) {
        //     console.log("session found: "+req.session.user)
        //     console.log("user id: "+req.session.user.id)
        // } else {
        //     console.log("session not found")
        // }
        res.render("test")
        // const session = req.session
        // console.log(session)
        // res.send("ok")
    })

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