import React, { useContext, useEffect, useState } from 'react';
import NoDataPage from '../../../component/NoDataPage/NoDataPage';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import { DataContext } from '../../../context';
import Cookies from "js-cookies";
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';



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
        <div className="relative">
      {leaveData?.length === 0 ? (
          <NoDataPage domain={"No Leave Taken This Year"} subdomain={"No Data!"} height={"70vh"} />
      ) : (
        <div className="container mx-auto p-4">
          {button && (
            <div className="fixed inset-0 flex items-center justify-center">
              <Loading />
            </div>
          )}
          <div className="mt-20 h-[80vh] overflow-y-scroll">
            {leaveData?.map((employee, index) => (
              <div key={index} className={`py-4 ${index % 2 === 0 ? 'bg-purple-500' : 'bg-custom-background'}`}>
                <div className="flex items-center">
                  <p className="flex-1 text-lg font-bold mb-2">
                    {employee.date} {employee.leave_type ? employee.leave_type : "(Full Day)"}
                  </p>
                  {employee?.is_editable && (
                    <button className="text-red-500" onClick={() => deleteLeaveFunc(employee.id)}>Cancel</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LeaveDisplay
