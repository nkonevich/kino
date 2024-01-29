const express = require('express');
const router = express.Router();
const tools = require('./tools/tools');
const { ScreenRoom } = require("../models/screenRoomModel");
const { Movie } = require("../models/movieModel");
const { MovieShow } = require("../models/movieShowModel");
const { User } = require("../models/userModel");
const { Order } = require("../models/orderModel");

router.get("/", tools.checkAdminAuthentication, async (req, res, next) => {
    return res.status(200).render("admin/admin");
});

router.get("/screenrooms", tools.checkAdminAuthentication, async (req, res, next) => {
    const foundObjects = await tools.getAll( req, res, next, ScreenRoom)
    return res.status(200).render("admin/screenrooms", {
        title: "Screen rooms",
        screenRooms: foundObjects
    });
});

router.post("/screenrooms", tools.checkAdminAuthentication, async (req, res, next) => {
    if ({ ...req.body }["_method"]) {
        switch ({ ...req.body }["_method"]) {
            case "delete":
                const deletedObject = await tools.deleteData( req, res, next, ScreenRoom )
                res.status(201).redirect("/admin/screenrooms")
                break;
            case "put":
                const updatedObject = await tools.putData( req, res, next, ScreenRoom )
                res.status(201).redirect("/admin/screenrooms");
                break;
            default:
                next(new SyntaxError("_method parameter not found"))
        }
    } else {
        const createdObject = await tools.postData( req, res, next, ScreenRoom )
        res.status(201).redirect("/admin/screenrooms");
    }
});

router.get("/movies", tools.checkAdminAuthentication, async (req, res, next) => {
    const foundObjects = await tools.getAll( req, res, next, Movie)
    res.status(200).render("admin/movies", {
        movies: foundObjects
    });
});

router.post("/movies", tools.checkAdminAuthentication, async (req, res, next) => {
    if ({ ...req.body }["_method"]) {
        switch ({ ...req.body }["_method"]) {
            case "delete":
                const deletedObject = await tools.deleteData( req, res, next, Movie )
                res.status(201).redirect("/admin/movies")
                break;
            case "put":
                const updatedObject = await tools.putData( req, res, next, Movie )
                res.status(201).redirect("/admin/movies");
                break;
            default:
                next(new SyntaxError("_method parameter not found"))
        }
    } else {
        let imgObj = req.files.image
        if(imgObj.mimetype == "image/jpeg" || imgObj.mimetype == "image/png" || imgObj.mimetype == "image/jpg" ){
            let img_base64 = imgObj.data.toString('base64');
            // let img_binary = Buffer.from(img_base64, 'base64');
    
            const newMovie = new Movie({ 
                name: req.body.name,
                description: req.body.description,
                image: {
                    data: img_base64,
                    contentType: imgObj.mimetype
                }
            });
            const insertedMovie = await newMovie.save();
            res.status(201).redirect("/admin/movies");
        }
    }
});

router.get("/movieshows", tools.checkAdminAuthentication, async (req, res, next) => {
    const foundObjects = await tools.getAll( req, res, next, MovieShow)
    await MovieShow
        .populate(foundObjects, { 
            path: 'movie screenRoom' 
        })
    return res.status(200).render("admin/movieshows", {
        movieshows: foundObjects
    });
});

router.post("/movieshows", tools.checkAdminAuthentication, async (req, res, next) => {
    if ({ ...req.body }["_method"]) {
        switch ({ ...req.body }["_method"]) {
            case "delete":
                const deletedObject = await tools.deleteData( req, res, next, MovieShow )
                res.status(201).redirect("/admin/movieshows")
                break;
            case "put":
                const updatedObject = await tools.putData( req, res, next, MovieShow )
                res.status(201).redirect("/admin/movieshows");
                break;
            default:
                next(new SyntaxError("_method parameter not found"))
        }
    } else {
        const createdObject = await tools.postData( req, res, next, MovieShow )
        res.status(201).redirect("/admin/movieshows");
    }
});

router.get("/orders", tools.checkAdminAuthentication, async (req, res, next) => {
    const foundObjects = await tools.getAll( req, res, next, Order)
    res.status(200).render("admin/orders", {
        orders: foundObjects
    });
});

router.post("/orders", tools.checkAdminAuthentication, async (req, res, next) => {
    if ({ ...req.body }["_method"]) {
        switch ({ ...req.body }["_method"]) {
            case "delete":
                const deletedObject = await tools.deleteData( req, res, next, Order )
                res.status(201).redirect("/admin/orders")
                break;
            case "put":
                const updatedObject = await tools.putData( req, res, next, Order )
                res.status(201).redirect("/admin/orders");
                break;
            default:
                next(new SyntaxError("_method parameter not found"))
        }
    } else {
        const createdObject = await tools.postData( req, res, next, Order )
        res.status(201).redirect("/admin/orders");
    }
});

router.get("/users", tools.checkAdminAuthentication, async (req, res, next) => {
    const foundObjects = await tools.getAll( req, res, next, User, "-password")
    return res.status(200).render("admin/users", {
        users: foundObjects
    });
});

// update/delete user
router.post("/admin/users", tools.checkAdminAuthentication, async (req, res, next) => {
    if ({ ...req.body }["_method"]) {
        switch ({ ...req.body }["_method"]) {
            case "delete":
                const deletedObject = await tools.deleteData( req, res, next, User )
                res.status(201).redirect("/admin/users")
                break;
            case "put":
                const updatedObject = await tools.putData( req, res, next, User )
                res.status(201).redirect("/admin/users");
                break;
            default:
                next(new SyntaxError("_method parameter not found"))
        }
    } else {
        const createdObject = await tools.postData( req, res, next, User )
        res.status(201).redirect("/admin/users");
    }
});

module.exports = router
