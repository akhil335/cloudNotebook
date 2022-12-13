const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'cloudNote';
const fetchuser = require('../middleware/fetchuser')

//Route-1: creating a new user
router.post(
  "/register",
  [
    body("name", "please enter the valid name").isLength({
      min: 3,
    }),
    body("password", "Enter the valid papssword").isLength({
      min: 6,
    }),
    body("email", "Enter the valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    //checking if error is empty or not
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        success
      });
    }

    try {
      //duplicate email checking
      let user = await User.findOne({
        email: req.body.email,
      });

      console.log(user)
      if (user) {
        return res.status(400).json({
          error: "sorry this email address already exist",
          success  
        });
      }


      //crypting password with bcrypt salt
      let salt = await bcrypt.genSalt(10);
      let cryptedPwd = await bcrypt.hash(req.body.password, salt)


      //saving data to db and sending response
     user = await User.create({
        name: req.body.name,
        password: cryptedPwd,
        email: req.body.email,
      })

    //passing ID to jwt token 
      const data = {
        user: {
          id: user.id
        }
      }

      // sending token as a response
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.status(200).json({success, authToken})

    } catch (error) {
      console.log(error.message);
      res.status(500).send("some problem occured");
    }
  }
);


//Route-2: log into a user
router.post(
  "/login",
  [
    body("email", "Enter the valid email address").isEmail(),
    body("password", "Enter the valid papssword").isLength({
      min: 6,
    }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    //checking if error is empty or not
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      //email checking in db
      let user = await User.findOne({
        email: req.body.email,
      });

      // if email not availble
      if (!user) {
        return res.status(400).json({
          error: "please enter valid credential",
          success
        });
      }

      //password cheking
      const passwordCompare = await bcrypt.compare(req.body.password, user.password)

      if(!passwordCompare){
        return res.status(400).json({
          error: "please enter valid credential",
          success
        });
      }

    //passing ID to jwt token 
      const data = {
        user: {
          id: user.id
        }
      }

      // sending token as a response
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authToken})

    } catch (error) {
      console.log(error.message);
      res.status(500).send("some problem occured");
    }
  }
);


//Route-3: get user details
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    let userId = req.user;
    const user = await User.findById(userId).select('-password');
    console.log(user)
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some problem occured");
  }
})


//export router
module.exports = router;
