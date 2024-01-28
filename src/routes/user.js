module.exports = function(app){
    const { User } = require("../models/userModel");
    const tools = require('./tools/tools');

    app.get("/login", (req, res) => {
        res.render("login");
    });

    // login with existing user
    app.post("/login", async (req, res, next) => {
        // TODO 
    });

    // single user page
    app.get("/users/:id", async (req, res, next) => {
        const user = await tools.getById( req, res, next, User )
        res.status(200).render("user", { user: user })
    })

    // create new user
    app.post("/users", async (req, res, next) => {
        const createdObject = await tools.postData( req, res, next, User )
        res.status(201).redirect("/users/"+createdObject.id);
    });

    // update/delete user
    app.post("/users/:id", async (req, res, next) => {
        switch ({ ...req.body }["_method"]) {
            case "delete":
                const deletedObject = await tools.deleteData( req, res, next, User )
                res.status(201).redirect("/login")
                break;
            case "put":
                const updatedObject = await tools.putData( req, res, next, User )
                res.status(201).redirect("/users/"+updatedObject.id);
                break;
            default:
                next(new SyntaxError("_method parameter not found"))
        }
    });
}
