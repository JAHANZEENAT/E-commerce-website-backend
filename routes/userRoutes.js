const express = require("express");
const router = express.Router();
const userModel = require('../models/user.js')
router.post('/signup',async (req,res)=>{
    const body = req.body;
   await userModel.create({
        firstName : body.firstName,
        lastName : body.lastName,
        email : body.email,
        password : body.password,
        userType:body.userType,
    })
    return res.status(201).send({msg:"success"})
})
router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email,password})
            req.session.userid=user._id;
            console.log(req.session.userid)
    if (!user) {
        console.log("Not logged in")
        res.status(401).json({
          message: "Login not successful",
          error: "User not found",
        })
      } else {
        console.log("logged in")
        res.status(200).json({
          firstName: user.firstName,
          lastName : user.lastName,
          
        })
      }
})
router.get("/logout",(req,res)=>{
  req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).send('Internal Server Error');
      } else {
          res.redirect("/");
      }
    });
})
module.exports = router ;