import React, { useContext, useEffect } from 'react'
import { DataContext } from '../../../../context'
import Loading from '../../../../component/LoadingSpinner/LoadingSpinner';
import addStudentArr from './AddStudentArr';
import CustomForms from '../../../../ComonComponent/CutomForms/CustomForms';

const AddStudent = () => {

    const {
        getStudentPageFunc,
        studentPageObj
    } = useContext(DataContext);

    useEffect(() => {
        getStudentPageFunc({ page : "page" });
    }, []);

    if (!studentPageObj) {
        return <Loading />
    }

    const updatedArr = addStudentArr.map((element, index) => {
        if (element.type == "dynamicoption") {
            if (element.name == "batch_id") {
                element['option'] = studentPageObj?.batch?.map((u_el, index) => {
                    console.log(u_el);
                    return {
                        'label': `${u_el.batch_name} - ${u_el.assigned_to} (${u_el.batch_start_timing?.slice(0,5)} to ${u_el.batch_end_timing?.slice(0, 5)})`,
                        'value': u_el.id
                    }
                })
            }
        }
        return element
    });

    return (
        <div>
            <CustomForms fieldsArr={updatedArr} pageFunc={getStudentPageFunc} query={{
                page : 'page'
            }} route_name={
                'student'
            } title={
                "Add Student"
            } 
        />
        </div>
    )
}

export default AddStudent
