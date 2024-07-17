import React, { useContext, useState } from 'react'
import NormalButton from '../../../../../component/Buttons/Button';
import { DataContext } from '../../../../../context';

const AttendenceCompleated = ({ setIsLoading, studentAttendencePageObj, pageFunc, query }) => {

    const [showPresentStudent, setShowPresentStudent] = useState(true);

    const {
        commonPutApiFunc
    } = useContext(DataContext);

    return (
        <div>
            <div>
                <button 
                onClick={()=>{
                    setShowPresentStudent(!showPresentStudent);
                }}
                className={`font-semibold border border-blue-700 rounded-md px-2  py-1  ${showPresentStudent ? 'bg-blue-500 text-white' : 'text-blue-500'}` }>
                    Present Student
                </button>
&nbsp;
                <button 
                onClick={()=>{
                    setShowPresentStudent(!showPresentStudent);
                }}
                className={`font-semibold border border-blue-700 rounded-md px-2  py-1  ${!showPresentStudent ? 'bg-blue-500 text-white' : 'text-blue-500'}`}>
                    Absent
                </button>
            </div>

            {studentAttendencePageObj.attendence.filter(element => element.attendance_status == (showPresentStudent ? "Present" : "Absent")).map((element, index) => {
                return <div className={`border-2 flex rounded-xl my-4 mx-2 py-2 text-gray-700 ${element.attendance_status == "Present" ? 'bg-green-50' : 'bg-red-50'} `}
                    onClick={() => {
                        commonPutApiFunc
                    }}>
                    <div className={`font-semibold mx-4 ` }>
                        {element.student_detail.student_name}
                    </div>
                    <div className='ml-auto'>
                        {element.attendance_status == "Present" ? 
                        <button className=' bg-red-500 font-semibold  text-white py-1 rounded px-3 '
                        onClick={()=>{
                    commonPutApiFunc('studentattendence',element.id, {"attendance_status" : "Absent"}, setIsLoading, pageFunc, query);
                        }}>
                          Mark Absent
                        </button>
                        :
                        <button className=' bg-green-500 font-semibold text-white py-1 rounded px-3 '
                        onClick={()=>{                                         
                            commonPutApiFunc('studentattendence',element.id, {"attendance_status" : "Present"}, setIsLoading, pageFunc, query);
                        }}>
                          Mark Present
                        </button>
                        }
                    </div>
                    <div className='text-sm font-bold'>
                        {/* Teacher - ({element.teacher}) */}
                    </div>
                </div>
            })}
        </div>
    )
}

export default AttendenceCompleated
