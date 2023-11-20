var express = require('express');
var router = express.Router();

const { body, check } = require('express-validator');

const { signup, signin, signout, isSignedIn } = require('../controllers/auth');
const user = require('../models/user');


router.post(
    "/signup",
    [
        check("name", "name should be atleast 1 characters").isLength({ min: 1 }),
        check("email", "email is required").isEmail().normalizeEmail(),
        body("email").custom((value) => {
            return user.find(
                { email: value }
            ).then(userDoc => {
                if (userDoc.length > 0) {
                    return Promise.reject('Email already exists!');
                }
            });
        }),
        check("password", "password should be atleast 8 characters").isLength({ min: 8 }),
    ],
    signup
);

router.post(
    "/signin",
    [
        check("email", "email is required").isEmail().normalizeEmail(),
        check("password", "password field is required").isLength({ min: 1 }),
    ],
    signin
);

router.get("/signout", signout);

module.exports = router;