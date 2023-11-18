const User = require("../models/user");

//getUserById middleware
exports.getUserById = (req, res, next, id) => {
    User.findById(id)
    .exec()
    .then((user) => {
        req.profile = user;
        next();
    })
    .catch(() => {
        return res.status(400).json({
            error: "User not found in DB"
        });
    });
}