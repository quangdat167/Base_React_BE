const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { FPGrowth, Itemset } = require("node-fpgrowth");
// Dotenv
require("dotenv").config();

// Format Time

const app = express();

const route = require("./routes");

const db = require("./config/db");
// Connnect to database
db.connect();

// Method overrides để gửi request form với phương thức PUT, DELETE
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Body-parse
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//HTTP logger
app.use(morgan("dev"));

var corsOptions = {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8081",
};

// Cors
app.use(cors());

// Route init
route(app);

const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.listen(PORT, () => {
    console.log(`Example app listening on port localhost:${PORT}`);
});
