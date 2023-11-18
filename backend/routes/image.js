const express = require('express');
const router = express.Router();

const { getUserById } = require('../controllers/user');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getImageById, createImage, getImagesByUser, searchImageByCaption } = require('../controllers/image');

//params
router.param("userId", getUserById);
router.param("imageId", getImageById);

//actual routes

//create image route
router.post("/image/create/:userId", isSignedIn, isAuthenticated, createImage);

//get images route
router.get("/images/:userId", isSignedIn, isAuthenticated, getImagesByUser);
router.get("/images/captionsearch/:userId", isSignedIn, isAuthenticated, searchImageByCaption);


module.exports = router;