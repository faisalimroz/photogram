import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { useGetPostQuery } from '../../features/postApi/postApi';
import { useGetCommentQuery } from '../../features/commentApi/commentApi';
import { useGetLikesForPostQuery } from '../../features/likeApi/likeApi';
import Content from '../Content/Content';
import Loading from '../../Components/loading/Loading';
import { useSelector } from 'react-redux';

const SeeUser = () => {
  const {user:{email,role}}=useSelector(state =>state.auth)
    const userdata=useLoaderData()
    const {data}=useGetPostQuery(null,{pollingInterval:500})
const {data:comment,isLoading}=useGetCommentQuery(null,{pollingInterval:500})
const {data:like}=useGetLikesForPostQuery(null,{pollingInterval:10})
const [loading,setLoading]=useState(true)

useEffect(()=>{
setTimeout(()=>{
    setLoading(false)
},300)
},[])
if (loading) {
    return(
        <Loading></Loading>
    )
}
    return (
        <div>
             <div className='flex flex-col items-center'>
            <div className='mt-5'>
<div className="avatar flex flex-col items-center">
  <div className=" w-20 rounded-full ">
    <img src={userdata.image} />
  </div>
</div>
</div>
<div className='flex items-center gap-2'>
  <h2 className='text-xl py-3'>{userdata.name}</h2>
  { userdata.role==='admin' && <span className='border rounded-lg p-1'>{userdata.role}</span>} 
  </div>
<div className="divider divider-white"></div>
<div className='grid lg:grid-cols-3 gap-4'>
{
  data?.filter(post =>post?.email ===userdata.email).map(post=><Content like={like} comment={comment} key={post._id} post={post}></Content>)
}
</div>
  </div> 
        </div>
    );
};

export default SeeUser;