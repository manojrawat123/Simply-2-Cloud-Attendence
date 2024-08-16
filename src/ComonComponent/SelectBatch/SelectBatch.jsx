import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeadingO from '../../component/CommonCmp/Heading/HeadingO';
import Loading from '../../component/LoadingSpinner/LoadingSpinner';
import { DataContext } from '../../context';
import NoDataPage from '../../component/NoDataPage/NoDataPage';

const SelectBatch = ({ route }) => {

    const {
        getBatchDisplayFunc,
        batchDisplayObj
    } = useContext(DataContext);

    useEffect(() => {
        getBatchDisplayFunc({ query: "query" });
    }, []);

    const {
        id
    } = useParams();

    const navigate = useNavigate();

    if (!batchDisplayObj) {
        return <Loading />
    }


    const weakArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const day = weakArr[new Date().getDay()];

    const updatedArr = route == "select-batch" ? batchDisplayObj?.filter((element, index) => element.batch_days.includes(day)) : batchDisplayObj;
    const finalArr = id ? batchDisplayObj.filter((element) => element.assigned_to == id) : batchDisplayObj
    return (
        <div className='h-[100vh] bg-gray-200 flex items-center justify-center'>
            <div className='h-[80%] w-[30rem] bg-white my-auto mx-auto p-4 rounded-xl '>
                <div className='' style={{
                }}>
                    <HeadingO mainHeading={"Simply 2 Cloud"} subHeading={"Attendence App"} />
                    <HeadingO subHeading={"Select Batch"} />
                    <div className='md:mx-0 md:my-0 mb-4 mx-4 h-[50vh] overflow-auto'>
                        {finalArr.length != 0 ? finalArr.map((element, index) => {
                            return <div className='text-center border-2 rounded-xl my-4 mx-2 py-2 text-gray-700'
                                onClick={() => {
                                    navigate(`/${route}/${element.id}`);
                                }}>
                                <div className='font-semibold '>
                                    {element.batch_name}
                                </div>
                                <div>
                                    Batch Timing - {element.batch_start_timing.slice(0, 5)} to
                                    {element.batch_end_timing.slice(0, 5)}
                                </div>
                                <div className='text-sm font-bold'>
                                    Teacher - ({element.teacher})
                                </div>
                            </div>
                        }) : <NoDataPage domain={"No Batch Avaliable for Today"} height={'h-[40vh]'} subdomain={"No Data Here!!"} />}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SelectBatch
