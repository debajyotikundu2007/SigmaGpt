import {User} from "../models/user.js";
import passport  from "passport";
import express from "express"
const  router=express.Router();
import jwt from "jsonwebtoken";
import { generateOTP,getOtpHtml } from "../utils/otp.js";
import { sendEmail } from "../service/email.js";
import crypto from "crypto";
import OTP from "../models/otp.js";

router.post("/signup",async(req,res)=>{
    let {username,email,password}=req.body;
    const newUser=new User({username,email});
    const registeredUser=await User.register(newUser,password);
    let otp=generateOTP();
    let html=getOtpHtml(otp);
    let hashOtp=crypto.createHash("sha256").update(otp).digest("hex");
    await OTP.create({
      email:email,
      user:registeredUser._id,
      otphash:hashOtp
    });

    await sendEmail(email,"OTP Verification",`Your OTP code is ${otp}`, html);

    res.json({success: true,email});
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
  if(user){
    await OTP.deleteMany({user:user._id})
  }
    let otp=generateOTP();
    let html=getOtpHtml(otp);
    let hashOtp=crypto.createHash("sha256").update(otp).digest("hex");
    await OTP.create({
      email:email,
      user:user._id,
      otphash:hashOtp,
      newpassword:password
    });

    await sendEmail(email,"OTP Verification",`Your OTP code is ${otp}`, html);
    
  return res.status(200).json({
    success:true,
    message:"OTP sent successfully"
  });
  });


  router.post("/verify",async function (req,res){
    const {email,otp}=req.body;
    let hashOtp=crypto.createHash("sha256").update(otp).digest("hex");

    let user=await OTP.findOne({
      email:email,
      otphash:hashOtp
    });

    if(!user){
      return res.json({
        success:false
      })
    }

    if(user){
      if(user.newpassword){
        let userData=await User.findById(user.user);
        await userData.setPassword(user.newpassword);
        await userData.save();
      }
      const token=jwt.sign({
        id:user.user
      },process.env.JWT_SECRET);
      res.status(200).json({
        success:true,token
      });
    }
    
  });


  router.delete("/unverified_data",async function(req,res){
    const {email}=req.body;
    let user=await User.findOne({email});
    await User.findByIdAndDelete(user._id);
  })

export default router;