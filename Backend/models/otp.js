import mongoose from "mongoose";

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    otphash:{
        type:String,
        required:true
    },
    newpassword:{
        type:String
    },
    created_At:{
        type:Date,
        default:Date.now,
        expires:290
    }
}
);

const OTP=mongoose.model("OTP",otpSchema);
export default OTP