module.exports = function(app){

  const dayjs = require('dayjs')

  // DEBUG executed each time a request to the app-server is made
  app.use((req, res, next) => {
    console.log(dayjs(Date.now()).format("HH:mm:ss-DD-MM-YYYY"), ' ', req.method, ' ', req.originalUrl);
    next();
  });

}