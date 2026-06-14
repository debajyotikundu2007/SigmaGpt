import { useState } from 'react'
import './Signup.css'

import axios from 'axios';
import {Link} from "react-router-dom";
import { ToastContainer, toast,Bounce } from 'react-toastify';

export default function SignUp(){
    const[formData,setFormData]=useState({username:"",email:"",password:""});

    function input_track(event){
        setFormData((prevData)=>{
            return {...prevData,[event.target.name]:event.target.value};
        })
    }

    async function form_submit(event){
        try{
            event.preventDefault();
            let result=await axios.post("https://sigmagpt-qrd1.onrender.com/profile/signup",{
                username:formData.username,
                email:formData.email,
                password:formData.password
            });
        
            localStorage.setItem("token",result.data.token);
            localStorage.setItem("welcomeToast","true");
            window.location.href="/";
        }catch(err){
            console.log(err);
            toast.error("Something went Wrong")
        }
        
    }
    return(
        <section className="signup">
            <div className='layer'>
                <div className='layout-header'>
                    <h1>Sign Up to SigmaGpt</h1>
                </div>
                <form onSubmit={form_submit}>
                    <div className='layout-middle'>
                        <input type="text" className='input' name='username' id='name' placeholder=' ' onChange={input_track} value={formData.username} autoComplete="off" />
                        <label htmlFor="name">Name</label>
                    </div><br /><br /><br />
                    <div className='layout-middle'>
                        <input type="email" className='input' name='email' id='email' placeholder=' ' onChange={input_track} value={formData.email} autoComplete="off"/>
                        <label htmlFor="email">Email</label>
                    </div><br /><br /><br />
                    <div className='layout-middle'>
                        <input type="password" className='input' name='password' id='password' placeholder=' ' onChange={input_track} value={formData.password} autoComplete="off"/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="submit">
                        <button type='submit'>Sign Up</button>
                    </div>
                    <div className="have-account">
                        <p>Already have an account →</p><Link to="/login">Login</Link>
                    </div>
                </form>
                
            </div>
        </section>
    )
}