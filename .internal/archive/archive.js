module.exports = function(app){

  

    app.get("/users", async (req, res) => {

        // app.
        // request({
        //     uri: "/api/users",
        //     method: get
        //     }, async (error, response, body) {
        //     var data={
        //       body:body,
        //       customerID:req.params.customerId,
        //       invoiceID:req.params.invoiceId
        //     };
        // const allUsers = await User.find();
        // return res.status(200).render("users", {
        //     usersList: allUsers
        // });
    });


    // create new user
    app.post('/users', async (req, res) => {
        try {
            const newUser = new User({ ...req.body });
            const insertedUser = await newUser.save();
            return res.status(201).redirect("/users/" + insertedUser.id);
        } catch (error) {
            console.error(error);
            return res.status(422).send({
                message: 'Failed to create new user.'
            })
        }
    });

    // update/delete user
    app.post("/users/:id", async (req, res) => {
        const { id } = req.params;
        if (({ ...req.body }["_method"]) == "delete") {
            // delete user
            try {
                const deletedUser = await User.findByIdAndDelete(id);
                console.log("User with username "+deletedUser.username+" was deleted");
                return res.status(200).redirect("/login");
            } catch (error) {
                return res.status(422).send({
                    message: "Failed to delete user with id ."+id
                })
            }
        } else {
            // update user information
            try {
                await User.updateOne({ id }, req.body);
                const updatedUser = await User.findById(id);
                console.log("User with username "+updatedUser.username+" was updated");
                return res.status(200).redirect("/users/"+id);
            } catch (error) {
                return res.status(422).send({
                message: "Failed to update user with id ."+id
                })
            }
        }
    });




    // orders
    ////////////////////////////////////////////////////////////////////////
    app.get("/orders", async (req, res) => {
        const allOrders = await Order.find();
        return res.status(200).json(allOrders);
    });

    app.post("/orders", async (req, res) => {
        const newOrder = new Order({ ...req.body });
        // get seat
        const seatId = req.query.seat 
        const movieShow = await MovieShow.findById(newOrder["movieShow"])
        const seat = movieShow.seatsAvailability.id(seatId);
        newOrder.seat = { 
            "seatRow": seat.seatRow,
            "seatNumber": seat.seatNumber, 
            "price": seat.price 
        }

        const insertedOrder = await newOrder.save();
        return res.status(200).json(insertedOrder);
    });

    app.get("/orders/:id", async (req, res) => {
        const { id } = req.params;
        const order = await Order.findById(id);
        return res.status(200).json(order);
    });

    // movieshows
    ////////////////////////////////////////////////////////////////////////

    app.get("/movieshows", async (req, res) => {
        const allMovieShows = await MovieShow.find();
        return res.status(200).json(allMovieShows);
    });

    app.post("/movieshows", async (req, res) => {
        const newMovieShow = new MovieShow({ ...req.body });
        const screenRoom = await ScreenRoom.findById(newMovieShow["screenRoom"])
        var price = { ...req.body }["price"]
        screenRoom.seats.forEach((seat) => {
            newMovieShow.seatsAvailability.push({ 
                "seatRow": seat.row, 
                "seatNumber": seat.number, 
                "price": price 
            });
        });
        const insertedMovieShow = await newMovieShow.save();
        return res.status(200).json(insertedMovieShow)
    });

    app.get("/movieshows/:id", async (req, res) => {
        const { id } = req.params;
        const movieshow = await MovieShow.findById(id)
            .populate('movie', 'name')
            .populate('screenRoom', 'name') 
            .exec()

        const rows = await MovieShow.findById(id)
            .distinct("seatsAvailability.seatRow")  
        const time = dayjs(movieshow.time).format("DD-MM-YYYY HH:mm")

        return res.status(200).render("movieShow", { movieshow: movieshow, rows: rows, timeString: time });
    });

    // movies
    ///////////////////////////////////////////////////////////

    app.get("/movies", async (req, res) => {
        const allMovies = await Movie.find();
        return res.status(200).render("movies", {
            movies: allMovies
        });
    });

    app.post("/movies", async (req, res) => {
        let imgObj = req.files.image
        if(imgObj.mimetype == "image/jpeg" || imgObj.mimetype == "image/png" || imgObj.mimetype == "image/jpg" ){
            let img_base64 = imgObj.data.toString('base64');
            // let img_binary = Buffer.from(img_base64, 'base64');

            const newMovie = new Movie({ 
                name: req.body.name,
                description: req.body.description,
                image: {
                    data: img_base64,
                    contentType: imgObj.mimetype
                }
            });
            const insertedMovie = await newMovie.save();
            return res.status(201).redirect("/movies");
        }
    });

    app.get("/movies/:id", async (req, res) => {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        return res.status(200).json(movie);
    });





        // screenrooms
    ////////////////////////////////////////////////////////////////////////



// #########################################################################
// testing

 


    app.get('/images', (req, res) => {
        return res.status(200).render("imageUpload");
    });

    app.post('/images', async(req, res) => {
        let i = req.files.img
        if(i.mimetype == "image/jpeg" || i.mimetype == "image/png" || i.mimetype == "image/jpg" ){
            let imgData = i.data
            let base64 = imgData.toString('base64');
            var image = Buffer.from(base64, 'base64');
            let doc = await Movie.findOneAndUpdate({
                $set:{
                    img:{ 
                        data: image,
                        contentType: ss.mimetype
                    },
                    name: req.body.name
                }
            })
        }
    });


    app.get("/email", (req, res) => {
        const mailData = {
            from: 'nkonevich@yahoo.com',  // sender address
              to: 'nkonevich@gmail.com',   // list of receivers
              subject: 'Sending Email using Node.js',
              text: 'That was easy!',
              html: '<b>Hey there! </b> <br> This is our first message sent with Nodemailer<br/>',
            };
        transporter.sendMail(mailData, function (err, info) {   
            if(err) {
                console.log(err)
            }
            res.status(200).send( {message: info} );
        })
    });


    app.route('/book')
    .get((req, res) => {
      res.send('Get a random book')
    })
    .post((req, res) => {
      res.send('Add a book')
    })
    .put((req, res) => {
      res.send('Update the book')
    })

    // model methods / update seat price
   // app.get("/test", async (req, res) => {

    //     const movieShow = await MovieShow.findById("65b05a8bb437e78c0c41b4b9")
    //     const test = movieShow.updatePrice("Standard", 123)
  

        // console.log(test
        // MovieShow.findOne({ _id: "65b05a8bb437e78c0c41b4b9" }).exec(function (movieshow) {
        //     movieshow.updatePrice();
        //  });    


        // await MovieShow.findById("65b05a8bb437e78c0c41b4b9").exec(function (error, movieShow) {
        //     movieShow.updatePrice("Standard", 123, t);
        //     });

        // const movieShow = await MovieShow.findOneAndUpdate("65b05a8bb437e78c0c41b4b9"

        // );
        // // movieShow.updatePrice("Standard", 44)
        // MovieShow.updateOne(
        //     {'seatsAvailability.id': "a"}, 
        //     {'$set': {
        //         'seatsAvailability.$.price': 123
        // }})
        
        // MovieShow.update(
        //     {"_id":  "65b05a8bb437e78c0c41b4b9", "seatsAvailability.$.seatRow": "a"},
        //     {"seatsAvailability.$.seatRow": 23}
        // );
        // console.log(test)
        // movieShow.find({ "_id":  "65b05a8bb437e78c0c41b4b9", "seatsAvailability": [ "seatRow": "a"]},
        //     { $set : { "seatsAvailability.$[].price": 445 } }
        // )
    // });




}

        // // POST /login gets urlencoded bodies 
        // app.post('/login', urlencodedParser, function (req, res) {
        //     res.send('welcome, ' + req.body.username)
        // })
      
        // // POST /api/users gets JSON bodies
        // app.post('/api/users', jsonParser, function (req, res) {
        //     // create user in req.body
        // })


        // // TESTING the function is executed when the request to this uri is sent
    // app.use('/function', (req, res, next) => {
    //     console.log('Request type: ', req.method);
    //     res.send('Successfully executed a function.');
    //     next();
    // });
