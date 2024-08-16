import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { DataContext, DataProviderFuncComp } from './context';
import LoginPage from './component/Login/LoginPage';
import Register from './component/Register/Register';
import ProtectedRoutes from './component/ProtectedRoutes/ProtectedRoutes';
import Home from './pages/HomePage/HomePage';
import TakeOneLeave from './pages/TakeLeaves/TakeOneLeave';
import ManageLeaves from './pages/TakeLeaves/ManageLeaves';
import TakeLeave from './pages/TakeLeaves/TakeLeave';
import LeaveDisplay from './pages/TakeLeaves/LeaveDisplay/LeaveDisplay';
import AttendanceScreen from './pages/attendenceScreen/attendenceScreen';
import EmployeeMonthData from './pages/EmployeeMonthData/EmployeeMonthData';
import { ArrowBack } from '@mui/icons-material';
import AddBatch from './pages/BatchManagement/AddBatch/AddBatch';
import DisplayBatch from './pages/BatchManagement/DisplayBatch/DisplayBatch';
import AddStudent from './pages/BatchManagement/StudentManagement/AddStudent/AddStudent';
import DisplayStudent from './pages/BatchManagement/StudentManagement/DisplayStudent/DisplayStudent';
import Student from './pages/BatchManagement/StudentManagement/Student';
import Batch from './pages/BatchManagement/Batch';
import StudentAttendence from './pages/BatchManagement/StudentManagement/StudentAttendence/StudentAttendence';
import SelectBatchPost from './pages/BatchManagement/StudentManagement/StudentAttendence/SelectBatchPost/SelectBatchPost';
import SelectBatchGet from './pages/BatchManagement/StudentManagement/StudentAttendence/DisplayAttendence/SelectBatchGet/SelectBatchGet';
import DisplayAttendenceStu from './pages/BatchManagement/StudentManagement/StudentAttendence/DisplayAttendence/DisplayAttendenceStu';
import ResetPassword from './component/ResetPassword/ResetPassword';
import SearchStudent from './pages/BatchManagement/StudentManagement/SearchStudent/SearchStudent';
import SendMail from './pages/SendMail/SendMail';
import UpdateProfile from './pages/Profile/Profile';
import DisplayBatchSearch from './pages/BatchManagement/BatchSearch/DisplayBatchSearch';
import EmployeeList from './pages/EmployeeList/EmployeeList';


function App() {

  const location = useLocation();

  const navigate = useNavigate();

  return (
    <>

      <div className=''>
        {
          location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/register" ?
            <div className='fixed h-[2rem] w-[2rem] py-3 '>
              <button onClick={() => {
                navigate(-1)
              }} className='flex bg-black shadow-md text-white py-2 px-4 rounded mx-4'>
                <ArrowBack fontSize='10' className='mt-1' /> <span className='hidden md:inline-block'>Back</span>
              </button>
            </div> : ""
        }

        <Routes>
          {/* Unauthenticated routes */}
          <Route path='/login' Component={LoginPage} />
          <Route path='/register' Component={Register} />
          <Route path='' Component={ProtectedRoutes} >
            <Route path='' Component={Home} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/oneleave' Component={TakeOneLeave} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/manageleaves' Component={ManageLeaves} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/customleave' Component={TakeLeave} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/leavedetails' Component={LeaveDisplay} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/mydetail/:id' Component={AttendanceScreen} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/attendencedetail/:id' Component={AttendanceScreen} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/manage-employees' Component={EmployeeList} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/attendence/:id/:month' Component={EmployeeMonthData} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/manage-batch' Component={Batch} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/add-batch' Component={AddBatch} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/display-batch' Component={DisplayBatch} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/search-batch' Component={DisplayBatchSearch} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/display-batch/:id' Component={DisplayBatch} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/add-student' Component={AddStudent} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/display-student' Component={SearchStudent} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/manage-student' Component={Student} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/select-batch' Component={SelectBatchPost} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route 
              path='/select-batch/:id' 
              Component={SelectBatchPost} 
            />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/select-batch-get' Component={SelectBatchGet} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/select-batch-get/:id' Component={SelectBatchGet} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/student-attendence/:id' Component={StudentAttendence} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/student-attendence-display/:id' Component={DisplayAttendenceStu} />
          </Route>
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/send-mail-to-student' Component={SendMail} />
          </Route>
          
          <Route path='' Component={ProtectedRoutes} >
            <Route path='/display-student/:id' Component={DisplayStudent} />
          </Route>

          <Route path='' Component={ProtectedRoutes} >
            <Route path='/update-profile/' Component={UpdateProfile} />
          </Route>
        <Route path="/reset-password/:userid_encode/:verify_token/" Component={ResetPassword} />

        </Routes>
      </div>
    </>

  );
}

export default App;
