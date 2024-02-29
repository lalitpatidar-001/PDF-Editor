import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

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