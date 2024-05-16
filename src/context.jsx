import axios from "axios";
import { createContext, useState } from "react";
// import Toast from "react-native-toast-message";
import { API_BASE_URL } from "./config";
import { toast } from "react-toast";

const DataContext = createContext();

const DataProviderFuncComp = ({ children }) => {
  const [checkinId, setCheckInId] = useState();
  const [attendenceObj, setAttendenceObj] = useState();
  const [employeesDetail, setEmployeeDetail] = useState();
  const [employeeMonthData, setEmployeeMonthData] = useState();

  const token = localStorage.getItem("accessToken");

  const getCheckInId = () => {
    const value = localStorage.getItem("attendence_id");
    setCheckInId(value);
  };

  const showErrorToast = (error, message)=>{
      toast.error(message);
  }
  const showSuccessToast = (success, message)=>{
    toast.success(message);
  }


  const handleErrorFunc = (error) => {
    if (error?.response) {
      if (error?.response?.status == 400) {
        console.log(error?.response?.data?.error);
        if (error?.response?.data?.error) {
          showErrorToast("Error", error?.response?.data?.error)
        }
        else {
          const responseData = error?.response?.data;
          if (responseData) {
            Object.keys(responseData).forEach(field => {
              const errorMessages = responseData[field].join('\n');
              if (field == "non_field_errors") {
                showErrorToast("Validation Error", `${errorMessages}`);
              }
              else {
                showErrorToast("Validation Error", `${field}: ${errorMessages}`);
              }
            });

          }
        }
      }
      else if (error?.response?.status == 500) {
        showErrorToast("Error", "Internal Server Error");
      }
      else if (error?.response?.status == 401) {
        showErrorToast("Error", "Unauthorized User");
      }
      else {
        showErrorToast("Error", "Some Error Occured");
      }
    }
    else {
      showErrorToast("Error", error);
      setInterval(() => {
        showErrorToast("Error", error?.message);
      }, 4000);
    }
  }

  return (
    <DataContext.Provider
      value={{
        checkinId,
        getCheckInId,
        handleErrorFunc
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProviderFuncComp, DataContext };
