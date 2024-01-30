module.exports = {

    // find model object by id and handle errors
    getById: async function ( req, res, next, model, select=null ) {
        try {
            const { id } = req.params
            var foundObject = null
            if (select) {
                // e.g. "-password" to skip it in results
                foundObject = await model.findById(id).select(select)
            } else {
                // find
                foundObject = await model.findById(id)
            }
            
            if ( !foundObject ) {
                // id is valid but not found
                res.status(200).send({ message: "id not found" })
            } else {
                // return result
                next(foundObject)
            }
        } catch (error) {
            // other errors. Handled in errors.js
            next(error) 
        } 
    },


    // find all model objecs and handle errors
    getAll: async function ( req, res, next, model, { select=null, sort=[['_id', 1]] } = {}  ) {
        try {
            var foundObjects = null
            if (select) {
                // e.g. "-password" to skip it in results
                foundObjects = await model.find().select(select).sort(sort)
            } else {
                // find
                foundObjects = await model.find().sort(sort)
            }
            return foundObjects
        } catch (error) {
            // handle errors (see errors.js)
            next(error) 
        } 
    },

    // add new
    postData: async function ( req, res, next, model ) { 
        try {
            const objectData = new model({ ...req.body });
            const newObject = await objectData.save();
            return newObject
        } catch (error) {
            next(error) 
        }
    },

    // edit
    putData: async function ( req, res, next, model ) { 
        try {
            const { id } = req.params;
            foundObject = await model.findById(id)
            if ( !foundObject ) {
                // id is valid but not found
                res.status(200).send({ message: "id not found" })
            }
            const updatedObject = await model.findByIdAndUpdate( id, req.body )
            return updatedObject
        } catch (error) {
            next(error) 
        }
    },

    // delete
    deleteData: async function ( req, res, next, model ) { 
        try {
            const { id } = req.params;
            foundObject = await model.findById(id)
            if ( !foundObject ) {
                // id is valid but not found
                res.status(200).send({ message: "id not found" })
            }
            const deletedObject = await model.findByIdAndDelete(id)
            return deletedObject
        } catch (error) {
            next(error) 
        }
    },

    // DateToString
    formatString: function ( dateString, format ) { 
        const dayjs = require('dayjs')     
        const newDateString = dayjs(dateString).format(format)
        return newDateString
    },

    checkUserAuthentication: async function (req, res, next) {
        try {
            console.log("checking auth")
            if(req.session.user) {
                const { User } = require("../../models/userModel")
                const { id } = req.params;
                const user = await User.findById(id)
                if(user.username != req.session.user) {
                    next(new Error("AccessDenied")) 
                } else {
                    next()
                }            
            } else {
                res.status(200).redirect("/login");
            }
        } catch(error) {
            next(error) 
        }
    },

    checkAdminAuthentication: async function (req, res, next) {
        if(req.session.user && req.session.user == "admin") {
            next()
        } else {
            res.redirect("/login");
        }
    }

    // checkLogin: async function (req, res, next) {
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
    //                 next()
    //             } else {
    //                 // wrong credentials
    //                 res.render("login");
    //             }
    //         }
    //     } else {
    //         const user = await User.findOne({ username: req.session.user }).exec();
    //         if(user) {
    //             // credentials exists and user is valid
    //             next()
    //         } else {
    //             // session was found but user is not valid
    //             req.session.destroy()
    //             res.render("login");
    //         }
    //     } 
    // }
}