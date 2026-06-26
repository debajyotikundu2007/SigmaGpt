import { useState,useEffect } from 'react'
import './Login.css'
import axios from 'axios';
import {Link} from "react-router-dom";
import { ToastContainer, toast,Bounce } from 'react-toastify';
export default function Login(){

    useEffect(()=>{
        if(localStorage.getItem("removeToast")){
            toast.success("Logged Out Successfully");
            localStorage.removeItem("removeToast");
        }
        if(localStorage.getItem("welcomeToast")){
            toast.success("Password Updated Successfully");
            localStorage.removeItem("welcomeToast");
        }
        },[]);

    const[checkData,setCheckData]=useState({username:"",password:""});
    
    function track(event){
        setCheckData((prevData)=>{
            return {...prevData,[event.target.name]:event.target.value}
        })
    }

    async function login(event) {
        try{
            event.preventDefault();
            let result=await axios.post("https://sigmagpt-qrd1.onrender.com/profile/login",{
            username:checkData.username,
            password:checkData.password
            });
            localStorage.setItem("token",result.data.token);
            localStorage.setItem("welcomeToast","true");
            window.location.href="/";
        }
        catch{
            toast.error("Name or Password is Invalid");
        }
    }
    return(
        <section className="login">
            <div className='login-layer'>
                <div className='login-header'>
                    <h1>Login to SigmaGpt</h1>
                </div><br />
                <form onSubmit={login}>
                    <div className='login-middle'>
                        <input type="text" className='login-input' id='name' name='username' placeholder=' ' onChange={track} value={checkData.username} autoComplete="off"/>
                        <label htmlFor="name">Name</label>
                    </div><br /><br />
                    <div className='login-middle'>
                        <input type="password" className='login-input' name='password' id='password' placeholder=' ' onChange={track} value={checkData.password} autoComplete="off"/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="login-button">
                        <button>Login</button>
                    </div>
                    <div className="forgot">
                        <p>Forgot Password →</p><Link to="/update">Update Password</Link>
                    </div>
                    <div className="account">
                        <p>Didn't have an account →</p><Link to="/signup">SignUp</Link>
                    </div>
                </form>
            </div>
        </section>
    )
}