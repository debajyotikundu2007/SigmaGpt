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

    if(!id){
        let titleData = await getApiResponse(
            `${message}
            Create a concise and meaningful title (maximum 8 words) that summarizes the main topic.
            Do not use quotes, punctuation, explanations,question marks, or additional text.
            Return only the title.`);
            let data=await getApiResponse(message);
            let chat1=new Chat({
                message:data,
                role:"assistant"
            });

        let thread=new Thread({
            title:titleData,
            user:req.user._id,
            message:[chat,chat1]
        });
        await thread.save();
        res.json(thread);
    }
    
    else{
        let thread=await Thread.findById(id);

        let previousMessage=thread.message.map((msg)=>({
            role:msg.role,
            content:msg.message
        }));
        
        previousMessage.push({
            role:"user",
            content:message
        });

        let data=await getApiResponse(previousMessage);
        let chat1=new Chat({
            role:"assistant",
            message:data
        });
        thread.message.push(chat,chat1);
        await thread.save();

        res.json(thread);

    }
    
   
    }catch(err){
        console.log(err.response?.data || err);
        res.status(500).json({ success: false });
    }
    
});



export default router;