import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

/*
  AuthLayout component:
    * Render nested component of AuthLoayout Route
    * if user is  logged in redirect to DashboardLayout
*/
const AuthLayout = () => {
 const {isLoggedIn} = useSelector((state)=>state.user)

  if(isLoggedIn) return <Navigate to="/"/>
  return (
    <>
        <Outlet/> 
    </>
  )
}

export default AuthLayout