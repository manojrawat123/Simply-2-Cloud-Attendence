import React, { useContext, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../../context';
import EditConfirm from '../../component/ConfirmButton/ConfirmEdit';
import genrateInitalValues from '../../component/genrateInitialValues/InitialValues';
import generateValidationSchema from '../../component/GenrateValidationSchema/genrateValidationSchema';
import Select from 'react-select';


const EditForms = ({ row_data, setIsModalOpen, topTableHeading, getFunc, url_route, query }) => {

    const [button, setAddButton] = useState(false);
    const [confirmEdit, setConfirmEdit] = useState(false);
    const [editData, setEditData] = useState();
    const formArr = topTableHeading?.map((element, index) => {
        return {
            ...element,
            value: row_data[element.name]
        }
    });

    const initialValues = genrateInitalValues(formArr);
    const validationSchema = generateValidationSchema(formArr);
    const { authHeader } = useContext(DataContext);

    return (
        <div className=''>
            {confirmEdit ? <EditConfirm url_route={url_route} id={row_data.id} getFunc={getFunc} query={query} setConfirmEdit={setConfirmEdit} editData={editData} setIsModalOpen={setIsModalOpen} /> : null}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    setEditData(values);
                    setConfirmEdit(true);
                }}
            >
                {({
                    values,
                    handleSubmit,
                    resetForm,
                    setFieldValue,
                    handleBlur,
                }) => (
                    <Form encType="multipart/form-data">
                        <div className="mb-4 grid md:grid-cols-2 grid-cols-1 gap-4 p-4">
                            {topTableHeading.map((element, index) => {
                                if (element.name == "Action") return;
                                return (
                                    <div className="" key={index}>
                                        <h4 className="text-gray-700 mb-2">
                                            {element.placeholder}
                                            {element.required ? <span className="text-red-500">*</span> : <span className="text-gray-700"> (Optional)</span>}
                                        </h4>
                                        <div className={"w-full relative col-span-1 "}>
                                            {element.icon}
                                            {["option", "select", 'array', 'dynamicoption'].includes(element.type) ?
                                                element.type == 'array' ? 
                                                    < Select
                                            options={element.option}
                                            // ref={selectRef}
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
                                            defaultValue={row_data[element.name].map((element, index)=>{
                                                return {
                                                    label : element,
                                                    value : element
                                                }
                                            })}
                                                            />
                                            :
                                            <Field
                                                as="select"
                                                name={element.name}
                                                placeholder={element.name == 'title' ? element.helpingtext : element.placeholder}
                                                className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                                            >
                                                <option value="">Please Select</option>
                                                {element.option?.map((element, index) => {
                                                    return <option value={element.value}>{element.label}</option>
                                                })}
                                            </Field>: <Field
                                                type={element.type ? element.type : 'text'}
                                                name={element.name}
                                                placeholder={element.name == 'title' ? element.helpingtext : element.placeholder}
                                                max={['invoice_to_date', 'payment_date'].includes(element.name) ? new Date().toISOString().split('T')[0] : null}
                                                className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                                            /> }
                                        </div>
                                        <ErrorMessage
                                            name={element.name}
                                            component="div"
                                            className="text-red-500"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mb-4 mx-5">
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 px-4 rounded hover:bg-black transition duration-300"
                            >
                                {button ? (
                                    <CircularProgress size={19} color="inherit" />
                                ) : (
                                    "Update"
                                )}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default EditForms
