if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const route = require("./routes");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(route);

module.exports = app;
