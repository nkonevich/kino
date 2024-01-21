module.exports = function(app){

    const { User } = require("../models/userModel");
    // const { Movie } = require("./models");
    // const { ScreenRoom } = require("./models");
    // const { MovieShow } = require("./models");
    // const { Order } = require("./models");

    // DEBUG executed each time a request to the app-server is made
    app.use((req, res, next) => {
        console.log(Date.now(), ' ', req.method, ' ', req.originalUrl);
        next();
    });

    app.get("/", (req, res) => {
        res.render("index", { 
            title: "Home" 
        });
    });
    
    app.get("/login", (req, res) => {
        res.render("login", { 
            title: "Login" 
        });
    });

    app.get("/users", async (req, res) => {
        const allUsers = await User.find();
        return res.status(200).render("users", {
            usersList: allUsers
        });
    });

    // single user page
    app.get("/users/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            return res.status(200).render("user", { 
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email 
            });
        } catch (error) {
            console.error(error);
            return res.status(422).send({
                message: 'Failed to get user.'
            })
        }
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

    // app.get("/movies", async (req, res) => {
    //     const allMovies = await Movie.find();
    //     return res.status(200).json(allMovies);
    // });

    // app.post("/movies", async (req, res) => {
    //     const newMovie = new Movie({ ...req.body });
    //     const insertedMovie = await newMovie.save();
    //     return res.status(201).redirect("/movies/" + insertedMovie.id);
    // });

    // app.get("/movies/:id", async (req, res) => {
    //     const { id } = req.params;
    //     const movie = await Movie.findById(id);
    //     return res.status(200).json(movie);
    // });

    // app.get("/screenrooms", async (req, res) => {
    //     const allScreenRooms = await ScreenRoom.find();
    //     return res.status(200).json(allScreenRooms);
    // });

    // app.post("/screenrooms", async (req, res) => {
    //     const newScreenRoom = new ScreenRoom({ ...req.body });
    //     const insertedScreenRoom = await newScreenRoom.save();
    //     return res.status(201).redirect("/screenrooms/" + insertedScreenRoom.id);
    // });

    // app.get("/movieshow", async (req, res) => {
    //     const allScreenRooms = await ScreenRoom.find();
    //     return res.status(200).json(allScreenRooms);
    // });

    // app.post("/movieshow", async (req, res) => {
    //     const newScreenRoom = new ScreenRoom({ ...req.body });
    //     const insertedScreenRoom = await newScreenRoom.save();
    //     return res.status(201).redirect("/screenrooms/" + insertedScreenRoom.id);
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