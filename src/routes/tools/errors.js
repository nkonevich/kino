module.exports = function(app){

  // ERROR handling
  app.get('*', (req, res) => {
    res.status(404).send('Page not found');
  });

  app.use((error, req, res, next) => {
    if (error.name == "CastError" && error.kind == "ObjectId" ) {
      res.status(200).send({ message: "Id not valid" })
    } else {
      console.error(error.stack)
      res.status(500).send('Something broke!')
    }
  })

}