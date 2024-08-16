import axios from "axios";
import { createContext, useState } from "react";
import Cookies from "js-cookies";
// import Toast from "react-native-toast-message";
import { API_BASE_URL } from "./config";
import { toast } from "react-toast";
import { useNavigate } from "react-router-dom";

const DataContext = createContext();

const DataProviderFuncComp = ({ children }) => {

  const [checkinId, setCheckInId] = useState();
  const [attendenceObj, setAttendenceObj] = useState();
  const [employeesDetail, setEmployeeDetail] = useState();
  const [employeeMonthData, setEmployeeMonthData] = useState();
  const [leaveData, setLeaveData] = useState();
  const [profileData, setProfileData] = useState();
  const [addBatchPageObj, setAddBatchPageObj] = useState();
  const [batchDisplayObj, setbatchDisplayObj] = useState();
  const [studentPageObj, setStudentPageObj] = useState();
  const [displayStudentObj, setDisplayStudentObj] = useState();
  const [studentAttendencePageObj, setStudentAttendencePageObj] = useState();
  const [studentAttendenceDisplayObj, setStudentAttendenceDisplayObj] = useState();
  const [sendEmailPageObj, setSendEmailPageObj] = useState();

  const navigate = useNavigate();

  const handleErrorFunc = (error) => {
    console.log(error);
    if (error?.response) {
      if (error?.response?.status == 400) {
        console.log(error?.response?.data?.error);
        if (error?.response?.data?.error) {
          toast.error(error?.response?.data?.error)
        }
        else {
          const responseData = error?.response?.data;
          if (responseData) {
            try {

              Object.keys(responseData).forEach(field => {
                const errorMessages = responseData[field].join('\n');
                if (field == "non_field_errors") {
                  toast.error(`${errorMessages}`);
                }
                else {
                  toast.error(`${field}: ${errorMessages}`);
                }
              });
            }
            catch (errorc) {
              toast.error(error?.response?.data?.error)
            }

          }
        }
      }
      else if (error?.response?.status == 500) {
        toast.error("Internal Server Error");
      }
      else if (error?.response?.status == 401) {
        logoutFunc();
        toast.error("Unauthorized User");
      }
      else {
        toast.error("Some Error Occured");
      }
    }
    else {
      toast.error(error);
    }
  }

  const commonGetApi = (route, setParamsData) => {
    setParamsData();
    const token = Cookies.getItem("accessToken");
    axios.get(`${API_BASE_URL}/${route}/`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((value) => {
      setParamsData(value.data);
    }).catch((err) => {
      handleErrorFunc(err);
    });
  }

  const getUserAdmin = async () => {
    try {
      const token = Cookies.getItem('accessToken');
      axios.get(`${API_BASE_URL}/get_employee_detail/`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(async (response) => {
        setEmployeeDetail(response.data)
      }).catch((error) => {
        console.log(error)
      })
    } catch (error) {
      handleErrorFunc(error);
      setButton(false);
    }
  }

  const commonPostApiFunc = (route, data,setIsLoading, pageFunc= null, query = null)=>{
    setIsLoading(true);
    const token = Cookies.getItem('accessToken');
    axios.post(`${API_BASE_URL}/${route}/`, data, {
      headers : {
        Authorization : `Bearer ${token}`
      }
    }).then((value)=>{
      toast.success('Successfully Updated!!');
      console.log(value);
      try{

        if (pageFunc){
          if (query){
            pageFunc(query);
          }
          else{
            pageFunc();
          }
        }
      }
      catch(error){
        console.log(error);
      }
    }).catch((err)=>{
      handleErrorFunc(err);
    }).finally(()=>{
      setIsLoading(false);
    })
  }

  const commonPutApiFunc = (route, id,data,setIsLoading, pageFunc= null, query = null)=>{
    setIsLoading(true);
    const token = Cookies.getItem('accessToken');
    axios.put(`${API_BASE_URL}/${route}/${id}/`, data, {
      headers : {
        Authorization : `Bearer ${token}`
      }
    }).then((value)=>{
      toast.success('Successfully Updated!!');
      console.log(value);
      if (pageFunc){
        if (query){
          pageFunc(query);
        }
        else{
          pageFunc();
        }
      }
    }).catch((err)=>{
      handleErrorFunc();
    }).finally(()=>{
      setIsLoading(false);
    })
  }

  const commonGetIdApi = (route, id, setParamsData) => {
    setParamsData();
    const token = Cookies.getItem("accessToken");
    axios.get(`${API_BASE_URL}/${route}/${id}/`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((value) => {
      setParamsData(value.data);
    }).catch((err) => {
      handleErrorFunc(err);
    });
  }

  const commonGetParamsApi = (route, query, setParamsData) => {
    setParamsData();
    const token = Cookies.getItem("accessToken");
    axios.get(`${API_BASE_URL}/${route}/`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      params: query
    }).then((value) => {
      console.log(value.data);
      setParamsData(value.data);
    }).catch((err) => {
      console.log(err);
      handleErrorFunc(err);
    });
  }

  const getCheckInId = () => {
    const value = Cookies.getItem("attendence_id");
    setCheckInId(value);
  };

  const logoutFunc = () => {
    Cookies.removeItem('token');
    Cookies.removeItem('user');
    Cookies.removeItem('accessToken');
    Cookies.removeItem('sessionid');
    Cookies.removeItem('id');
    navigate("/login");
  }

  const getProfileFunc = async () => {
    setProfileData(null);
    const token = Cookies.getItem('accessToken');
    axios.get(`${API_BASE_URL}/profile/`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    }).then(async (response) => {
      setProfileData(response?.data);
    }).catch((error) => {
      logoutFunc();
      console.log(error);
    });
  }

  const getLeaveDetailFunc = async () => {
    setLeaveData(null);
    const token = Cookies.getItem('accessToken');
    axios.get(`${API_BASE_URL}/leave/`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      params: {
        year: new Date().getFullYear()
      }
    }).then(async (response) => {
      setLeaveData(response?.data);
    }).catch((error) => {
      if (error?.response) {
        console.log(error?.response?.data);
      }
    });
  }

  const getAttendenceDetailByYear = async (id, year) => {
    try {
      const token = Cookies.getItem('accessToken');
      axios.get(`${API_BASE_URL}/checkin/${id}/`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        params: {
          year: year
        }
      }).then((response) => {
        setAttendenceObj(response.data);
      }).catch((error) => {
        handleErrorFunc(error);
      })
    } catch (error) {
      handleErrorFunc(error);
    }
  }

  const monthDataFunc = async (year, month, employee_id) => {
    setEmployeeMonthData();
    try {
      const token = Cookies.getItem('accessToken');
      axios.get(`${API_BASE_URL}/get_month_data/${employee_id}/`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        params: {
          year: year,
          month: month
        }
      }).then(async (response) => {
        setEmployeeMonthData(response.data);

      }).catch((error) => {
        console.log(error);
      })
    } catch (error) {
      handleErrorFunc(error);
    }
  }

  const getBatchPageFunc = (query) => {
    commonGetParamsApi('batch', query, setAddBatchPageObj);
  }

  const getBatchDisplayFunc = (query) => {
    commonGetParamsApi('batch', query, setbatchDisplayObj);
  }

  const getStudentPageFunc = (query) => {
    commonGetParamsApi('student', query, setStudentPageObj);
  }

  const getStudentDisplayPageFunc = (query) => {
    commonGetParamsApi('student', query, setDisplayStudentObj);
  }

  const getStudentAttendencePageFunc = (query)=>{
    commonGetParamsApi('studentattendence', query, setStudentAttendencePageObj);
  }
  
  const getStudentAttendenceDisplayFunc = (query)=>{
    commonGetParamsApi('studentattendence', query, setStudentAttendenceDisplayObj);
  }

  const getBatchStudentById = (id) => {
    commonGetIdApi('student', id, setDisplayStudentObj);
  }

  const sendMailPageFunc = (query)=>{
    commonGetParamsApi('sendmail', query,setSendEmailPageObj )
  }

  return (
    <DataContext.Provider
      value={{
        checkinId,
        getCheckInId,
        handleErrorFunc,
        getLeaveDetailFunc,
        leaveData,
        getAttendenceDetailByYear,
        attendenceObj,
        monthDataFunc,
        getProfileFunc,
        profileData,
        employeeMonthData,
        getBatchPageFunc,
        addBatchPageObj,
        getStudentPageFunc,
        studentPageObj,
        getBatchStudentById,
        getStudentDisplayPageFunc,
        displayStudentObj,
        getBatchDisplayFunc,
        batchDisplayObj,
        getStudentAttendencePageFunc,
        studentAttendencePageObj,
        commonPostApiFunc,
        commonPutApiFunc,
        getStudentAttendenceDisplayFunc,
        studentAttendenceDisplayObj,
        sendMailPageFunc,
        sendEmailPageObj,
        employeesDetail,
        getUserAdmin
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProviderFuncComp, DataContext };
