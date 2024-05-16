import React, { useContext, useEffect } from 'react';
import EmployeeMonthDataSupport from './EmployeeMonthDataSup';
import MyButton from '../../customButton';
import { DataContext } from '../../context';
import LoadingSpinner from '../../component/LoadingSpinner/LoadingSpinner';

const EmployeeMonthData = ({ navigation }) => {
  const route = useRoute();
  const { month, year, employee_id } = route.params;

  const { monthDataFunc, employeeMonthData } = useContext(DataContext);

  useEffect(() => {
    monthDataFunc(year, month, employee_id);
  }, []);

  if (!employeeMonthData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container px-4 py-8">
      <div className="flex justify-center mb-8">
        <MyButton title={month} onPress={() => {}} />
      </div>

      <EmployeeMonthDataSupport data={employeeMonthData} />
    </div>
  );
};

export default EmployeeMonthData;
