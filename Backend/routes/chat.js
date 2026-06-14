import express from "express"
import {Thread,Chat} from "../models/thread.js"
import passport from "passport";
import getApiResponse from "../utils/openai.js"
const  router=express.Router();



router.get("/",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    console.log(req)
    try{
        
        let data=await Thread.find({user:req.user._id}).sort({updated_at:-1});
        res.json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({ success: false });
  }
})


router.get("/:id",(async(req,res)=>{
    let {id}=req.params;
    try{
    const data=await Thread.findById(id);
    res.json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({ success: false });
  }
}))

router.delete("/:id",async(req,res)=>{
    let {id}=req.params;
    try{
        await Thread.findByIdAndDelete(id);
        res.status(200).json({ success: "Thread Deleted Successfully" });
    }catch(err){
        console.log(err);
        res.status(500).json({ success: false });
    }
})

router.post("/",
    passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const {message,id}=req.body;
    if(!message){
    return res.status(400).json({ error:"missing required fields" });
  }
    try{
        let chat=new Chat({
            message:message,
            role:"user",
        });

    let data=await getApiResponse(message);
    let chat1=new Chat({
        message:data,
        role:"assistant"
    });

    if(!id){
        let thread=new Thread({
            title:message,
            user:req.user._id,
            message:[chat,chat1]
        });
        await thread.save();
        res.json(thread);
    }
    
    else{
        let data=await Thread.findById(id);
        data.message.push(chat,chat1);
        await Thread.findByIdAndUpdate(id,{message:data.message,updated_at:Date.now()});
        res.json(data);

    }
    
   
    }catch(err){
        console.log(err);
        res.status(500).json({ success: false });
    }
    
})



export default router;