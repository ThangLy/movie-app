const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const movieRoute = require("./routes/movies");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
    })
    .then(() => console.log("DB Connection Successfull"))
    .catch((err) => {
        console.error(err);
    });

app.use(express.json());
var cors = require('cors');
app.use(cors());


app.use("/api/auth", authRoute);
app.use("/api/movies", movieRoute);

app.listen(8000, () => {
    console.log("Backend server is running!");
});