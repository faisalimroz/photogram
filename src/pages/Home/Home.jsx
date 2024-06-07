import React, { useEffect } from 'react';
import Card from '../../Components/Card/Card';
import { useGetPostQuery } from '../../features/postApi/postApi';
import Loading from '../../Components/loading/Loading';
import { useGetCommentQuery } from '../../features/commentApi/commentApi';
import { useGetLikesForPostQuery } from '../../features/likeApi/likeApi';

const Home = () => {
    const{data,isSuccess,isLoading,isError}=useGetPostQuery(null,{pollingInterval:500})
    const {data:comment}=useGetCommentQuery(null,{pollingInterval:500})
    const {data:like}=useGetLikesForPostQuery(null,{pollingInterval:10})
 
   if (isLoading) {
    return (
        <Loading></Loading>
    )
   }
    return (
        <div>
          {
            data.map(post=>  <Card key={post._id} post={post} like={like} comment={comment}></Card>)
          }
        </div>
    );
};

export default Home;