module.exports = function(app){
    const moviesRouter = require('./movies')
    const movieshowsRouter = require('./movieshows')
    const ordersRouter = require('./orders')
    const screenroomsRouter = require('./screenrooms')
    const usersRouter = require('./users')

    app.use('/api/movies', moviesRouter)
    app.use('/api/movieshows', movieshowsRouter)
    app.use('/api/orders', ordersRouter)
    app.use('/api/screenrooms', screenroomsRouter)
    app.use('/api/users', usersRouter)
}
