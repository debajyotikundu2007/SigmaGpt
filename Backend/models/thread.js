import mongoose from 'mongoose';

const chatSchema=new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","assistant"],
        required:true
    },
    time:{
        type:Date,
        default:Date.now(),
    }
});


const threadSchema = new mongoose.Schema({
    title:{
        type:String,
        default:"New Chat"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    message:[chatSchema]
},
{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at"
    }
});

export const Thread = mongoose.model("Thread", threadSchema);
export const Chat = mongoose.model("Chat", chatSchema);