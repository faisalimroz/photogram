import apiSlice from '../Api/apiSlice';

const authApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       createUser:builder.mutation({
        query:(data)=>({
            method:"POST",
            url:'/api/v1/user',
            body:data
        }),
        invalidatesTags:['user']
       }),
       getUser:builder.query({
         query:(data)=>({
            url:`/api/v1/users/?searchQuery=${data}`
         }),
         providesTags:['user']
       }),
       countUser:builder.query({
         query:()=>({
            url:'/api/v1/users/stack'
         }),
         providesTags:['user']
       }),
       updateProfile:builder.mutation({
        query:(data)=>({
            method:"PATCH",
            url:`/api/v1/users/${data.id}`,
            body:data
        }),
        invalidatesTags:['user']
       })
      
    })
})

export const {useCreateUserMutation,useUpdateProfileMutation,useGetUserQuery,useCountUserQuery}=authApi