import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore.js';
import { AiOutlineUser } from "react-icons/ai";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { LuLock } from "react-icons/lu";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { TbLoader2 } from "react-icons/tb";
import {Link} from 'react-router-dom' 
import {toast} from 'react-toastify'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const {signup, isSigningUp} = useAuthStore();

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData(prev => ({...prev, [name]:value}));
  }

  const validateForm = () => {
    if(!data.fullName.trim())
      return toast.error("Full name is required");

    if(!/\S+@\S+\.\S+/.test(data.email))
      return toast.error("Pls enter a valid email");

    if(data.password.length < 6)
      return toast.error("Password must be of at least 6 characters");

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if(success){
      signup(data); // * store data in zustand stora
    }
  }

  return (
    <div className='min-h-screen min-w-screen grid'>

      {/* Left Side */}
      <div className='flex flex-col items-center justify-center'>
        <div className='w-full max-w-md space-y-8'>

          {/* Profile Image */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors'>
                <IoChatbubbleEllipsesOutline className="size-9 text-[#6264FF]"/>
              </div>
              <h1 className='text-xl sm:text-2xl font-bold mt-2'>Create Account</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>

            {/* fullName */}
            <div className='form-control space-y-1'>
              <label className='label max-sm:pl-2'>
                <span className='label-text font-medium text-sm sm:text-base'>Full Name</span>
              </label>
              <div className='relative max-sm:px-2'>
                <div className='absolute inset-y-0 left-0 pl-5 sm:pl-3 flex items-center pointer-events-none z-10'>
                  <AiOutlineUser size={17} strokeWidth={0.75} />
                </div>
                <input type="text"
                  className='input input-bordered w-full pl-10 pr-3'
                  placeholder='Raj Patel'
                  value={data.fullName}
                  name="fullName"
                  onChange={changeHandler}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className='form-control space-y-1'>
              <label className='label max-sm:pl-2'>
                <span className='label-text font-medium text-sm sm:text-base'>Email</span>
              </label>
              <div className='relative max-sm:px-2'>
                <div className='absolute inset-y-0 left-0 pl-5 sm:pl-3 flex items-center pointer-events-none z-10'>
                  <IoMailOutline size={17} strokeWidth={0.75} />
                </div>
                <input type="text"
                  className='input input-bordered w-full pl-10 pr-3'
                  placeholder='rajpatel@gmail.com'
                  value={data.email}
                  name="email"
                  onChange={changeHandler}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className='form-control space-y-1'>
              <label className='label max-sm:pl-2'>
                <span className='label-text font-medium text-sm sm:text-base'>Password</span>
              </label>
              <div className='relative max-sm:px-2'>
                <div className='absolute inset-y-0 left-0 pl-5 sm:pl-3 flex items-center pointer-events-none z-10'>
                  <LuLock size={17} strokeWidth={0.75} />
                </div>
                <input type={showPassword ? "text" : "password"}
                  className='input input-bordered w-full pl-10 pr-3'
                  placeholder='••••••'
                  value={data.password}
                  name="password"
                  onChange={changeHandler}
                  required
                />
                <button type="button"
                  className='absolute inset-y-0 right-0 pr-3 flex items-center z-10'
                  onClick={() => setShowPassword(prev => !prev)}
                > 
                  {
                    showPassword ? 
                    <IoEyeOffOutline size={17} strokeWidth={0.75}/> : 
                    <IoEyeOutline size={17} strokeWidth={0.75}/>
                  }
                </button>
              </div>
            </div>
            
            <div className='flex justify-center items-center max-sm:px-2'>
              <button type="submit" className='text-xs sm:text-sm btn btn-primary w-full' disabled={isSigningUp}>
                {
                  isSigningUp ? (
                    <>
                      <TbLoader2 className='size-5 animate-spin'/>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )
                }
              </button>
            </div>
          </form>

          <div className='text-center'>
            <p className='text-base-content/60'>
              Already have an account?{" "}
              <Link to="/login" className='link link-primary'>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp