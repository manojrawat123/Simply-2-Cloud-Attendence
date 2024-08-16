import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import Select from "react-select";
import Loading from '../../component/LoadingSpinner/LoadingSpinner';
import genrateInitalValues from '../../component/genrateInitialValues/InitialValues';
import generateValidationSchema from '../../component/GenrateValidationSchema/genrateValidationSchema';

const SearchPage = ({ title, search_page_arr, route_page, type}) => {

    const validationSchema = generateValidationSchema(search_page_arr);
    const initialValues = genrateInitalValues(search_page_arr);
    const [button, setButton] = useState(false);
    const [isLoading, setIsLoading] = useState()
    const navigate = useNavigate()


    const handleSubmit = (values, { resetForm }) => {
        setButton(true);
        console.log(values);
        console.log(values.id);
        if (type == "id"){
            navigate(`/${route_page}/${values['id']}`)
        }
        else{
        navigate(`/${route_page}/?${new URLSearchParams({
            ...values
        }
        )}`);
    }
    }

    console.log(search_page_arr);

    return (
        <section className="gradient-form h-[100vh] bg-gray-100">
            {
                isLoading ?
                    <div className="fixed inset-3 flex items-center justify-center   bg-opacity-75 z-40">
                        <Loading />
                    </div> : null
            }
            <ToastContainer />
            <div className=" h-full p-10">
                <div className="flex h-full flex-wrap items-center justify-center  md:w-[55%] mx-auto">
                    <div className="w-full">
                        <div className="block rounded-lg bg-white shadow-xl py-20 md:py-0">
                            <h2 className=" text-gray-700 text-3xl py-4 px-6 mb-6 font-semibold text-center">{title}</h2>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                                validationSchema={validationSchema}
                            >
                                {({ values, handleSubmit, resetForm, setFieldValue, handleBlur }) => (
                                    <Form>
                                        <div className="px-4 md:px-0">
                                            <div className="md:mx-6 md:p-12">
                                                {search_page_arr?.map((element, index) => {
                                                    return (
                                                        <div className='' key={index}>
                                                            <h4 className="text-gray-700 mb-2">{element.placeholder} <span className="text-red-500">*</span></h4>
                                                            <div className={"w-full relative col-span-1 "}>
                                                                {
                                                                    ["option", "apioption"].includes(element.type) ?
                                                                        <Select
                                                                            options={element?.option}
                                                                            isSearchable={true}
                                                                            isClearable={true}
                                                                            placeholder={element.placeholder}
                                                                            required
                                                                            onChange={(selectedOption)=>{
                                                                                setFieldValue(element.name , selectedOption.value)
                                                                                if (title == "Search Batch"){
                                                                                    navigate(`/${route_page}/${selectedOption.value}`)
                                                                                }
                                                                            }}
                                                                        />
                                                                        :
                                                                        <>
                                                                            {element.icon}
                                                                            <Field
                                                                                type={element.type ? element.type : "text"}
                                                                                name={element.name}
                                                                                placeholder={element.placeholder}
                                                                                required
                                                                                className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                                            />
                                                                        </>
                                                                }
                                                            </div>
                                                            <ErrorMessage name={element.name} component="div" className="text-red-500" />
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
                                                        {button ? <CircularProgress size={19} color='inherit' /> : "Search"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SearchPage

