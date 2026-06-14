import { MyContext } from "./MyContext.jsx"
import { useEffect, useState,useContext } from 'react';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import './Sidebar.css'
export default function Sidebar(){
    const {prompt,setPrompt,newChat,setNewChat,data,setData,title,setTitle,info,setInfo,newId,setNewId}=useContext(MyContext); 

    useEffect(()=>{
        const fetchData=async()=>{
            const token =localStorage.getItem("token")
            if(!token){
                return;
            }
            try{

                const response = await axios.get(
                "https://sigmagpt-qrd1.onrender.com/thread",
                {
                    headers: {
                    Authorization: `Bearer ${token}`
                    }
                }
                );
            setData(response.data);
                
            }
            catch(e){
                console.log(e)
            }
            setTitle(false);
        }
    fetchData();
    },[title]);

    async function deleteChat(id){
        await axios.delete(`https://sigmagpt-qrd1.onrender.com/thread${id}`);
        setInfo([]);
        setTitle(true);
        setNewChat(true);
        toast.success("Chat Deleted Successfully")
    }

function newThread(){
    setNewId("")
    setInfo([]);
    setNewChat(true);
}

    async function allChat(id){
        setNewId(id)
        setInfo([]);
        setNewChat(false)
        let data=await axios.get(`https://sigmagpt-qrd1.onrender.com/thread/${id}`);
        console.log(data.data.message)
        setInfo(data.data.message); 
    }
    return (
        <section className='sidebar'>
            <div className="main">
                <div className="logo">
                    <i className="fa-brands fa-openai"></i>
                    <i className="fa-regular fa-pen-to-square" style={{cursor:"pointer"}} onClick={newThread}></i>
                </div>
                <div className="content">
                    {data.map((message)=>(
                    <div key={uuidv4()} className="chat-item">
                        <p onClick={()=>allChat(message._id)} id="allChat">{message.title}</p>
                        <div className="delete-container">
                            <i className="fa-solid fa-trash-can delete"  onClick={()=>deleteChat(message._id)}></i>
                        </div>
                    </div>
                    ))}
                    
                    </div>
                </div>
                    
            {/* <div className="profile">
                <div className='profileLogo'>
                    <p>DK</p>
                </div>
                <div className="profileName">
                    <p>Debajyoti Kundu</p>
                    <p>Free</p>
                </div>
                <div className="mode">
                    <p>Upgrade</p>
                </div>
            </div> */}
        </section >
    )
}