import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAddLikeToPostMutation, useRemoveLikeFromPostMutation } from '../../features/likeApi/likeApi';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useDeletePostMutation } from '../../features/postApi/postApi';

const Card = ({ post, comment, like }) => {
  const { user: { email,role } } = useSelector(state => state.auth)
  const [addLike, { isSuccess }] = useAddLikeToPostMutation()
  const [removeLike] = useRemoveLikeFromPostMutation()
  const [deletePost] = useDeletePostMutation()
  const filteredComments = comment?.filter(comment => comment.postId === post._id);
  const filteredLike = like?.filter(likeItem => likeItem.postId === post._id && likeItem.email === email);
  const likeCount = like?.filter(likeItem => likeItem.postId === post._id);
  const [isLoading, setIsLoading] = useState(false)
  const likeHandeler = async (id) => {
    try {
      setIsLoading(true)
      addLike({ postId: id, email: email })
    } catch (error) {
      console.error('Error liking post:', error);
    }

  }

  const handelRemove = (id) => {
    console.log(id)
    removeLike(id)
    setIsLoading(false)
  }
  return (
    <section>

      <div className="bg-gray-100 lg:px-28 py-3">
        <div className="bg-white border rounded-sm max-w-md">
          <div className="flex items-center lg:justify-between px-4 py-3 lg:gap-3 gap-36">
            {
              post.userDetils.map(user =>
                <div key={user._id} className='flex  items-center'>
                  <div className='flex flex-col  items-center'>
                  <img className="h-8 w-8 rounded-full" src={user?.image} />
                  </div>
                  <div className="ml-3 ">
                    <span className="text-sm font-semibold antialiased block leading-tight">{
                      email === user.email ? <Link to={`/profile`}>  <p className="text-sm font-medium text-gray-900 truncate ">
                        {user.name} 
                      </p></Link> : <><Link to={`/profile/${user._id}`}>  <p className="text-sm font-medium text-gray-900 truncate ">
                        {user.name} 
                      </p></Link></>
                    }</span>
                

                  <div>
              <p className='text-sm'>{post.createdAt?.slice(0, 10)}</p>

            </div>
                  </div>
                </div>
              )
            }
            
            <>   <details className="dropdown">
                    <summary className="btn bg-white hover:bg-white"><FontAwesomeIcon icon={faBars}/></summary>
                    <ul className="p-2 border menu dropdown-content z-[1] bg-base-100 rounded-box w-[120px]">
                    {email === post.email &&   <li onClick={()=>{deletePost(post._id)}}><a>Delete Post</a></li>}
                     {
                       email !==post.email &&    <li><a>Report Post</a></li>
                     }
                    </ul>
                  </details></>
          </div>
          <img src={post.image} />
          <div>
            <p className='p-2  font-semibold'>{post.caption}</p>
          </div>
          <div className="flex items-center justify-between mx-4 mt-3 mb-2">
            <div className="flex gap-5">
              <div>
                {
                  filteredLike && filteredLike.length > 0 ? (
                    // If the post has been liked
                    <button onClick={() => handelRemove(filteredLike[0]._id)}>
                      <svg aria-label="Unlike" className="x1lliihq x1n2onr6 xxk16z8 text-red-500" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24">
                        <title>Unlike</title>
                        <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                      </svg>
                    </button>
                  ) : (

                    <>

                      {
                        isLoading ? <><button>
                          <svg fill="#262626" className='text-red-500' height="24" viewBox="0 0 48 48" width="24">
                            <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                          </svg>
                        </button></> : <button onClick={() => likeHandeler(post._id)} disabled={isLoading}>
                          <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                            <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                          </svg>
                        </button>
                      }

                    </>
                  )
                }

              </div>
              <Link to={`/seepost/${post._id}`}><svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg></Link>
            </div>
            <div className="flex">
              <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
            </div>
          </div>
          <div>
            <Link to={`/likes/${post._id}`}> <div className="font-semibold text-sm mx-4 mt-2 mb-2">
              {likeCount?.length} Likes
            </div></Link>
          </div>
          <Link to={`/seepost/${post._id}`}><div className="font-semibold text-sm mx-4 mt-2 mb-4">{filteredComments?.length} Comments</div></Link>
        </div>
      </div>


    </section>
  );
};

export default Card;