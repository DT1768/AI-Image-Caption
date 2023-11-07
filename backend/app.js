require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Port
const port = process.env.PORT || 8000;

//Server Starting
app.listen(port, () => {
    console.log(`app is running at ${port} .....`);
});