import "dotenv/config";
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors'
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import jwt from "jsonwebtoken";
import Register from "./routes/register.js";
import Chats from "./routes/chat.js";
import {User} from "./models/user.js";
import "./config/passport.js"
const app=express();
const port=8080;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(passport.initialize());
passport.use(User.createStrategy());
app.get("/",(req,res)=>{
    res.send("SigmaGpt Woking Successfully")
})
app.use("/profile",Register);
app.use("/thread",Chats);

async function main() {
    try{
        await mongoose.connect(process.env.ATLAS_DB);
        console.log("Connected with Database");

    }catch(err){
        console.log(err)
    }
}

app.listen(port,()=>{
    console.log(`Server connected successfully ${port}`);
    main();
})