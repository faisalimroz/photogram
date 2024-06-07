import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { useGetLikesForPostQuery } from '../../features/likeApi/likeApi';
import Loading from '../../Components/loading/Loading';
import Like from '../../Components/like/Like';

const SeeLikes = () => {
    const SeePost=useLoaderData()
    const {data:likes,isLoading,isError}=useGetLikesForPostQuery()
    console.log(SeePost)
    if (isLoading) {
       return(
        <Loading></Loading>
       ) 
    }

    
    return (
        <div>
            {
                SeePost.map(post=><>
                     <div className='mt-40 shadow-lg p-3 mx-auto w-[50%] overflow-y-scroll'>

                       {
                        likes?.filter(like=>like.postId===post._id).map(like=><Like like={like}></Like>)
                       }

                     </div>
                </>)
            }
        </div>
    );
};

export default SeeLikes;