import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { DataContext, DataProviderFuncComp } from './context';
import LoginPage from './component/Login/LoginPage';
import Register from './component/Register/Register';
import ProtectedRoutes from './component/ProtectedRoutes/ProtectedRoutes';
import Home from './pages/HomePage/HomePage';
import leave from "./img/leaves.jpg";
import TakeOneLeave from './pages/TakeLeaves/TakeOneLeave';
import ManageLeaves from './pages/TakeLeaves/ManageLeaves';
import TakeLeave from './pages/TakeLeaves/TakeLeave';
import LeaveDisplay from './pages/TakeLeaves/LeaveDisplay/LeaveDisplay';
import AttendanceScreen from './pages/attendenceScreen/attendenceScreen';
import EmployeeMonthData from './pages/EmployeeMonthData/EmployeeMonthData';

function App() {
  useEffect(() => {
  }, []);



  // Handle both authenticated and unauthenticated routes using Routes and Navigate
  return (
    <>
    <div className=''>
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
          <Route path='//attendence/:id/:month' Component={EmployeeMonthData} />
        </Route>

      </Routes>
    </div>
    </>

  );
}

export default App;
