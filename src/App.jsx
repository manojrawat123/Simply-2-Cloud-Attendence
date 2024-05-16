import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { DataContext, DataProviderFuncComp } from './context';
import LoginPage from './component/Login/LoginPage';
import Register from './component/Register/Register';
import ProtectedRoutes from './component/ProtectedRoutes/ProtectedRoutes';
import Home from './pages/HomePage/HomePage';
import leave from "./img/leaves.jpg";

function App() {
  useEffect(() => {
  }, []);



  // Handle both authenticated and unauthenticated routes using Routes and Navigate
  return (
    <>
    <div className='background-image-container'>

      <Routes>
        {/* Unauthenticated routes */}
        <Route path='/login' Component={LoginPage} />
        <Route path='/register' Component={Register} />

        <Route path='' Component={ProtectedRoutes} >
          <Route path='' Component={Home} />
        </Route>
      </Routes>
    </div>
    </>

  );
}

export default App;
