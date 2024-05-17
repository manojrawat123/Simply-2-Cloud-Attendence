import React, { useContext, useEffect, useState } from 'react';
import NoDataPage from '../../../component/NoDataPage/NoDataPage';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import { DataContext } from '../../../context';
import Cookies from "js-cookies";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import { format } from 'date-fns';
import HeadingO from '../../../component/CommonCmp/Heading/HeadingO';



const LeaveDisplay = () => {
    const { getLeaveDetailFunc,
        leaveData } = useContext(DataContext);
        const [button, setButton] = useState();

        useEffect(()=>{
            getLeaveDetailFunc();
        },[])

        if (!leaveData){
            return <Loading />
        }

        const deleteLeaveFunc = async (id) => {
            setButton(true);
            try {
              const token = Cookies.getItem("accessToken");
              await axios.delete(`${API_BASE_URL}/leave/${id}/`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              getLeaveDetailFunc();
              toast.success("Leave Deleted Successfully", {
                position : "top-center"
              });
              console.log("Leave deleted successfully.");
            } catch (error) {
              console.log(error);
            } finally {
              setButton(false);
            }
          };

    return (
      <div className='h-[100vh] bg-gray-200 flex items-center justify-center'>
        <ToastContainer />
      <div className=' w-[30rem] bg-white my-auto mx-auto p-4 rounded-xl '>
      {leaveData?.length === 0 ? (
          <NoDataPage domain={"No Leave Taken This Year"} subdomain={"No Data!"} height={"70vh"} />
      ) : (
        <div className="container mx-auto p-4">
          {button && (
            <div className="fixed inset-0 flex items-center justify-center">
              <Loading />
            </div>
          )}
       
          <HeadingO mainHeading={"Leave Details"} subHeading={""}/>
          <div className="  bg-white rounded  h-[80vh] overflow-y-scroll border p-4 text-gray-700">
            {leaveData?.map((employee, index) => (
              <div key={index} className={`py-4 rounded border my-3 text-center cursor-pointer hover:bg-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'}`}>
                <div className="flex items-center">
                  <p className="flex-1 text-lg font-bold mb-2">
                    {format(new Date(employee.date), 'd MMMM yyyy')} {employee.leave_type ? employee.leave_type : "(Full Day)"}
                  </p>
                  {employee?.is_editable && (
                    <button                 
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 mx-4"
                    onClick={() => deleteLeaveFunc(employee.id)}>Cancel</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default LeaveDisplay
