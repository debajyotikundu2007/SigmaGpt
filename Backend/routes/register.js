import {User} from "../models/user.js";
import passport  from "passport";
import express from "express"
const  router=express.Router();
import jwt from "jsonwebtoken";


router.post("/signup",async(req,res)=>{
    let {username,email,password}=req.body;
    const newUser=new User({username,email});
    const registeredUser=await User.register(newUser,password);

    const token = jwt.sign(
      {
        id: registeredUser._id,
      },
      process.env.JWT_SECRET,
    );

    res.json({success: true,token,});
});

router.post(
  "/login",
  passport.authenticate("local", {
    session: false,
  }),
  function (req, res) {

    const token = jwt.sign(
      {
        id: req.user._id,
      },
      process.env.JWT_SECRET,
    );

    res.json({success: true,token,});
  }
);


router.post("/update",async function (req,res){
  console.log(req.body);
  const {username,email,password}=req.body;
  if(!username || !email){
    return res.status(400).json({
      message:"Username or email is empty"
    });
  }
    let user=await User.findOne({username,email});
    if(!user){
    return res.status(404).json({
      message:"Username or email is wrong"
    });
  }

  await user.setPassword(password);
  await user.save();

  return res.status(200).json({
    success:true,
    message:"Password updated successfully"
  });
  })

export default router;