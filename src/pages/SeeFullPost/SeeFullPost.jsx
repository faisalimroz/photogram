import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../../Components/loading/Loading';
import Comment from '../../Components/comment/Comment';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { useCreateCommentMutation, useGetCommentQuery } from '../../features/commentApi/commentApi';
const SeeFullPost = () => {
 

    const seePost=useLoaderData()
    const postId=seePost[0]?._id
  
    console.log(postId)
  console.log(seePost)
  const {user:{email}}=useSelector(state=>state.auth)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const[createComment,{isSuccess}]=useCreateCommentMutation()
  const {data:comment,isLoading}=useGetCommentQuery(null,{pollingInterval:500})
  const onSubmit = data => {
    const {comment}=data
   const newComment={
    comment:comment,
    email:email,
    postId:postId
   }
   createComment(newComment)
   console.log(newComment)
   
  };
  const [loading, setLoading] = useState(true);

   useEffect(() => {
     setTimeout(() => {
       setLoading(false);
     }, 300);  // is your prefer
   }, [])
  if (loading) {
    return(
     <Loading></Loading>
    )
  }


    return (
        <div>
           {
              seePost.map(post=>(<section key={post._id} class="bg-white dark:bg-gray-900">
              <div className="container px-6 py-10 mx-auto">
                  <div className="mt-8 lg:-mx-6 lg:flex  lg:items-start">
                      <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-[500px] lg:h-[500px]" src={post.image}alt=""/>
          
                      <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                        {
                                  post.userDetils.map(user=>
                                    <div key={user._id} className='flex items-center'>
                                          <img className="h-8 w-8 rounded-full" src={user?.image}/>
                                    <div className="ml-3 ">
                                      <span className="text-sm font-semibold antialiased block leading-tight">{user.name}</span>
                                      
                                    </div>
                                    </div>
                                      )
                        }
                         
                     
                          <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                             {post.caption}
                          </p>
          
                          <div className="divider divider-white"></div> 
          
                          <div className="flex flex-col items-center mt-6">
                              <div className='h-60 overflow-y-scroll p-4  '>
                              {
                                comment?.filter(comment=>comment.postId===postId).map(comment => <Comment key={comment._id} comment={comment}></Comment>)
                               }
                              </div>
                          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label for="comment" className="sr-only">Your comment</label>
            <textarea    {...register("comment", { required: true })} id="comment" rows="6" cols='50'
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." required></textarea>  
        </div>
  
       
        <button type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-800 dark:focus:ring-blue-800 hover:bg-blue-800">
            Post comment
        </button>
    </form>
                          </div>
                      </div>
                  </div>
              </div>
          </section>))
           }
        </div>
    );
};

export default SeeFullPost;