var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const createError = require("http-errors");
var logger = require("morgan");

// config dotenv file
require("dotenv").config();
// connecting mongodb
require("./config/connection");

var prodectRouter = require("./routes/prodect");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/prodect", prodectRouter);

// throw error
app.use((req, res, next) => next(createError.NotFound()));

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

module.exports = app;
