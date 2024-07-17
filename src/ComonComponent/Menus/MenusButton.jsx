import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeadingO from '../../component/CommonCmp/Heading/HeadingO';
import { ToastContainer, toast } from 'react-toast';

const MenuButton = ({ buttonArr }) => {

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
                                    {
                                        buttonArr.map((element, index) => {
                                            return <div className="flex justify-center items-center py-4">
                                                <button
                                                    onClick={() => {
                                                        navigate(element.link);
                                                    }}
                                                    className={"text-white font-semibold py-3 px-6 rounded shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300 w-full " + element.color}
                                                >
                                                    {element.title}
                                                </button>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>);
};

export default MenuButton;
