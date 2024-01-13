const express=require("express")
const User=require("../models/user")
const router=express.Router();

const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken')


const JWT_SECRET="Saranisagoodb@oy";

router.post("/createUser",[
    body('name','enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password',).isLength({min:3})
],async(req,res)=>{
  // if there are errors return Bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
      
      return res.status(400).json({errors:errors.array()});
    }
    // check whether a user with this email exists already
    try{
      let user= await User.findOne({email:req.body.email})
      if(user){
        return res.status(400).json({error:" User with this email  already exists "});
      }
    // create a new user
      const salt=await bcrypt.genSalt(10);
      const secPass=await bcrypt.hash(req.body.password,salt);
      user= await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass
      })
      data={
        user:{
          id:user.id
        }
      }
      const authToken=jwt.sign(data,JWT_SECRET)
      console.log(authToken);

      res.json({authToken})
    }
    // if there are errors catch errors
    catch(error){
      console.log(error.message)
      res.status(500).send("some error occured")
    }
    
})
module.exports=router
