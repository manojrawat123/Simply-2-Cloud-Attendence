import React, { useContext, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { API_BASE_URL } from '../../config';
import Cookies from "js-cookies";
import axios from 'axios';
import Loading from '../../component/LoadingSpinner/LoadingSpinner';
import { DataContext } from '../../context';
import "react-toastify/dist/ReactToastify.css";
import HeadingO from '../../component/CommonCmp/Heading/HeadingO';
import { useNavigate } from 'react-router-dom';

const TakeLeave = () => {

    const [minDate, setMinDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });
    const [date, setDate] = useState();
    const [toDate, setToDate] = useState();
    const [button, setButton] = useState();
    const navigate = useNavigate();
    const { handleErrorFunc } = useContext(DataContext);

    const takeLeaveFunc = async () => {
        setButton(true);
        if (toDate < date) {
            try {
                setButton(false);
                const error = {
                    "response": {
                        "status": 400,
                        "data": {
                            "error": "From Date must smaller than to date"
                        }
                    }
                }
                handleErrorFunc(error);
            } catch (err) {
                console.log(err);
            }
            return;
        }
        const token = Cookies.getItem('accessToken');
        const c_date = new Date(date);
        const dateString = c_date.toISOString();
        axios.post(`${API_BASE_URL}/leave/`, {
            date: date,
            toDate: toDate,
            leave_type: "full_day"
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(async (response) => {
            toast.success("Leave Granted Successfully", { position: "top-center" });
        }).catch((error) => {
            handleErrorFunc(error);
        }).finally(() => {
            setButton(false);
        });
    }

    return (
        <div className='h-[100vh] bg-gray-200 flex items-center justify-center'>
        <div className='h-[80%] w-[30rem] bg-white my-auto mx-auto p-4 rounded-xl'>
            <ToastContainer />
            {button &&
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900  bg-opacity-75">
                    <div className=" p-4 rounded-lg">
                        <Loading />
                    </div>
                </div>
            }
            <div className=' '>
                <div className='' style={{
                    // display: "flex", flexDirection: "column", justifyContent: "space-between", height: "70%"
                }}>
                  <HeadingO mainHeading={"Simply 2 Cloud"} subHeading={"Apply For Leave"}/>
                    <div className='md:mx-0 md:my-0 my-10 mx-4'>
                        <label htmlFor="" className='font-bold text-xl my-2 text-gray-700'>From:</label>
                        <div>
                            <input
                                onChange={(e) => {
                                    setDate(e.target.value);
                                }}
                                value={date}
                                type="date" min={minDate} className='w-full outline-green-500 border-2 rounded-xl h-[3rem] pl-3 text-gray-600 font-bold' />
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="" className='font-bold text-xl my-2 text-gray-700'>To:</label>

                            <input
                                onChange={(e) => {
                                    setToDate(e.target.value);
                                }}
                                value={toDate}
                                type="date" min={date} className='w-full outline-green-500 border-2 rounded-xl h-[3rem] pl-3 text-gray-600 font-bold'>
                            </input>
                        </div>
                        <div className="flex justify-center items-center py-4">
                            <button
                                onClick={() => {
                                    if (!date) {
                                        toast.error("Please Select Date", { position: "top-center" })
                                    }
                                    else {
                                        takeLeaveFunc();
                                    }
                                }}
                                className="bg-black w-full text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring transition duration-300"
                                >
                                {button ? "Please wait" : "Apply For Leave"}
                            </button>
                        </div>
                        {/* <div className="flex justify-center items-center py-4">
                            <button
                                onClick={() => {
                                   navigate("/manageleaves")
                                }}
                                className="bg-black w-full text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring transition duration-300"
                                >
                               Back
                            </button>
                        </div> */}
                        <div className="flex justify-center items-center py-4">
                            <button
                                onClick={() => {
                                   navigate("/")
                                }}
                                className="bg-black w-full text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring transition duration-300"
                                >
                            Go to   Home Page
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </div>
    )
}

export default TakeLeave
