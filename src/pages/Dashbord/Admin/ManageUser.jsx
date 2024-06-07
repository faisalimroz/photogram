import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetUserQuery } from '../../../features/AuthSlice/authApi';

const ManageUser = () => {
    const [searchUser,setSearchUser]=useState('')
    const {data}=useGetUserQuery(searchUser)
    const users=data?.data
    return (
         <div className='mt-5'>
          <h2 className=' text-3xl text-center py-2 uppercase'>Users <span className='text-blue-500'>manage</span></h2>
                <div className="max-w-3xl mx-auto ">
      <div className="relative shadow-md sm:rounded-lg">
        <div className="p-4">
          <label htmlFor="table-search" className="sr-only">Search</label>
          <form className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"></path>
              </svg>
            </div>
            <input type="text" id="user-search"
              className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
               value={searchUser}
               onChange={(e)=>setSearchUser(e.target.value)}
            
            />
          </form>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
              avatar
              </th>
              <th scope="col" className="p-4">
                userName
              </th>
              <th scope="col" className="px-6 py-3">
             user email
              </th>
           
              <th scope="col" className="px-6 py-3">
               created
              </th>
              <th scope="col" className="px-6 py-3">
              updated
              </th>
              <th scope="col" className="px-6 py-3">
             Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.filter(user=>user.role==='user').map(user => (
              <tr key={user._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4 flex">
                <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={user.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {user.name}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                 {user.createdAt?.slice(0,10)}
                </td>
                <td className="px-6 py-4">
                {user.updatedAt?.slice(0,10)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button  className="font-medium text-red-600 dark:text-red-500 hover:underline">Action</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
         </div>
  ); 
};

export default ManageUser;