import React, { useContext, useEffect, useState } from 'react';
import Loading from '../../component/LoadingSpinner/LoadingSpinner';
import Cookies from "js-cookies";
import { DataContext } from '../../context';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [button, setButton] = useState();
  const [position , setPosition] = useState();  

  const { handleErrorFunc } = useContext(DataContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
        await getPermissions();
    }
    fetchData();
}, []);

const getPermissions = async () => {
try {
  const currentLocation = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  setPosition(currentLocation);
} catch (error) {
  console.error('Error getting location:', error);
}
};

const checkInFunc = async () => {
    setButton(true);
    const token = Cookies.getItem("accessToken");
    try {
        axios.post(`${API_BASE_URL}/checkin/`, {
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
            user: Cookies.getItem("id")
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(async (response) => {
            await Cookies.setItem("attendence_id", `${response.data?.attendence_id}`);
            // await getCheckInId();
            console.log("success")
            showSuccessToast("Congratulation", "You Checked In Successfully");
        }).catch((error) => {
          console.log(error)
            handleErrorFunc(error);
        }).finally(() => {
            setButton(false);
        });
    } catch (error) {
console.log(error);
        handleErrorFunc(error);
        setButton(false);
    }
}

const checkOutFunc = async () => {
    setButton(true);
    try {
        const attendanceId = await localStorage.getItem("attendence_id");
        axios.put(`${API_BASE_URL}/checkin/${attendanceId}/`, {
            user: id,
            latitude: position?.coords.latitude,
            longitude: position?.coords.longitude,
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(async (response) => {
            await localStorage.removeItem("attendence_id");
            await getCheckInId();
            showSuccessToast("Congratulation", "You Checked Out Successfully")
        }).catch(async (error) => {
            if (error.response) {
                if (error.response.status == 400) {
                    if (error.response.data.error == "Checkout should on the same day") {
                        await localStorage.removeItem("attendence_id");
                        await getCheckInId();
                    }
                }
            }
            handleErrorFunc(error);
        }).finally(() => {
            setButton(false);
        })
    } catch (error) {
        handleErrorFunc(error);
        setButton(false);
    }
}

// if (!employee) {
//     return <LoadingSpinner />
// }


  return (
    <>
    <div className=''>
    <div className='md:flex md:items-center md:justify-center h-[80vh] '>

    
    <div className='' style={{
      display : "flex", flexDirection : "column" , justifyContent : "space-between", height : "70%"
    }}>
      <div>
        <h1 className='text-5xl md:text-6xl font-bold  text-white md:mx-0 md:my-0 my-10 mx-4'>Simply 2 Cloud 
        <br />Attendence</h1>
      </div>

      <div className='md:mx-0 md:my-0 my-10 mx-4'>
      <div className="flex justify-center items-center py-4">
        {button && 
         <div className="fixed inset-0 flex items-center justify-center bg-gray-900  bg-opacity-75">
         <div className=" p-4 rounded-lg">
        <Loading />
        </div>
        </div>
        }
         {Cookies.getItem("attendence_id") == "undefined" || !Cookies.getItem("attendence_id") ? <button
          onClick={checkInFunc}
            className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:from-green-900 hover:to-green-500 text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
          >
          {!button ? "Checkin" : "Please wait"}
          </button> : 
           <button
           onClick={checkInFunc}
             className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:from-green-900 hover:to-green-500 text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
           >
           {!button ? "Checkout" : "Please wait"}
           </button>
          
          }
        </div>
        <div className="flex justify-center items-center py-4">
          <button
          onClick={()=>{
            navigate("/manageleaves");
          }}
             className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:from-green-900 hover:to-green-500 text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
             >
          Manage Leaves
          </button>
        </div>
        <div className="flex justify-center items-center py-4">
          <button
          type='button'
          onClick={()=>{
            navigate(`/mydetail/${Cookies.getItem("id")}`);
          }}
             className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:from-green-900 hover:to-green-500 text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
             >
         My Details
          </button>
        </div>
        </div>
    </div>
    
    </div>
    </div>
    </>
  );
};

export default Home;
