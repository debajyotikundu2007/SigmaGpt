import { useLocation,useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react'
import './Verify.css'
import axios from 'axios';
import {Link} from "react-router-dom";
import { ToastContainer, toast,Bounce } from 'react-toastify';



export function Verify() { 
    useEffect(()=>{
    if(localStorage.getItem("sent")){
        toast.success("OTP has been sent to your email!");
        localStorage.removeItem("sent");
    }
    },[]);
    const location=useLocation();
    const navigate=useNavigate();
    const[verifyData,setVerifyData]=useState({email:location.state?.email || "",otp:""});

    
    function track(event){
        setVerifyData((prevData)=>{
            return {...prevData,[event.target.name]:event.target.value}
        });
    }


    async function verifyOtp(event){
        try{
            event.preventDefault();
            let result=await axios.post("https://sigmagpt-qrd1.onrender.com/profile/verify",{
            email:verifyData.email,
            otp:verifyData.otp
            });

            if(result.data.success){
                localStorage.setItem("token",result.data.token);
                localStorage.setItem("welcomeToast","true");
                window.location.href="/";
                // navigate("/");
            }
            else{
                toast.error("OTP is wrong");
            }
        }
        catch (err) {
            console.log(err)
            toast.error("Something went wrong");
        }
    }

    async function wrongEmail(){
        await axios.delete(`https://sigmagpt-qrd1.onrender.com/profile/unverified_data`,{
            data:{
                email:verifyData.email
            }
        });
        navigate("/login");
    }
   
    return(
        <section className="verify">
            <div className='verify-layer'>
                <div className='verify-header'>
                    <h2>Verify Your Account</h2>
                </div><br />
                <form>
                    <div className='verify-middle'>
                        <input type="email" className='verify-input' id='email' name='email' disabled placeholder=' ' onChange={track} value={verifyData.email} autoComplete="off"/>
                        <label htmlFor="email">Email</label>
                    </div><br /><br />
                    <div className='verify-middle'>
                        <input type="text" className='verify-input' id='otp' name='otp' placeholder=' ' onChange={track} value={verifyData.otp} autoComplete="off"/>
                        <label htmlFor="otp">Enter the correct OTP</label>
                    </div><br /><br />
                    <div className="verify-button">
                        <button onClick={verifyOtp}>Verify</button>
                    </div>
                    <div className="wrong-email">
                        <p>Wrong Email →</p><Link to="/signup" onClick={wrongEmail}>Change</Link>
                    </div>

                </form>
            </div>
        </section>
    )
}