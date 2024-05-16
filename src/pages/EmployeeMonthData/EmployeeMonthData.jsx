import React, { useContext, useEffect } from 'react';
import EmployeeMonthDataSupport from './EmployeeMonthDataSup';
import MyButton from '../../customButton';
import { DataContext } from '../../context';
import LoadingSpinner from '../../component/LoadingSpinner/LoadingSpinner';
import { useParams } from 'react-router-dom';

const EmployeeMonthData = ({ navigation }) => {
  
  const route = useRoute();
  const { month, id } = useParams;
  const { monthDataFunc, employeeMonthData } = useContext(DataContext);

  useEffect(() => {
    const year = new Date().getFullYear();
    monthDataFunc(year, month, id);
  }, []);

  if (!employeeMonthData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container px-4 py-8">
      <div className="flex justify-center mb-8">
        <button onClick={() => {}}>{month}</button>
      </div>
      <EmployeeMonthDataSupport data={employeeMonthData} />
    </div>
  );
};

export default EmployeeMonthData;
