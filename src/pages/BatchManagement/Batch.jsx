import React, { useContext, useState } from 'react';
import Loading from '../../component/LoadingSpinner/LoadingSpinner';
import Cookies from "js-cookies";
import { DataContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import HeadingO from '../../component/CommonCmp/Heading/HeadingO';
import { ToastContainer, toast } from 'react-toast';

const Batch = () => {

    const [button, setButton] = useState();

    const navigate = useNavigate();

    return (
        <>
            <ToastContainer />
            {
                <>
                    <div className='h-[100vh] bg-gray-200 flex items-center justify-center'>
                        <div className='h-[80%] w-[30rem] bg-white my-auto mx-auto p-4 rounded-xl'>
                            <div className='' style={{
                            }}>
                                <HeadingO mainHeading={"Simply 2 Cloud"} subHeading={"Attendence App"} />
                                <div className='md:mx-0 md:my-0 mt-20 mb-4 mx-4'>
                                    <div className="flex justify-center items-center py-4">
                                        {button &&
                                            <div className="fixed inset-0 flex items-center justify-center bg-gray-900  bg-opacity-75">
                                                <div className=" p-4 rounded-lg">
                                                    <Loading />
                                                </div>
                                            </div>
                                        }
                                        <button
                                            onClick={() => {
                                                navigate('/add-batch');
                                            }}
                                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300 w-full "
                                        >
                                            {"Add Batch"}
                                        </button>
                                    </div>
                                    <div className="flex justify-center items-center py-4">
                                        <button
                                            type='button'
                                            onClick={() => {
                                                navigate(`/display-batch`);
                                            }}
                                            className="bg-black w-full text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring transition duration-300"
                                        >
                                            Batch Details
                                        </button>
                                    </div>
                                    <div className="flex justify-center items-center py-4">
                                        <button
                                            type='button'
                                            onClick={() => {
                                                navigate(`/add-student`);
                                            }}
                                            className="bg-black w-full text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring transition duration-300"
                                        >
                                            Add Student
                                        </button>
                                    </div>
                                    <div className="flex justify-center items-center py-4">
                                        <button
                                            type='button'
                                            onClick={() => {
                                                navigate(`/display-student`);
                                            }}
                                            className="bg-black w-full text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring transition duration-300"
                                        >
                                            Student Details
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

export default Batch;
