const express = require('express');
const router = express.Router();
const tools = require('./tools/tools');
const { Movie } = require("../models/movieModel");
const { MovieShow } = require("../models/movieShowModel");
const { ScreenRoom } = require("../models/screenRoomModel");
const { User } = require("../models/userModel");
const { Order } = require("../models/orderModel");

router.get("/", tools.checkAdminAuthentication, async (req, res, next) => {
    return res.status(200).render("admin/admin");
});

router.get("/login", async (req, res, next) => {
    return res.status(200).render("admin/login");
});

router.get("/screenrooms", tools.checkAdminAuthentication, async (req, res, next) => {
    const foundObjects = await tools.getAll( req, res, next, ScreenRoom)
    return res.status(200).render("admin/screenrooms", {
        title: "admin | Screen rooms",
        screenRooms: foundObjects
    });
});

router.get("/movies", tools.checkAdminAuthentication, async (req, res, next) => {
    const foundObjects = await tools.getAll( req, res, next, Movie)
    res.status(200).render("admin/movies", {
        movies: foundObjects,
        title: "admin | Movies",
    });
});

router.post("/movies", tools.checkAdminAuthentication, async (req, res, next) => {
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
});

router.post("/movies/:id", tools.checkAdminAuthentication, async (req, res, next) => {
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
});

router.get("/movieshows", tools.checkAdminAuthentication, async (req, res, next) => {
    const movieshows = await tools.getAll( req, res, next, MovieShow)
    await MovieShow
        .populate(movieshows, { 
            path: 'movie screenRoom' 
        })
    const movies = await tools.getAll( req, res, next, Movie)
    const screenrooms = await tools.getAll( req, res, next, ScreenRoom)

    return res.status(200).render("admin/movieshows", {
        title: "admin | Movie shows",
        movieshows: movieshows,
        movies: movies,
        screenrooms: screenrooms,
        timeToString: tools.formatString,
    });
});

router.post("/movieshows", tools.checkAdminAuthentication, async (req, res, next) => {
    req.body.time = tools.stringToDate(req.body.time)   
    const createdObject = await tools.postData( req, res, next, MovieShow )
    res.status(201).redirect("/admin/movieshows");
});

router.post("/movieshows/:id", tools.checkAdminAuthentication, async (req, res, next) => {
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
});

router.get("/orders", tools.checkAdminAuthentication, async (req, res, next) => {
    const foundObjects = await tools.getAll( req, res, next, Order)
    res.status(200).render("admin/orders", {
        orders: foundObjects,
        title: "admin | Orders"
    });
});

router.post("/orders", tools.checkAdminAuthentication, async (req, res, next) => {
    const createdObject = await tools.postData( req, res, next, Order )
    res.status(201).redirect("/admin/orders");
});

router.post("/orders/:id", tools.checkAdminAuthentication, async (req, res, next) => {
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
});

router.get("/users", tools.checkAdminAuthentication, async (req, res, next) => {
    const foundObjects = await tools.getAll( req, res, next, User, "-password")
    // foundObjects.aggregate( [
    //     {
    //         $addFields: {
    //             orders: []
    //         }
    //     }
    // ] )
    // foundObjects.forEach(function(user) {
    //     const aggregate = User.aggregate({ $addFields: { orders: []}})
    //     console.log(user)
    //     console.log(aggregate)
    //     // user.AggregateputData({ orders: [] })
    //     // console.log(user)
    // })
    // user.push({ orders: [] })

    // req.body.users.forEach(function(user) {
    //     user.push({ orders: [] })
    // })

    // console.log(req.body)

    res.status(200).render("admin/users", {
        users: foundObjects,
        title: "admin | Users"
    });
});

// update/delete user
router.post("/users/:id", tools.checkAdminAuthentication, async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error)
    }
});

module.exports = router
