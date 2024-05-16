import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context';
import LoadingSpinner from '../../component/LoadingSpinner/LoadingSpinner';

const EmployeesList = () => {
  const { getUserAdmin, employeesDetail, setAttendenceObj } = useContext(DataContext);
  const [animatedY, setAnimatedY] = useState(0); // State for animation

  useEffect(() => {
    getUserAdmin();
    setTimeout(() => {
      setAnimatedY(1); 
    }, 1000);
  }, []);

  if (!employeesDetail) {
    return <LoadingSpinner />;
  }

  const translateY = animatedY;

  return (
    <div className="container flex flex-col p-4 mt-20 bg-gray-200">
      {employeesDetail.map((employee, index) => (
        <div
          key={index}
          className={`employee-item p-4 rounded-lg shadow-md overflow-hidden text-white ${
            index % 2 === 0 ? 'bg-purple-600' : 'bg-violet-500'
          }`}
          style={{ transform: `translateY(${translateY}px)` }}
        >
          <Link
            to={`/attendance/${employee.id}?year=${new Date().getFullYear()}`}
            className="flex flex-col justify-between h-full"
            onClick={() => setAttendenceObj(false)}
          >
            <div>
              <h3 className="text-xl font-bold mb-2">{employee.name}</h3>
              <p className="text-base">{employee.email}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EmployeesList;
