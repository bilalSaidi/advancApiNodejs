var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");

var app = express();

var cors = require("cors");

var mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/shopingApi",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("Connected To Db ");
    }
  }
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

app.use(cors());
// view engine setup

app.use(logger("dev"));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    mmaessage: err.message,
  });
});

module.exports = app;
