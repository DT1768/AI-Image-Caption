require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");

//My Routes
const authRoutes = require("./routes/auth");
const imageRoutes = require("./routes/image");

const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");


//DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB CONNECTED");
}).catch((err) => {
    console.log(`OOPSIE! DB NOT CONNECTED. n${err}`);
});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use('/api', authRoutes);
app.use('/api', imageRoutes);

//Port
const port = process.env.PORT || 8000;

//Server Starting
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});