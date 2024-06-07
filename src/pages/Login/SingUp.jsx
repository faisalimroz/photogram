import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createAccount } from '../../features/AuthSlice/AuthSlice';
import { useCreateUserMutation } from '../../features/AuthSlice/authApi';
import toast from 'react-hot-toast';


const SingUp = () => {
  const imageHost = import.meta.env.VITE_SOME_PHOTO_URL_API
const navigate=useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user:{email,displayName,role },isLoading,isError } = useSelector(state => state.auth);
  const dispatch=useDispatch()
  const [createUser]=useCreateUserMutation()
  console.log(imageHost)
 
  const onSubmit = data => {
    const ImageApi = `https://api.imgbb.com/1/upload?key=${imageHost}`
    const formData = new FormData();
    formData.append('image', data.image[0])
    fetch(ImageApi,{
      method:"POST",
      body:formData
     })
     .then((res) => {
      if (!res.ok) {
        console.log(`Network response was not ok, status: ${res.status}`);
      }
      return res.json();
    })
    .then(imageResponse =>{
      console.log(imageResponse)
      if(imageResponse.success){
        const ImageUrl=imageResponse.data.display_url
        const {name,password,email}=data
        const user={
          name:name,
          passwword:password,
          email:email,
          image:ImageUrl,
          role:'user'
        }
       console.log(user)
       dispatch(createAccount({email:email,password:password,displayName:name}))
       createUser(user)
  
      }
    })
   

  };

  useEffect(()=>{
  
    if (!isLoading&&email) {
      toast.success('success',{id:'singup'})
      navigate('/')
    }
   
  },[isLoading,email])
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className='text-3xl mb-4'>Sign_up Your <span className='text-blue-500'>Account</span></h2>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl">

          {/* Name Field */}
          <div className='lg:flex items-center gap-4'>
            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-2">Name</label>
              <input
                {...register("name", { required: true })}
                type="text"
                name="name"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-2">Password</label>
              <input
                {...register("password", { required: true })}
                type="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Gender Field */}
          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-2">Gender</label>
            <div className='flex items-center gap-3'>
              <input
                {...register("gender", { required: true })}
                value='male'
                type="radio"
                name="gender"
                className="radio radio-primary"
              /><p>Male</p>
              <input
                {...register("gender", { required: true })}
                value='female'
                type="radio"
                name="gender"
                className="radio radio-primary"
              /><p>Female</p>
              <input
                {...register("gender", { required: true })}
                value='female'
                type="radio"
                name="gender"
                className="radio radio-primary"
              /><p>Othersm</p>
            </div>
          </div>

          {/* Image Field */}
          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-2">Image URL</label>
            <input
              {...register("image", { required: true })}
              type="file"
              accept='.jpg, .JPG, .png, .PNG,.jpeg'
              name="image"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2 lg:col-span-3 xl:col-span-4 mt-4">
           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
           Sign Up
          </button>
          
          </div>

        </form>
        <p className='mt-4'>You Have an Account <span className='text-blue-500'><Link to='/login'>Login</Link></span></p>
      </div>
    </div>
  );
};

export default SingUp;
