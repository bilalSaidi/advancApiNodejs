var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../moduls/user');
const user = require('../moduls/user');

/* user signup */
router.post('/signup', function(req, res, next) {
  // check the username is exist or not 
  user.find({username : req.body.username}).
  then(resault=>{
      if(resault.length < 1 ){ // start create user 
        
        bcrypt.hash(req.body.password , 10 , (error ,hash)=>{
          if(error){
            res.status(404).json({
              message : error
            })
          }else{
            const user = new User({
            username : req.body.username ,
            password : hash
            });

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
            });

          }
        });
        
        // end  create user
      }else{ // case the user exist in the database 
        res.status(404).json({
          message : "user already exist "
        });
      } 
  }).
  catch(error=>{
    res.status(404).json({
      message : error
    });
  });

  
    

    
});

module.exports = router;
