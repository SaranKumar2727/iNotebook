const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchUser=require("../middleware/fetchuser")

const JWT_SECRET = "Saranisagoodb@oy";
//ROUTE-1 : creating a new user--signup using /api/auth/createUser
router.post(
  "/createUser",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password").isLength({ min: 3 }),
  ],
  async (req, res) => {
    // if there are errors return Bad request and the errors
    const result = validationResult(req);
    let success=false
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check whether a user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success=false;
        return res
          .status(400)
          .json({success, error: " User with this email  already exists " });
      }
      // create a new user
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);
      success=true
      res.json({ success,authToken });
    } catch (error) {
      // if there are errors catch errors
      success=false;
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE-2 : Authenticate a user----login endpoint:/api/auth/login
router.post("/login",[
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],async (req, res) => {
    let success=false
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false
        return res.status(400).json({success, error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false
        return res.status(400).json({success, error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true
      res.json({ success,authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE-3 : Get loggedin user details using POST: /api/auth/getUser
router.post("/getUser",fetchUser,async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  });

module.exports = router;
