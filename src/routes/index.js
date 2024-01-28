module.exports = function(app){

    const tools = require('./tools/tools');
    const { MovieShow } = require("../models/movieShowModel");

    app.get("/", async (req, res, next)=> {
        var foundObjects = await tools.getAll( req, res, next, MovieShow)
        await MovieShow.populate(foundObjects, { path: 'movie screenRoom' })
        res.render("index", { 
            movieshows: foundObjects,
            timeToString: tools.formatString
        });
    });

}
