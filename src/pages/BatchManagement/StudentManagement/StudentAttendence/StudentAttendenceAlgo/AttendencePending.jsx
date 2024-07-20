import React, { useContext, useState } from 'react';
import Select from 'react-select';
import Cookies from 'js-cookies';
import NormalButton from '../../../../../component/Buttons/Button';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toast';
import { DataContext } from '../../../../../context';

const AttendencePending = ({ setIsLoading, studentAttendencePageObj, pageFunc, query }) => {

    const { id } = useParams();

    const {
        commonPostApiFunc
    } = useContext(DataContext);

    const [studentArr, setStudentArr] = useState([]);

    return (
        <div>
            <Select
                isMulti
                options={studentAttendencePageObj?.batch_student?.map((element, index) => {
                    return {
                        label: element.student_name,
                        value: element.id,
                    }
                })}
                value={studentArr}
                onChange={(selectedValues) => {
                    setStudentArr(selectedValues);
                }}
            />
            <NormalButton color={'bg-black'} title={"Mark Present"}
                // button={markButton} 
                func={() => {
                    // setIsLoading(true);
                    const studentIds = studentArr.map((element) => {
                        return element.value
                    })
                    const absentStudent = studentAttendencePageObj.batch_student
                        .filter(element => !studentIds.includes(element.id)).map((element) => {
                            return element.id
                        })
                    if (studentIds.length == 0) {
                        toast.error("Please Select Student")
                    }
                    const data = {
                        present_student: studentIds,
                        absent_student: absentStudent,
                        batch_id: id
                    }
                    commonPostApiFunc('studentattendence', data, setIsLoading, pageFunc, query);
                }} />

            <NormalButton color={'bg-green-600'}
                title={"All Present"} func={() => {
                    const studentIds = studentAttendencePageObj.batch_student.map((element) => {
                        return element.id
                    });
                    const data = {
                        present_student: studentIds,
                        absent_student: [],
                        batch_id: id
                    }
                    commonPostApiFunc('studentattendence', data, setIsLoading, pageFunc, query);
                }} />

        </div>
    )
}

export default AttendencePending
