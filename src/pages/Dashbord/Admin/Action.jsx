import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useDeletePostMutation } from '../../../features/postApi/postApi';
import toast from 'react-hot-toast';
const Action = () => {
  const [deletePost,{isSuccess,isLoading}]=useDeletePostMutation()
  const navigate=useNavigate()
    const ActionData=useLoaderData()
    const useData=ActionData[0]
    console.log(useData)
    const handelDelete=(id)=>{
        deletePost(id)
    }
    useEffect(()=>{
      if (!isLoading&&isSuccess) {
        toast.success('success',{id:'deletePost'})
        navigate('/dashbord/postmanage')
      }
    },[isLoading,isSuccess])
    return (
        <div >
            
         <div>
            {
                useData.userDetils.map(user =>(
                    <div key={user._id} className='flex flex-col items-center'>
                    <div className='mt-5'>
        <div className="avatar flex flex-col items-center">
          <div className=" w-20 rounded-full ">
            <img src={user.image} />
          </div>
        </div>
        </div>
        <div className='flex items-center gap-2'>
          <h2 className='text-xl py-3'>{user.name}</h2>
      
          </div>
        <div className="divider divider-white"></div>
          </div> 
                ))
            }
         </div>

  <div className='flex flex-col items-center'>
  <div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={useData.image} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{useData.caption}</h2>
    <div className="card-actions justify-end">
      <button onClick={()=>handelDelete(useData._id)} className="btn bg-red-500 hover:bg-red-400 text-white">Action <FontAwesomeIcon icon={faTrash}/></button>
    </div>
  </div>
</div>
  </div>
        </div>
    );
};

export default Action;