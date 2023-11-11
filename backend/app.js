require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");

//My Routes
const authRoutes = require("./routes/auth");

const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");


//DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
}).catch(() => {
    console.log("OOPSIE! DB NOT CONNECTED");
});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use('/api', authRoutes);

//Port
const port = process.env.PORT || 8000;

//Server Starting
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});