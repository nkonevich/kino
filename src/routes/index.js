module.exports = function(app){
    const tools = require('./tools/tools');
    const { User } = require("../models/userModel");
    const { MovieShow } = require("../models/movieShowModel");


    app.get("/", async (req, res, next)=> {
        // get list of movieshows, sort by time
        var foundObjects = await tools.getAll( req, res, next, MovieShow, {sort: [['time', 1]]})
        // add data for DB documents, that are represented by document ID in DB
        await MovieShow
            .populate(foundObjects, { 
                path: 'movie screenRoom' 
            })

        var authenticatedUser = null
        if(req.session.user) {
            authenticatedUser = await User.findOne({ username: req.session.user })
        }  
        // render page
        res.render("index", { 
            movieshows: foundObjects,
            timeToString: tools.formatString,
            user: authenticatedUser
        });
    });
}
