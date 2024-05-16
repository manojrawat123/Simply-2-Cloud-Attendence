import Cookies from 'js-cookie';
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const CompanyProtectedRoutes = () => {

    const navigate = useNavigate()

    if (!Cookies.get('token') || !Cookies.get('user_type') == "company"){
        return navigate("/login");
    }

  return (
   <Outlet />
  )
}

export default CompanyProtectedRoutes
