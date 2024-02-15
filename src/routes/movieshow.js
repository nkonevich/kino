module.exports = function(app){
    const tools = require('./tools/tools')
    const { MovieShow } = require("../models/movieShowModel")
    const { User } = require("../models/userModel")


    app.get("/movieshows/:id", async (req, res, next) => {
        const movieshow = await tools.getById(req, res, next, MovieShow)
        await MovieShow
            .populate(movieshow, { 
                path: 'movie screenRoom' 
            })

        const { id } = req.params
        const rows = await MovieShow.findById(id)
            .distinct("seatsAvailability.seatRow")  
        
        // let rows = [
        //     ...new Set(screenroom.seats.map((seat) => seat.row)),
        // ];

        var authenticatedUser = null
        if(req.session.user) {
            authenticatedUser = await User.findById( req.session.userId )
        }  

        return res.status(200).render("movieshow", {
            title: "movie show", 
            user: authenticatedUser,
            userIsAdmin: tools.userIsAdmin(req, res, next),
            movieshow: movieshow, 
            rows: rows,
            timeToString: tools.formatString,
        });
    });

}