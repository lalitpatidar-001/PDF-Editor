import React, { useEffect, useState } from "react";
import Input from "../utils/Input";
import Button from "../utils/Button";
import AuthActions from "../utils/AuthActions"
import toast from "react-hot-toast";
import axiosInstance from "../../../../axios";

/*
 * Register Component:
 * This component provides a registration form for new users to sign up.
 * It utilizes Input and Button components for form inputs and submission.
 * Upon successful registration, it displays a success message using toast notifications.
 * If registration fails, it displays appropriate error messages using toast notifications.
 * Features:
 * - Form inputs for full name, email, password, and confirm password
 * - Error handling for registration failures
 * - Toast notifications for success and error messages
 * - Links for redirecting to the login page for existing users
 */

const  Register = () => {

  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password: "",
    confirmPassword: ""
  })
  const [loading ,setLoading] = useState(false)

  const handleOnChange=(e)=>{
    const{name,value}= e.target
    setFormData({...formData,[name]:value})
  }
  const handleFormSubmit = async (e)=>{
    e.preventDefault()
      try {
        setLoading(true)
        const response = await axiosInstance.post("/auth/register",formData)
        if(response.status===201){
          toast.success("User Register Succesully, Please Login!")
        }
      } catch (error) {
        console.log(error)
        if(error.response.status===404){
          toast.error("plesase provide all required data")
        }
        else if(error.response.status===409){
          toast.error("email already exists")
        }
        else if(error.response.status===400){
          toast.error(error.response.data.message)
        }
        else{
          toast.error("something went wrong on server")
        }
      }
      finally{
        setLoading(false)
      }
  }
  

  return (
    <div className="max-w-md mx-auto  bg-white p-8 border rounded-lg shadow-lg flex flex-col gap-5">
      <h1 className="text-2xl font-bold mb-4">User Register Form </h1>
      <form onSubmit={handleFormSubmit}>
        <Input
        onChange={handleOnChange}
          value={formData.name}
          name="name"
          type="text"
          label="Full Name"
          id="name"
          placeholder="Full Name"
          required={true}
        />
        <Input
        onChange={handleOnChange}
        value={formData.email}
          name="email"
          type="email"
          label="Email"
          id="email"
          placeholder="user@gmail.com"
          required={true}
        />
        <Input
        onChange={handleOnChange}
        value={formData.password}
          name="password"
          type="password"
          label="Password"
          id="password"
          placeholder="password"
          required={true}
        />
        <Input
        onChange={handleOnChange}
        value={formData.confirmPassword}
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          id="cnfpassword"
          placeholder="Confirm Password"
          required={true}
        />

        <Button loading={loading} type="submit" title="Register" fullWidth={true} />
      </form>
      <AuthActions text="Already a User? " path='/auth/login' pageName="Login Here"/>
    </div>
  );
};

export default Register;
