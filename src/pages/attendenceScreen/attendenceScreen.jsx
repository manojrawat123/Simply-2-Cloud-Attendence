import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Assuming use of React Router for routes
import { DataContext } from '../../context';
import LoadingSpinner from '../../component/LoadingSpinner/LoadingSpinner';
import { ToastContainer } from 'react-toast';
import Loading from '../../component/LoadingSpinner/LoadingSpinner';
import HeadingO from '../../component/CommonCmp/Heading/HeadingO';

const AttendanceScreen = () => {

  const { getAttendenceDetailByYear, attendenceObj } = useContext(DataContext);
  const [selectedYear, setSelectedYear] = useState(null); // Assume initial state for web
  const [employee, setEmployee] = useState(null); // Assume initial state for web
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch data on component mount (assuming route params are passed differently)
  useEffect(() => {
    const fetchData = async () => {
      const year = new Date().getFullYear();
      await getAttendenceDetailByYear(id, year);
    };
    fetchData();
  }, []);


  useEffect(() => {
    if (attendenceObj) {
      localStorage.setItem('attendenceData', JSON.stringify(attendenceObj));
    }
  }, [attendenceObj]);

  if (!attendenceObj) {
    return <Loading />;
  }

  return (
    <div className='h-[100vh] bg-gray-200 flex items-center justify-center'>
      <ToastContainer />
      <div className=' w-[30rem] bg-white my-auto mx-auto p-4 rounded-xl '>
        <HeadingO mainHeading={"Attendence Details"} subHeading={""} />
        <button title={employee?.name} onClick={() => { }} />
        <button title={new Date().getFullYear()} onClick={() => { }} />
        <div className=' bg-white rounded  h-[80vh] overflow-y-scroll border p-4 text-gray-700'>
          {Object.entries(attendenceObj).map(([month, stats], index) => (
            <div key={index} className='cursor-pointer ' onClick={() => {
              navigate(`/attendence/${id}/${month}`);
            }}>
              <div className={`flex items-center justify-center py-4 rounded border my-3 text-center cursor-pointer hover:bg-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'}`}>

                <div>

                  <h1 style={styles.monthText}>{month}</h1>

                  <div className='flex items-center justify-center space-x-10'>
                    <h1 style={styles.statText}>Present: {stats.present}</h1>
                    <h1 style={styles.statText}>Half Days: {stats.half_days}</h1>
                    <h1 style={styles.statText}>Leave: {stats.leave}</h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    flexGrow: 1,
    padding: 10,
  },
  card: {
    marginBottom: 20,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statText: {
    fontSize: 16,
    marginRight: 'auto',
  },
};

export default AttendanceScreen;
