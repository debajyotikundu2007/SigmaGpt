import { useState,useEffect } from 'react'
import './Update.css'
import axios from 'axios';
import {Link} from "react-router-dom";
import { ToastContainer, toast,Bounce } from 'react-toastify';
export default function Update(){
    const[verifyData,setVerifyData]=useState({username:"",email:"",password:""});
    
    function track(event){
        setVerifyData((prevData)=>{
            return {...prevData,[event.target.name]:event.target.value}
        });
    }


    async function update(event){
        try{
            event.preventDefault();
            let result=await axios.post("https://sigmagpt-qrd1.onrender.com/profile/update",{
            username:verifyData.username,
            email:verifyData.email,
            password:verifyData.password
            });

            if (result.data.success) {
                localStorage.setItem("welcomeToast","true");
                window.location.href = "/login";
            }

        }
        catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    }
    return(
        <section className="update">
            <div className='update-layer'>
                <div className='update-header'>
                    <h2>Verify & Reset Password</h2>
                </div><br />
                <form onSubmit={update}>
                    <div className='update-middle'>
                        <input type="text" className='update-input' id='name' name='username' placeholder=' ' onChange={track} value={verifyData.username} autoComplete="off"/>
                        <label htmlFor="name">Name</label>
                    </div><br /><br /><br />
                    <div className='update-middle'>
                        <input type="email" className='update-input' id='email' name='email' placeholder=' ' onChange={track} value={verifyData.email} autoComplete="off"/>
                        <label htmlFor="email">Email</label>
                    </div><br /><br /><br />
                    <div className='update-middle'>
                        <input type="password" className='update-input' name='password' id='password' placeholder=' ' onChange={track} value={verifyData.password} autoComplete="off"/>
                        <label htmlFor="password">New Password</label>
                    </div>
                    <div className="update-button">
                        <button>Update</button>
                    </div>

                </form>
            </div>
        </section>
    )
}