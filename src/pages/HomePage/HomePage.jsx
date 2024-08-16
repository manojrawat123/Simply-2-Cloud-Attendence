import React, { useContext, useEffect, useState } from 'react';
import Loading from '../../component/LoadingSpinner/LoadingSpinner';
import Cookies from "js-cookies";
import { DataContext } from '../../context';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Heading from '../../component/CommonCmp/Heading/Heading';
import HeadingO from '../../component/CommonCmp/Heading/HeadingO';
import { ToastContainer, toast } from 'react-toast';
import NoDataPage from '../../component/NoDataPage/NoDataPage';

const Home = () => {
  
  const [button, setButton] = useState();
  const [position, setPosition] = useState();
  const { handleErrorFunc, getProfileFunc, profileData } = useContext(DataContext);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      await getPermissions();
    }
    fetchData();
    getProfileFunc();
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
        getProfileFunc();
        toast.success("You Checkin Sucessfully")
      }).catch((error) => {
        handleErrorFunc(error);
      }).finally(() => {
        setButton(false);
      });
    } catch (error) {
      handleErrorFunc(error);
      setButton(false);
    }
  }

  const checkOutFunc = async (attendanceId) => {
    setButton(true);
    const token = Cookies.getItem("accessToken");
    try {
      axios.put(`${API_BASE_URL}/checkin/${attendanceId}/`, {
        user: Cookies.getItem("id"),
        latitude: position?.coords.latitude,
        longitude: position?.coords.longitude,
      }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(async (response) => {
        getProfileFunc();
        toast.success("Checkout Sucessfully");
      }).catch(async (error) => {
        if (error?.response) {
          if (error?.response?.status == 400) {
            if (error?.response?.data?.error == "Checkout should on the same day") {
              toast.error(error.response.data.error);
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

  if (!profileData) {
    return <Loading />
  }

  console.log(profileData);


  return (
    <>
      <ToastContainer />
      {profileData == "error" ?
        <NoDataPage domain={"404 Error"} subdomain={"User Not Found"} /> :
        <>
          <div className='h-[100vh] bg-gray-200 flex items-center justify-center'>
            <div className='h-[80%] w-[30rem] bg-white my-auto mx-auto p-4 rounded-xl '>
              <div className='' style={{
              }}>
                <HeadingO mainHeading={"Simply 2 Cloud"} subHeading={"Attendence App"} />
                <div className='md:mx-0 md:my-0  mb-4 mx-4 overflow-auto h-[50vh]'>
                  <div className="flex justify-center items-center py-4">
                    {button &&
                      <div className="fixed inset-0 flex items-center justify-center bg-gray-900  bg-opacity-75">
                        <div className=" p-4 rounded-lg">
                          <Loading />
                        </div>
                      </div>
                    }
                    {!profileData?.checkin_id ? <button
                      onClick={checkInFunc}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300 w-full "
                    >
                      {!button ? "Check in" : "Please wait"}
                    </button> :
                      <button
                        onClick={() => {
                          checkOutFunc(profileData?.checkin_id);
                        }}
                        disabled={!profileData?.show_checkout_button}
                        className={`text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300 w-full ${profileData?.show_checkout_button ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500" : "bg-gray-400 cursor-not-allowed "}}`}
                      >
                        {!button ? "Check out" : "Please wait"}
                      </button>

                    }
                  </div>
                  <div className="flex justify-center items-center py-4">
                    <button
                      onClick={() => {
                        navigate("/update-profile");
                      }}
                      className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:from-green-900 hover:to-green-500 text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
                    >
                      Profile
                    </button>
                  </div>
                  <div className="flex justify-center items-center py-4">
                    <button
                      onClick={() => {
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
                      onClick={() => {
                        navigate(`/mydetail/${Cookies.getItem("id")}`);
                      }}
                      className="bg-black w-full text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring transition duration-300"
                    >
                      My Attendence Details
                    </button>
                  </div>
                  <div className="flex justify-center items-center py-4">
                    <button
                      type='button'
                      onClick={() => {
                        navigate(`/manage-batch`);
                      }}
                      className="bg-black w-full text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring transition duration-300"
                    >
                      Manage Batch
                    </button>
                  </div>
                  <div className="flex justify-center items-center py-4">
                    <button
                      type='button'
                      onClick={() => {
                        navigate(`/manage-employees`);
                      }}
                      className="bg-black w-full text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring transition duration-300"
                    >
                      Manage Employees 
                    </button>
                  </div>
                  <div className="flex justify-center items-center py-4">
                    <button
                      type='button'
                      onClick={() => {
                        navigate(`/search-batch?query=select-batch`);
                      }}
                      className="bg-black w-full text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring transition duration-300"
                    >
                      Mark Student Attendence
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </>
      }
    </>);
};

export default Home;
