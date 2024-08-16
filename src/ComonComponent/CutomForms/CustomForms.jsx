import React, { useContext, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import generateValidationSchema from '../../component/GenrateValidationSchema/genrateValidationSchema';
import genrateInitalValues from '../../component/genrateInitialValues/InitialValues';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import Cookies from "js-cookies";
import { DataContext } from '../../context';
import Select from "react-select";

const CustomForms = ({ fieldsArr, route_name, title, pageFunc, query, toastMessage }) => {

    const validationSchema = generateValidationSchema(fieldsArr);
    const initialValues = genrateInitalValues(fieldsArr);
    const [button, setButton] = useState(false);
    const { handleErrorFunc } = useContext(DataContext);
    const navigate = useNavigate();
    const [fromDataTransferUser, setFromDataTransferUser] = useState();
    const selectRef = useRef();
    const handleSubmit = (values, { resetForm }) => {
        setButton(true);
        const token = Cookies.getItem("accessToken");
        axios.post(`${API_BASE_URL}/${route_name}/`, { ...values, fromDataTransferUser }, {
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then((value) => {
            toast.success(toastMessage
                 ? toastMessage : "Successfully Updated", {
                position: "top-center"
            });
            try {
                if (pageFunc) {
                    if (query) {
                        pageFunc(query);
                    }
                    else {
                        pageFunc();
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
            resetForm();
        }).catch((err) => {
            handleErrorFunc(err);
            console.log(err);
        }).finally(() => {
            setButton(false);
        });
    }

    return (
        <div>
            <ToastContainer />
            <div className="w-[100%] py-10 bg-blue-50">
                <div className="sm:w-[70%] w-[90%] mt-10  mx-auto bg-white rounded-lg shadow-2xl border border-solid border-gray-300 ">
                    <h2 className="bg-gray-100 text-gray-700 text-3xl py-4 px-6 mb-6 font-semibold text-center">{title}</h2>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ values, handleSubmit, resetForm, setFieldValue, handleBlur }) => (
                            <Form>
                                <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-2 gap-4 p-4">
                                    {fieldsArr?.map((element, index) => {
                                        return (
                                            <div className='' key={index}>
                                                <h4 className="text-gray-700 mb-2">{element.placeholder} {element.required ? <span className="text-red-500">*</span> : null}</h4>
                                                <div className={"w-full relative col-span-1 "}>
                                                    {["dynamicoption", "option", "select", 'array'].includes(element.type) ?
                                                        <>
                                                            {element.type == "array" ? <Select
                                                                options={element.option}
                                                                ref={selectRef}
                                                                isSearchable={true}
                                                                isMulti
                                                                isClearable={true}
                                                                onChange={(selectedOptions) => {
                                                                    const selectedValues = selectedOptions.map(option => option.value);
                                                                    setFieldValue(element.name, selectedValues);
                                                                }}
                                                                name={element.name}
                                                                placeholder={element.placeholder}
                                                                required
                                                            />
                                                                : <> {element.icon}
                                                                    <Field
                                                                        as="select"
                                                                        name={element.name}
                                                                        placeholder={element.placeholder}
                                                                        required
                                                                        className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                                        onChange={(e) => {
                                                                            if (element.name == "template_id") {
                                                                                const template_obj = element.option.find((o_el) => o_el.value == e.target.value);
                                                                                setFieldValue('subject', template_obj?.data?.subject ? template_obj.data.subject : '');
                                                                                setFieldValue('body', template_obj?.data?.template_body ? template_obj.data.template_body : '');
                                                                                setFieldValue('signature', template_obj?.data?.signature ? template_obj.data.signature : '');
                                                                            }
                                                                            setFieldValue(element.name, e.target.value);
                                                                        }}
                                                                    >
                                                                        <option value="">Please Select</option>
                                                                        {
                                                                            element.option?.map((opt, index) => {
                                                                                return <option value={opt.value}>{opt.label}</option>
                                                                            })
                                                                        }
                                                                    </Field>
                                                                </>}
                                                        </>
                                                        :
                                                        <>
                                                            {element.icon}
                                                            {<Field
                                                                as={element.type == "textarea" ? "textarea" : null}
                                                                type={!element.type || element.type == "number" ? "text" : element.type}
                                                                name={element.name}
                                                                placeholder={element.placeholder}
                                                                required={element.required ? true : false}
                                                                className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                            />}
                                                        </>
                                                    }
                                                </div>
                                                <ErrorMessage name={element.name} component="div" className="text-red-500" />
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="mb-4 mx-5">
                                    <button
                                        type="submit"
                                        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-black transition duration-300"
                                    >
                                        {button ? <CircularProgress size={19} color='inherit' /> : "Submit"}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default CustomForms
