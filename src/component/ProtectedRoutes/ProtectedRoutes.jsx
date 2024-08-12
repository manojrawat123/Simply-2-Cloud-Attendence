import Cookies from 'js-cookies'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'


const ProtectedRoutes = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.getItem('accessToken') || !Cookies.getItem("user") == "user") {
      navigate("/login");
    }
  }, []);

  if (!Cookies.getItem('accessToken') || !Cookies.getItem("user") == "user") {
    navigate('/login');
  }

  return (
    <Outlet />
  )
}

export default ProtectedRoutes