// return res.status(200).json(updatedUser);
// return res.status(200).json(allUsers);



// getAllDocs: async () => {
//     return await db.collection(coll).find().toArray()
// }


// return res.status(200).json({
//     "movie_id": allMovieShows[0].movieId,
//     "movie_name": movie.name
// });


// const movieshow = await MovieShow.findById("65aed82f1f711160c53c74dd")
// .populate('movie').exec();
// console.log('The movie name is %s', movieshow.movie.name);

// const movie = await Movie.findById(allMovieShows[0].movieId);



// let doc = await Movie.findOneAndUpdate({dayjs(Date.now()).format("HH:mm:ss-DD-MM-YYYY")
//     $set:{
//         img:{ 
//             data: image,
//             contentType: ss.mimetype
//         },
//         name: req.body.name
//     }
// })


    //- let selectSeatButtons = document.getElementsByClassName("selectSeatButton"); 
    //- elementsArray.forEach(elem => {
    //-   elem.addEventListener("click", assignSeatSelected());
    //- });
    //- document.getElementById("demo").addEventListener("click", myFunction);

    //- function() {
    //-   let selectSeatButtons = document.getElementsByClassName("selectSeatButton");
    //-   elementsArray.forEach(function(elem) {
    //-       elem.addEventListener("input", assignSeatSelected());
    //-   });
    //-   alert("added listener")
    //- }