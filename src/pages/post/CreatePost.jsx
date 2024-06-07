import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useCreatePostMutation } from '../../features/postApi/postApi';
import { useNavigate } from 'react-router-dom';
const imageHost = import.meta.env.VITE_SOME_PHOTO_URL_API
const CreatePost = () => {
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate=useNavigate()
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(URL.createObjectURL(selectedImage));
    };
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {user:{email}}=useSelector(state=>state.auth)
    const [createPost,{isLoading,isError,isSuccess}]=useCreatePostMutation()
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
            const {description}=data
            const newPost={
                email:email,
                caption:description,
                image:ImageUrl
            }
           console.log(newPost)
          createPost(newPost)
          setLoading(true)
          }
        })
    };

    useEffect(()=>{
        if (!isLoading&&isSuccess) {
            navigate('/')
            toast.success('Success',{id:'createPost'})
        }
    },[isLoading,isSuccess])

    return (
        <div>
            <div className="heading text-center font-bold text-2xl m-5 text-gray-800">New Post</div>
            <form onSubmit={handleSubmit(onSubmit)} className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">

                <textarea
                    className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
                    spellCheck="false"
                    placeholder="Describe everything about this post here"
                    {...register("description", { required: true })}
                ></textarea>

                <div className="icons flex text-gray-500 m-2">
                    
                    <input
                        accept='.jpg, .JPG, .png, .PNG,.jpeg'
                        {...register("image", { required: true })}
                        name="image"
                        onChange={handleImageChange}
                        className="file-input file-input-bordered w-full max-w-xs"
                        id="fileInput"
                        type="file"
                    />

                    <div className="m-6 block py-30">
                        {image && (
                            <img
                                src={image}
                                alt="Selected Image"
                                className="w-[50%] rounded"
                            />
                        )}
                    </div>
                </div>

                {/* Display errors if any */}
                {errors.description && <p className="text-red-500">Description is required</p>}
                {errors.image && <p className="text-red-500">Image is required</p>}

                <div className="buttons flex">
                   {
                    loading? <span  className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Loading</span>: <button type='submit' className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</button>
                   } 
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
