const express = require('express');
const router = express.Router();
const tools = require('./tools/tools');
const { ScreenRoom } = require("../models/screenRoomModel");
const { Movie } = require("../models/movieModel");
const { MovieShow } = require("../models/movieShowModel");
const { User } = require("../models/userModel");
const { Order } = require("../models/orderModel");

router.get("/", async (req, res, next) => {
    return res.status(200).render("admin");
});

router.get("/screenrooms", async (req, res, next) => {
    const foundObjects = await tools.getAll( req, res, next, ScreenRoom)
    return res.status(200).render("admin/screenrooms", {
        screenRooms: foundObjects
    });
});

router.post("/screenrooms", async (req, res, next) => {
    // TODO
});

router.get("/movies", async (req, res, next) => {
    const foundObjects = await tools.getAll( req, res, next, Movie)
    res.status(200).render("admin/movies", {
        movies: foundObjects
    });
});

router.post("/movies", async (req, res, next) => {
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

router.get("/movieshows", async (req, res, next) => {
    const foundObjects = await tools.getAll( req, res, next, MovieShow)
    return res.status(200).render("movieShows", {
        movieShows: foundObjects
    });
});

router.post("/movieshows", async (req, res, next) => {
    // TODO
});

router.get("/orders", async (req, res, next) => {
    const foundObjects = await tools.getAll( req, res, next, Order)
    res.status(200).render("orders", {
        orders: foundObjects
    });
});

router.post("/orders", async (req, res, next) => {
    // TODO
});

router.get("/users", async (req, res, next) => {
    const foundObjects = await tools.getAll( req, res, next, User, "-password")
    return res.status(200).render("users", {
        users: foundObjects
    });
});

router.post("/users", async (req, res, next) => {
    // TODO
});

module.exports = router
