module.exports = function(app){
    const { User } = require("../models/userModel");
    const tools = require('./tools/tools');

    app.get("/login", (req, res) => {
        res.render("login");
    });

    app.get("/logout", (req, res) => {
        req.session.destroy()
        res.render("login", { alert: "Successfully logged out" });
    });

    // login with existing user
    app.post("/login", async (req, res, next) => {
        if (!req.body.username || !req.body.password) {
            res.status(200).render("login", { alert: "Please enter both username and password" })
        } else {
            const user = await User.findOne({ username: req.body.username, password: req.body.password }).exec();
            if (!user) {
                res.status(200).render("login", { alert: "The provided user credentials were not found" })
            } else {
                req.session.user=user.username
                res.status(201).redirect("/users/"+user.id);
            }
        }
    });

    // single user page
    app.get("/users/:id", tools.checkAuthentication, async (req, res, next) => {
        const user = await tools.getById( req, res, next, User )
        res.status(200).render("user", { user: user })
    })

    // create new user
    app.post("/users", async (req, res, next) => {
        if (await User.exists({ username: req.body.username })) {
            res.status(200).render("login", { alert: "The provided username already exists" })
        } else {
            const createdObject = await tools.postData( req, res, next, User )
            req.session.user=createdObject.username
            res.status(201).redirect("/users/"+createdObject.id);
        }
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
