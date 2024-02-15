const express = require('express');
const router = express.Router();
const tools = require('./tools/tools');
const { Movie } = require("../models/movieModel");
const { MovieShow } = require("../models/movieShowModel");
const { ScreenRoom } = require("../models/screenRoomModel");
const { User } = require("../models/userModel");
const { Order } = require("../models/orderModel");

router.get("/", tools.checkAdminAuthentication, async (req, res, next) => {

    return res.status(200).render("admin/admin", { 
        title: "Admin", 
        user: await tools.getAuthenticatedUser(req, res, next),
        userIsAdmin: tools.userIsAdmin(req, res, next),
    });
});

router.get("/screenrooms", tools.checkAdminAuthentication, async (req, res, next) => {
    const foundObjects = await tools.getAll( req, res, next, ScreenRoom)
    return res.status(200).render("admin/screenrooms", {
        title: "Admin | Screen rooms",
        user: await tools.getAuthenticatedUser(req, res, next),
        userIsAdmin: tools.userIsAdmin(req, res, next),
        screenRooms: foundObjects
    });
});

router.get("/movies", tools.checkAdminAuthentication, async (req, res, next) => {
    const foundObjects = await tools.getAll( req, res, next, Movie)
    res.status(200).render("admin/movies", {
        title: "Admin | Movies",
        user: await tools.getAuthenticatedUser(req, res, next),
        userIsAdmin: tools.userIsAdmin(req, res, next),
        movies: foundObjects,
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
            if (req.files && req.files.image){
                let imgObj = req.files.image
                if(imgObj.mimetype == "image/jpeg" || imgObj.mimetype == "image/png" || imgObj.mimetype == "image/jpg" ){
                    let img_base64 = imgObj.data.toString('base64');
                    req.body.image =  {
                        data: img_base64,
                        contentType: imgObj.mimetype
                    }
                }
            }

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
        title: "Admin | Movie shows",
        user: await tools.getAuthenticatedUser(req, res, next),
        userIsAdmin: tools.userIsAdmin(req, res, next),
        movieshows: movieshows,
        movies: movies,
        screenrooms: screenrooms,
        timeToString: tools.formatString,
    });
});

router.post("/movieshows", tools.checkAdminAuthentication, async (req, res, next) => {
    const screenroom = await ScreenRoom.findById(req.body.screenRoom)

    req.body.time = tools.stringToDate(req.body.time)

    const seatsPricing = [
        { 
            seatType: "Standard",
            price: req.body.priceStandard 
        },
        { 
            seatType: "Premium",
            price: req.body.pricePremium 
        }
    ]
    req.body.seatsPricing = seatsPricing 

    const seatsAvailability = []
    screenroom.seats.forEach(seat => {
        seatsAvailability.push({
            seatRow: seat.row,
            seatNumber: seat.number,
            seatType: seat.type,
            available: true
        })
    });    
    req.body.seatsAvailability = seatsAvailability

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
    const orders = await Order.find()
                    .populate('user')
                    .populate({
                        path: 'movieShow',
                        select: 'movie time screenRoom',
                        populate: [
                            {
                                path: 'screenRoom',
                                model: ScreenRoom,
                                select: 'name'
                            },
                            {
                                path: 'movie',
                                model: Movie,
                                select: 'name'
                            }
                        ]
                    })

    res.status(200).render("admin/orders", {
        title: "Admin | Orders",
        user: await tools.getAuthenticatedUser(req, res, next),
        userIsAdmin: tools.userIsAdmin(req, res, next),
        orders: orders,
        timeToString: tools.formatString,
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

    res.status(200).render("admin/users", {
        title: "Admin | Users",
        user: await tools.getAuthenticatedUser(req, res, next),
        userIsAdmin: tools.userIsAdmin(req, res, next),
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

router.get("/users/:id", tools.checkAdminAuthentication, async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (user){
            const orders = await Order.find({user: id})
                .populate({
                    path: 'movieShow',
                    select: 'movie time screenRoom',
                    populate: [
                        {
                            path: 'screenRoom',
                            model: ScreenRoom,
                            select: 'name'
                        },
                        {
                            path: 'movie',
                            model: Movie,
                            select: 'name'
                        }
                    ]
                })

            res.status(200).render("admin/user", { 
                title: "Admin | User",
                user: await tools.getAuthenticatedUser(req, res, next),
                userIsAdmin: tools.userIsAdmin(req, res, next),
                orders: orders,
                userOrders: await User.findById( id ),
                timeToString: tools.formatString,
            })
        } else {
            next(new MongooseError("id not found"))
        }
    } catch (error) {
        next(error)
    }
});

module.exports = router
