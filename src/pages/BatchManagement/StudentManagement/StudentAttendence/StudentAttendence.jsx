import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../../../context'
import { useParams } from 'react-router-dom';
import HeadingO from '../../../../component/CommonCmp/Heading/HeadingO';

import Loading from '../../../../component/LoadingSpinner/LoadingSpinner';
import DynamicLoading from '../../../../component/LoadingSpinner/DynamicLoading';
import Cookies from 'js-cookies';
import AttendencePending from './StudentAttendenceAlgo/AttendencePending';
import AttendenceCompleated from './StudentAttendenceAlgo/AttendenceCompleated';

const StudentAttendence = () => {

    const { id } = useParams();
    const [loading, setIsLoading] = useState(false);

    const {
        getStudentAttendencePageFunc,
        studentAttendencePageObj
    } = useContext(DataContext);

    useEffect(() => {
        getStudentAttendencePageFunc({ page: 'attendencepost', batch: id });
    }, []);

    if (!studentAttendencePageObj) {
        return <Loading />
    }

    return (
        <div className='h-[100vh] bg-gray-200 flex items-center justify-center'>
            {loading ? <DynamicLoading /> : null}
            <div className='h-[80%] w-[30rem] bg-white my-auto mx-auto p-4 rounded-xl '>
                <div className='' style={{
                }}>
                    <HeadingO mainHeading={"Simply 2 Cloud"} subHeading={"Attendence App"} />
                    <HeadingO subHeading={"Student Attendence"} />
                    <div className='md:mx-0 md:my-0 mt- mb-4 mx-4 h-[50vh] overflow-auto'>
                        {studentAttendencePageObj.status == "pending" ?

                            <AttendencePending
                                studentAttendencePageObj={studentAttendencePageObj}
                                setIsLoading={setIsLoading}
                                pageFunc={getStudentAttendencePageFunc}
                                query={{ page: 'attendencepost', batch: id }}
                            /> :
                            
                            <AttendenceCompleated 
                            studentAttendencePageObj={studentAttendencePageObj}
                                setIsLoading={setIsLoading}
                                pageFunc={getStudentAttendencePageFunc}
                                query={{ page: 'attendencepost', batch: id }}
                            />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentAttendence



