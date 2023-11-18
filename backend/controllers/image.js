const Image = require('../models/image');

//create image controller
exports.createImage = (req, res) => {
    const image = new Image(
        {
        image_url:req.body.image_url,
        image_caption:req.body.image_caption,
        user:req.profile._id
    });
    image.save().then((image) => {
        return res.json({
            _id: image._id,
            image_url: image.image_url,
            image_caption: image.image_caption,
            user: image.user
        });
    }).catch(err => {
        return res.status(400).json({
            err: "NOT able to save image in DB"
        });
    });
};

//get image controller
exports.getImageById = (req, res, next, id) => {
    Image.findById(id)
    .populate("user")
    .exec()
    .then((image)=> {
        req.image = image;
        next();
    }).catch(() => {
        return res.status(400).json({
            error: "Image not found in DB"
        });
    });
};

//getImageByUserId controller
exports.getImagesByUser = (req, res) => {
    Image.find({ user: req.profile._id })
    .exec()
    .then((images) => {
        return res.json(images);
    })
    .catch(() => {
        return res.status(400).json({
            error: "Images not found in DB"
        });
    });
};

//searchImageByCaption controller
exports.searchImageByCaption = (req, res) => {
    Image.find({
        user: req.profile._id,
        $text: {$search: req.body.search}
    })
    .exec()
    .then((images) => {
        return res.json(images);
    })
    .catch(() => {
        return res.status(400).json({
            error: "Images not found in DB"
        });
    });
};