const User = require("../models/user");
const {validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

//signup controller
exports.signup = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        });
    }

    const user = new User(req.body);
    user.save().then((user) => {
        return res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    }).catch(err => {
        return res.status(400).json({
            err: "NOT able to save user in DB"
        });
    })
};

//signin controller
exports.signin = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        });
    }

    User.findOne({ email: email }).then((user) => {

        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            });
        }

        //create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        //put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 });

        //send response to frontend
        const { _id, name, email } = user;
        return res.json({ token, user: { _id, name, email} });
    }).catch(() => {
        return res.status(400).json({
            err: "Email does not exist"
        });
    });
};

//signout controller
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User signout successfully"
    });
};

//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id === req.auth._id;

    if(!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }

    next();
};