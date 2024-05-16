import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { API_BASE_URL } from '../../config';
import Cookies from "js-cookies";
import axios from 'axios';
import Loading from '../../component/LoadingSpinner/LoadingSpinner';
import { DataContext } from '../../context';
import "react-toastify/dist/ReactToastify.css";

const TakeOneLeave = () => {
    const [date, setDate] = useState();
    const [leaveType, setLeaveType] = useState();
    const { handleErrorFunc } = useContext(DataContext);

    const [button, setButton] = useState();
    const [minDate, setMinDate] = useState(() => {
        const today = new Date();
        // Convert date to string in the format YYYY-MM-DD
        return today.toISOString().split('T')[0];
    });

    const takeLeaveFunc = async () => {
        setButton(true);
        const token = Cookies.getItem('accessToken');
        const c_date = new Date(date);
        const dateString = c_date.toISOString();
        const formattedDate = dateString.substring(0, 10);
        axios.post(`${API_BASE_URL}/leave/`, {
            date: formattedDate,
            toDate: formattedDate,
            leave_type: leaveType
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(async (response) => {
            toast.success("Leave Granted Successfully")
        }).catch((error) => {
            handleErrorFunc(error);
        }).finally(() => {
            setButton(false);
        });
    }



    return (
        <div className=''>
        <ToastContainer />
            {button && 
         <div className="fixed inset-0 flex items-center justify-center bg-gray-900  bg-opacity-75">
         <div className=" p-4 rounded-lg">
        <Loading />
        </div>
        </div>
        }
            <div className='md:flex md:items-center md:justify-center h-[80vh] '>
                <div className='' style={{
                    display: "flex", flexDirection: "column", justifyContent: "space-between", height: "70%"
                }}>
                    <div>
                        <h1 className='text-5xl md:text-6xl font-bold  text-white md:mx-0 md:my-0 my-10 mx-4'>Simply 2 Cloud
                            <br />Attendence</h1>
                    </div>
                    <div className='md:mx-0 md:my-0 my-10 mx-4'>
                        <div>
                            <input 
                            onChange={(e)=>{
                                setDate(e.target.value);
                            }}
                            value={date}
                            type="date" min={minDate} className='w-full outline-green-500 border-2 rounded-xl h-[3rem] pl-3 text-gray-600 font-bold' />
                        </div>
                        <div className='mt-3'>
                            <select 
                            onChange={(e)=>{
                             setLeaveType(e.target.value);
                            }}
                            value={leaveType}
                            type="date" min={minDate} className='w-full outline-green-500 border-2 rounded-xl h-[3rem] pl-3 text-gray-600 font-bold' >
                                <option value="full_day">Full Day</option>
                                <option value="half_day">Half Day</option>
                            </select>
                        </div>
                        <div className="flex justify-center items-center py-4">
                            <button
                            onClick={()=>{
                                if(!date){
                                    toast.error("Please Select Date", {position : "top-center"})
                                }
                                else{
                                    takeLeaveFunc();
                                }
                            }}
                                className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:from-green-900 hover:to-green-500 text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
                            >
                             {button ? "Please wait" : "Apply For Leave"}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TakeOneLeave
