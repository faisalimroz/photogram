import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginAccount } from '../../features/AuthSlice/AuthSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'
const Login = () => {
  const { user: { email, displayName, role }, isLoading, isError } = useSelector(state => state.auth);
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const [password,seePassword]=useState('')
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    const { password, email } = data
    const user = {
      email: email,
      password: password
    }
    dispatch(loginAccount(user))
    console.log(user)
  };

  useEffect(()=>{
    if (!isLoading&&email) {
      navigate('/')
    }
  },[isLoading,email])
  const togglePassword=()=>{
    seePassword(!password)
  }
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className=' text-3xl mb-4'>Login Your <span className=' text-blue-500'>Account</span></h2>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl">
          {/* Name Field */}
          <section className='flex flex-col items-center gap-4'>
            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
              <input
                {...register("email", { required: true, maxLength: 80 })}
                type="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-2 ">Password</label>
           <div className='flex items-center relative'>
           <input
                {...register("password", { required: true, maxLength: 80 })}
                type={password?'text':'password'}
                name="password"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
             <span type='button' onClick={togglePassword} className='absolute right-3 cursor-pointer'><FontAwesomeIcon icon={password?faEyeSlash:faEye}/></span>
           </div>
            </div>
            
          </section>

          {/* Submit Button */}
          <div className="col-span-2 lg:col-span-3 xl:col-span-4 mt-5">
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Login
            </button>
          </div>
        </form>
        <p className='mt-4'>You Have Don't Account <span className='text-blue-500'><Link to='/singup'>Sing_Up</Link></span></p>
      </div>
    </div>
  );
};

export default Login;