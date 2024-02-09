const { MovieShow } = require('../models/movieShowModel');

module.exports = function(app){
    const tools = require('./tools/tools')
    const { Order } = require("../models/orderModel")
    const { User } = require("../models/userModel")

    app.post("/orders", async (req, res, next) => {
        const movieshow = await MovieShow.findById(req.body.movieshow)
        const price = movieshow.seatsPricing.find(item => {
                return item.seatType == req.body.seatType
            }).price
        movieshow.setAvailability(req.body.seatId, false)

        const newOrder = new Order({ 
            user: req.session.userId,
            movieShow: req.body.movieshow,
            seat: {
                row: req.body.seatRow,
                number: req.body.seatNumber,
                type: req.body.seatType,
                seatsAvailabilityId: req.body.seatId,
            },
            price: price
        });
        const insertedOrder = await newOrder.save();

        res.status(201).redirect("/users/"+req.session.userId)
    });

    app.post("/orders/:id", async (req, res, next) => {
        try{
            switch ({ ...req.body }["_method"]) {
                case "delete":
                    const deletedOrder = await tools.deleteData( req, res, next, Order )

                    const movieshow = await MovieShow.findById(deletedOrder.movieShow._id)
                    movieshow.setAvailability(deletedOrder.seat.seatsAvailabilityId, true)
                    
                    res.status(201).redirect("/users/"+req.session.userId)
                    break;
                case "put":
                    const updatedObject = await tools.putData( req, res, next, Order )
                    res.status(201).redirect("/users/"+req.session.userId);
                    break;
                default:
                    next(new SyntaxError("_method parameter not found"))
            }
        } catch(error) {
            console.log(error)
        }
    });

}