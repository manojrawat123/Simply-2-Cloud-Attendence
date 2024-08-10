import React, { useContext, useEffect } from 'react'
import Loading from '../../../../../component/LoadingSpinner/LoadingSpinner';
import { DataContext } from '../../../../../context';
import { useParams } from 'react-router-dom';
import HeadingO from '../../../../../component/CommonCmp/Heading/HeadingO';

const DisplayAttendenceStu = () => {
    const {
        getStudentAttendenceDisplayFunc,
        studentAttendenceDisplayObj
    } = useContext(DataContext);

    const { id } = useParams();

    useEffect(() => {
        getStudentAttendenceDisplayFunc({ page: 'attendenceget', batch : id });
    }, []);

    if (!studentAttendenceDisplayObj) {
        return <Loading />
    }

    return (
        <div className='h-[100vh] bg-gray-200 flex items-center justify-center'>
            <div className='h-[80%] w-[30rem] bg-white my-auto mx-auto p-4 rounded-xl '>
                <div className='' style={{
                }}>
                    <HeadingO mainHeading={"Simply 2 Cloud"} subHeading={"Attendence App"} />
                    <HeadingO subHeading={"Select Batch"} />
                    <div className='md:mx-0 md:my-0 mb-4 mx-4 h-[50vh] overflow-auto'>
                        {studentAttendenceDisplayObj?.map((element, index) => {
                            return <div className='text-center border-2 rounded-xl my-4 mx-2 py-2 text-gray-700'
                                onClick={() => {
                                    // navigate(`/${route}/${element.id}`)
                                }}>
                                <div className='font-semibold '>
                                    {element.student_name}
                                </div>
                                <div>
                                    <div>
                                        <span className='font-bold'>Present</span> - {element.present}
                                    </div>
                                    <div>
                                        <span className='font-bold'>
                                            Absent
                                        </span>
                                        - {element.absent}
                                    </div>
                                    <div>
                                        Attendence {(element.present * 100) / element.total_days} %
                                    </div>
                                </div>

                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayAttendenceStu
