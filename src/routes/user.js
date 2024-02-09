const { MovieShow } = require("../models/movieShowModel")

module.exports = function(app){
    const { User } = require("../models/userModel")
    const { Order } = require("../models/orderModel")
    const { Movie } = require("../models/movieModel")
    const { ScreenRoom } = require("../models/screenRoomModel")
    const tools = require('./tools/tools');

    app.get("/login", (req, res) => {
        res.status(200).render("login")
    });

    // login with existing user
    app.post("/login", async (req, res, next) => {
        const user = await User.findOne({ username: req.body.username, password: req.body.password }).exec();
        if (!user) {
            res.status(200).render("login", { alert: "The provided user credentials were not found" })
        } else {
            req.session.user=user.username
            req.session.userId=user.id
            res.status(200).redirect("/users/"+user.id);
        }
    });

    // remove session (authentication cookies)
    app.get("/logout", (req, res) => {
        req.session.destroy()
        res.render("login", { alert: "Successfully logged out" });
    });

    // create new user
    app.post("/users", async (req, res, next) => {
        if (await User.exists({ username: req.body.username })) {
            res.status(200).render("login", { alert: "The provided username already exists" })
        } else {
            const user = await tools.postData( req, res, next, User )
            req.session.user=user.username
            res.status(201).redirect("/users/"+user.id)
        }
    });

    // single user page
    app.get("/users/:id", tools.checkUserAuthentication, async (req, res, next) => {
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
                    
                res.status(200).render("user", { 
                    title: "User",
                    user: user,
                    userIsAdmin: tools.userIsAdmin(req, res, next),
                    orders: orders,
                    timeToString: tools.formatString,
                })
            } else {
                next(new MongooseError("id not found"))
            }
        } catch (error) {
            next(error)
        }
    })

    // update/delete user
    app.post("/users/:id", tools.checkUserAuthentication, async (req, res, next) => {
        switch ({ ...req.body }["_method"]) {
            case "delete":
                const deletedObject = await tools.deleteData( req, res, next, User )
                res.status(201).redirect("/login")
                break;
            case "put":
                const updatedObject = await tools.putData( req, res, next, User )
                res.status(201).redirect("/users/"+updatedObject.id);
                break;
            default:              
                res.status(400).send({message: "_method parameter not found"})
        }
    });
}
