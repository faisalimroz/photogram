import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useUpdateProfileMutation } from '../../features/AuthSlice/authApi';
const imageHost = import.meta.env.VITE_SOME_PHOTO_URL_API;
const UpdateUserProfile = () => {
    const { user: { name, email, image,_id } } = useSelector(state => state.auth)
    const [images, setImage] = useState(`${image}`);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate()
    const userData = useLoaderData()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [updateProfile,{isLoading,isSuccess,isError}]=useUpdateProfileMutation()
    const onSubmit =(data) => {
        const ImageApi = `https://api.imgbb.com/1/upload?key=${imageHost}`
        const formData = new FormData();
        formData.append('image', data.image[0])
        fetch(ImageApi, {
            method: "POST",
            body: formData
        }).then((res) => {
            if (!res.ok) {
                console.log(`Network response was not ok, status: ${res.status}`);
            }
            return res.json();
        }).then(imageResponse => {
            console.log(imageResponse)
            if (imageResponse.success) {
                const imageUrl = imageResponse.data.display_url;
                const newUpdate = {
                    name: name,
                    email: email,
                    image: imageUrl,
                };
        
                 updateProfile({ id: userData._id, ...newUpdate }); 
                console.log(newUpdate, userData._id);
                refetch()
                setLoading(true)
            }
        }).catch(error => console.log(error))
    }
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(URL.createObjectURL(selectedImage));
    };
    console.log(userData)

    useEffect(()=>{
        if (!isLoading&& isSuccess) {
            navigate('/profile')
            toast.success('success',{id:'updateProfile'})
        }
    },[isLoading,isSuccess])
    return (
    <div>
        { email===userData.email&&<>  <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center mt-4'>
        <div className="avatar">
            <div className="w-24 rounded-full ">
                <img src={images} />
            </div>
        </div>
        <div className='py-2'>
            <input   {...register("image", { required: false })} accept='.jpg, .JPG, .png, .PNG,.jpeg' onChange={handleImageChange} type="file" className="file-input w-full max-w-xs" />
        </div>
       {
        loading? <span  className='btn'>Loading</span>: <button type='submit' className='btn'>update <FontAwesomeIcon icon={faUpload} /></button>
       }
    </form></>}
    </div>
    );
};

export default UpdateUserProfile;