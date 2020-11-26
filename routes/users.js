var express = require('express');
var router = express.Router();

const User = require('../moduls/user');

/* user signup */
router.post('/signup', function(req, res, next) {
    const user = new User({
      username : req.body.username ,
      password : req.body.password
    })

    user.save().
    then(resault => {
      res.status(200).json({
        message : "user created :) "
      });
    }).
    catch(error => {
      res.status(404).json({
        message : error.message
      });
    })
});

module.exports = router;
