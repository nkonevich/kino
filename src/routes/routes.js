module.exports = function(app){

    require('./index')(app);
    require('./api/api')(app);
    require('./user')(app);
    // require('./test')(app); // DEBUG: DELETE LATER

    const adminRouter = require('./admin')
    app.use('/admin', adminRouter)
}