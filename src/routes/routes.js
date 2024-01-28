module.exports = function(app){

    // main page
    require('./index')(app);
    // client-side urls 
    require('./user')(app);
    // admin-side urls
    const adminRouter = require('./admin')
    app.use('/admin', adminRouter)
    // api
    // require('./api/api')(app);  // deactivated for now
}