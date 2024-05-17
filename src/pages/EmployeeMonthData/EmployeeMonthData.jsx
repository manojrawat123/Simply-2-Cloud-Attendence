import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MonthSupport from './MonthSupport';
import { DataContext } from '../../context';
import Loading from '../../component/LoadingSpinner/LoadingSpinner';
import HeadingO from '../../component/CommonCmp/Heading/HeadingO';

const EmployeeMonthData = ({ navigation }) => {

  const { month, id } = useParams();
  const { monthDataFunc, employeeMonthData } = useContext(DataContext);

  useEffect(() => {
    const year = new Date().getFullYear();
    monthDataFunc(year, month, id);
  }, []);

  if (!employeeMonthData) {
    return <Loading />;
  }

  return (
    <div className='h-[100vh] bg-gray-200 flex items-center justify-center '>
      <div className='w-[30rem] bg-white  mx-auto p-4 rounded-xl '>
        <HeadingO mainHeading={"Simply 2 Cloud"} subHeading={"Attendence App"} />
        <MonthSupport data={employeeMonthData} />
      </div>
    </div>
  );
};

export default EmployeeMonthData;
