import React, { useState } from 'react'
import resetPasswordArr from './ResetPassworArr';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import {API_BASE_URL} from '../../config';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import genrateInitalValues from '../genrateInitialValues/InitialValues';
import generateValidationSchema from '../GenrateValidationSchema/genrateValidationSchema';
import { ToastContainer, toast } from 'react-toastify';

const ResetPassword = () => {

    const [button, setButton] = useState(false);
    const { userid_encode, verify_token } = useParams();
    const initialValues = genrateInitalValues(resetPasswordArr);
    const validationSchema = generateValidationSchema(resetPasswordArr);
    const navigate = useNavigate();

    return (
        <>
        <ToastContainer />
            <section className="gradient-form h-[100vh] dark:bg-neutral-800 ">
                <div className=" h-full p-10">
                    <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200 md:w-[55%] mx-auto">
                        <div className="w-full">
                            <div className="block rounded-lg bg-white shadow-xl  py-20 md:py-0">
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
                                        <Formik
                                             initialValues={initialValues}
                                            onSubmit={(values) => {
                                                setButton(true);
                                                axios.post(`${API_BASE_URL}/reset-password/${userid_encode}/${verify_token}/`, {
                                                    password: values['password']
                                                }).then((res) => {
                                                    toast.success("Password Reset Successfully", { position: "top-center" });
                                                    setTimeout(() => {
                                                        navigate('/login');
                                                    }, 2000);
                                                }).catch((myerr) => {
                                                    console.log(myerr);
                                                    toast.error("Token Expired!", { position: "top-center" });
                                                }).finally(() => {
                                                    setButton(false);
                                                })
                                            }}
                                            validationSchema={validationSchema}
                                        >
                                            {({
                                                values,
                                                handleSubmit,
                                                resetForm,
                                                setFieldValue,
                                                handleBlur,
                                            }) => (
                                                <Form>
                                                    {/* Username input */}
                                                    {resetPasswordArr.map((element, index) => {
                                                        return (
                                                            <div className="my-4" key={index}>
                                                                <h4 className="text-blue-600 mb-2">
                                                                    {element.placeholder}{" "}
                                                                    {element.required ? <span className="text-red-500">*</span> : <span className="text-gray-700"> (Optional)</span>}
                                                                </h4>
                                                                <div className={"w-full relative col-span-1 "}>
                                                                    {element.icon}
                                                                    <Field
                                                                        type={element.type}

                                                                        name={element.name}
                                                                        placeholder={element.placeholder}
                                                                        className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                                    />
                                                                </div>
                                                                <ErrorMessage
                                                                    name={element.name}
                                                                    component="div"
                                                                    className="text-red-500"
                                                                />
                                                            </div>
                                                        )
                                                    })}
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
                                                            {button ? <CircularProgress size={19} color='inherit' /> : "Reset Password"}
                                                        </button>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ResetPassword
