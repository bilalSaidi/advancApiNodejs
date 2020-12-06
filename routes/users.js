var express = require("express");
var router = express.Router();

const bcrypt = require("bcrypt");

const User = require("../moduls/user");

/* user signup */
router.post("/signup", function (req, res, next) {
  // check if the user fill in the username and password
  if ("username" in req.body && "password" in req.body) {
    User.find({ username: req.body.username }) // check if the username is  already  exist or not
      .then((resault) => {
        if (resault.length < 1) {
          // start create user

          bcrypt.hash(req.body.password, 10, (error, hash) => {
            if (error) {
              res.status(404).json({
                message: error.message,
              });
            } else {
              const user = new User({
                username: req.body.username,
                password: hash,
              });

              user
                .save()
                .then((resault) => {
                  res.status(200).json({
                    message: "user created :) ",
                  });
                })
                .catch((error) => {
                  res.status(404).json({
                    message: error.message,
                  });
                });
            }
          });

          // end  create user
        } else {
          // case the user exist in the database
          res.status(404).json({
            message: "user already exist ",
          });
        }
      })
      .catch((error) => {
        res.status(404).json({
          message: error,
        });
      });
  } else {
    // in case the user not fill in the username and passwords
    res.json({
      message: "Username And Password Is Required",
    });
  }
});

/* User Sign in  */

router.get("/signin", (req, res, next) => {
  if ("username" in req.body && "password" in req.body) {
    User.find({ username: req.body.username })
      .then((resault) => {
        if (resault.length < 1) {
          res.status("404").json({
            message: "Wrong Username or password  ",
          });
        } else {
          bcrypt
            .compare(req.body.password, resault[0].password)
            .then((resault) => {
              res.status("200").json({
                message: "welcom  to your acount ",
              });
            })
            .catch((error) => {
              res.status("404").json({
                message: message.error,
              });
            });
        }
      })
      .catch((error) => {
        res.status("404").json({
          message: error.message,
        });
      });
  } else {
    res.json({
      message: "you must fill in the username and the password",
    });
  }
});

module.exports = router;
