module.exports = function(app){
    const tools = require('./tools/tools');

    app.get("/test", async (req, res, next)=> {
        res.status(200).render('test');
    })
}