import React from 'react';
import { useGetPostQuery } from '../../../features/postApi/postApi';
import Loading from '../../../Components/loading/Loading';
import { useCountUserQuery } from '../../../features/AuthSlice/authApi';

const AdminHome = () => {
    const {data:posts,isLoading}=useGetPostQuery(null,{pollingInterval:500})
    const {data:user}=useCountUserQuery(null,{pollingInterval:500})

    if (isLoading) {
        return (
            <Loading></Loading>
        )
    }
    return (
        <div className=' flex flex-col items-center mt-10'>
            <h2 className='text-xl py-2 font-semibold'>Admin Home</h2>
            <div className="stats shadow">
  
  <div className="stat place-items-center">
    <div className="stat-title">Post</div>
    <div className="stat-value">{posts?.length}</div>
  </div>
  
  <div className="stat place-items-center">
    <div className="stat-title">Users</div>
    <div className="stat-value text-secondary">{user}</div>
  </div>
  
</div>
        </div>
    );
};

export default AdminHome;