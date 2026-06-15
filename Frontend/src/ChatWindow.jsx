import { useContext, useState ,useEffect } from 'react';
import { MyContext } from "./MyContext.jsx";
import {CircleLoader} from "react-spinners";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import axios from 'axios';
import './ChatWindow1.css'
import './ChatWindow2.css'
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"
import {useNavigate} from "react-router-dom";


export default function ChatWindow(){
    useEffect(()=>{
    if(localStorage.getItem("welcomeToast")){
        toast.success("Welcome to SigmaGpt!");
        localStorage.removeItem("welcomeToast");
    }
    },[]);

    const navigate=useNavigate();
    const {prompt,setPrompt,newChat,setNewChat,data,setData,title,setTitle,info,setInfo,newId,setNewId}=useContext(MyContext); 
    const[Loading,setLoading]=useState(false);

    function handler(event){
        setPrompt(event.target.value);
    }
    
    function logout(){
        try{
            localStorage.removeItem("token");
            localStorage.setItem("removeToast","true");
            window.location.reload();
        }catch{
            toast.error("Something Went Wrong");
        }
        
    }

    async function click(params) {
        try{
            const token =localStorage.getItem("token")
            setPrompt("")
            setNewChat(false)
            setLoading(true);
        
            let data=await axios.post(`https://sigmagpt-qrd1.onrender.com/thread`,{
                message:prompt,
                id:newId
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
            );


            setTitle(true);
            setLoading(false);
            setInfo(data.data.message);  
            setNewId(data.data._id);
        }catch(e){
            console.log(e);
            setLoading(false);
            toast.error("Something Went Wrong");
            if(!setInfo){
                setNewChat(true);
            }
        }
    }

    function handleClick(event) {
        if(event.key==="Enter"){
            click();
        }
    }

    return(
        <div className='ChatWindow'>
            <div className="header">
                <div className="name">
                    <p>SigmaGPT</p>
                    <i className="fa-solid fa-angle-down"></i>
                </div>
                <div className="logout">
                    <p onClick={logout}>Logout</p>
                </div>
            </div>


            <div className="chat-main">
                <div className='newChat'>
                    {newChat && <h1>What's going on Today</h1>}
                    {Loading && <CircleLoader color='white' size={150}/>}
                </div>
                
                {info.map((obj)=>{
                    if(obj.role==="user"){
                        return <div className="user">
                            <p>{obj.message}</p>
                        </div>
                    }
                    else{
                       return <div className="assistant">
                            <ReactMarkdown rehypePlugins={rehypeHighlight}>{obj.message}</ReactMarkdown>   
                        </div>
                    }
                })}
                
            </div>


            <div className="footer">
                <div className="input" >
                    <input type="text"  placeholder='Ask Anything' value={prompt} onChange={handler} onKeyDown={handleClick}/>
                    <i className="fa-regular fa-paper-plane send" onClick={click}></i>
                </div>
            </div>
        </div>
    )
}