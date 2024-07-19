import { Email } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
// import logo from "../../../image/simply2cloud.jpg";
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL, API_ROUTE_URL } from '../../config';


const ForgotPasswordForm = ({setForgotPassword}) => {
    const [button, setButton] = useState(false);
    return (
        <div
            className="block rounded-lg bg-white shadow-xl dark:bg-neutral-800 py-20 md:py-0 md:mx-auto md:w-[100%]"
        >
            {/* Left column container */}
            <div className="px-4 md:px-0">
                <div className="md:mx-6 md:p-12">
                    {/* Logo */}
                    <div className="text-center mt-4">
                        {/* <img
                            className="mx-auto w-48"
                            src={logo}
                            alt="logo"
                        /> */}
                    </div>
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        setButton(true);
                        axios.post(`${API_BASE_URL}/forgetpassword/`, {
                            email : e.target.email.value,
                            domain : API_ROUTE_URL
                        }).then((value)=>{
                            console.log(value);
                            toast.success("Reset Email Link is send to your email", {display :"text-center"});
                            setForgotPassword(false);
                        }).catch((err)=>{
                            console.log(err);
                            toast.error("Email Din't exists", {display : "text-center"})
                        }).finally(()=>{
                            setButton(false);
                        })
                    }}>
                        {/* Username input */}
                                <div className="relative my-4" data-te-input-wrapper-init >
                                    <input
                                        type={"email"}
                                        id={'email'}
                                        name={"email"}
                                        required
                                        className=" border border-gray-300 outline-none peer  block min-h-[auto] w-full pl-8 bg-transparent py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus:border-orange-600  focus:border rounded"
                                        placeholder={"Enter your email"}
                                    />
                                    <Email className='absolute top-2 border-r border-black peer-focus:text-violet-700'/>
                                </div>
                        <div className="pb-1 pt-1 text-center">
                            <button
                                className={`mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 font-semibold mt-5 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]`}
                                type="submit"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                style={{
                                    background: "black",
                                }}
                            >
                                {button ? <CircularProgress size={19} color='inherit'/> : "Reset Password"}
                            </button>
                        </div>
                        {/* End of Loading Button */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordForm
