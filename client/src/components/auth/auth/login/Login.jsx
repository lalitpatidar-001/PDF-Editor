// Frontend: Login.jsx

import React, { useState } from "react";
import Input from "../utils/Input";
import Button from "../utils/Button";
import AuthActions from "../utils/AuthActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../../../axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signInUser } from "../../../../redux/slices/userSlice";

/*
 * Login Component:
 * This component provides a login form for users to authenticate themselves.
 * It utilizes Input and Button components for form inputs and submission.
 * Upon successful login, it dispatches a Redux action to update the user state.
 * If login fails, it displays appropriate error messages using toast notifications.
 * Features:
 * - Form inputs for username/email and password
 * - Error handling for login failures
 * - Dispatching Redux action on successful login
 * - Links for redirecting to registration page for new users
 */

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading , setLoading] = useState(false)
  const [formData,setFormData] = useState({
    email:"",
    password:""
  })
  const [error,setError] = useState('')

  const handleChangeForm =(e)=>{
    const {name,value}=e.target;
    setFormData(prev=>({...prev, [name]:value}))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const response = await axiosInstance.post("/auth/login",formData);
      if(response.status===200){
        toast.success("Logged In Successfully")
        dispatch(signInUser({id:response.data.data._id , email:response.data.data.email}))
      }
    } catch (error) {
      const data=error.response.data
      const status = error.response.status
      if(status===404){
        toast.error(data.message)
      }
      else if(status===401){
        toast.error(data.message)
      }else{
        toast.error("something went wrong on server")
      }

    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-8 bg-white p-8 border rounded-lg shadow-lg flex flex-col gap-5">
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold mb-4 items-center">Login Form</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <span className="text-red-500">{error}</span>
          <Input
            onChange={handleChangeForm}
            value={formData.email}
            type="text"
            name="email"
            placeholder="username or email"
            label="User Name"
            required={true}
          />
          <Input
            onChange={handleChangeForm}
            value={formData.password}
            type="password"
            name="password"
            placeholder="password"
            label="Password"
            required={true}
          />
          <Button  type="submit" title="Login" fullWidth={true} loading={loading} />
        </form>
        {/* <span>Forget email or password</span> */}

        <AuthActions
          text="New User? "
          path="/auth/register"
          pageName="Create an account"
        />
      </div>
    </div>
  );
};

export default Login;
