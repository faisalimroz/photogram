import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faPen ,faUpLong } from '@fortawesome/free-solid-svg-icons'
  import { useGetPostQuery } from '../../features/postApi/postApi';
import Loading from '../../Components/loading/Loading';
import Card from '../../Components/Card/Card';
import Content from '../Content/Content';
import { Link } from 'react-router-dom';
import { useGetCommentQuery } from '../../features/commentApi/commentApi';
import { useGetLikesForPostQuery } from '../../features/likeApi/likeApi';
const Profile = () => {
  
    const {user:{email,image,name,_id,role}}=useSelector(state => state.auth)
    const {data}=useGetPostQuery(null,{pollingInterval:500})
    const [loading, setLoading] = useState(true);
    const {data:comment,isLoading}=useGetCommentQuery(null,{pollingInterval:500})
    const {data:like}=useGetLikesForPostQuery(null,{pollingInterval:10})
     useEffect(() => {
       setTimeout(() => {
         setLoading(false);
       }, 300);  // is your prefer
     }, []);
 
     if (loading) {
         return (
             <Loading></Loading>
         )
     }
 
    return (
        <div className='flex flex-col items-center'>
            <div className='mt-5'>
<div className="avatar flex flex-col items-center">
  <div className=" w-20 rounded-full ">
    <img src={image} />
  </div>
</div>
  <div className='flex items-center gap-2'>
  <div className='flex items-center gap-2'>
  <h2 className='text-xl'>{name} </h2>
  {role ==='admin' && <span className='border rounded-lg p-1'>{role}</span>}
  </div><Link to={`/updateprofile/${_id}`}><button className='bg-blue-500 text-white py-1 px-2 rounded-lg'><FontAwesomeIcon icon={faPen}/></button></Link>
  </div>
 <div className='mt-2'>
 <Link to='/createpost'><button className='btn bg-blue-500 hover:bg-blue-500 text-white'>Create Post <FontAwesomeIcon icon={faUpLong}/></button></Link>
 </div>
</div>
<div className="divider divider-white"></div>

<div className='grid lg:grid-cols-3 gap-4'>
{
  data?.filter(post =>post?.email ===email).map(post=><Content like={like} comment={comment} key={post._id} post={post}></Content>)
}
</div>
  </div>
    );
};

export default Profile;