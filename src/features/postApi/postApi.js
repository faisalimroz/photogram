import apiSlice from "../Api/apiSlice";


const postAPi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createPost:builder.mutation({
            query:(data)=>({
                 method:"POST",
                 url:'/api/v1/post',
                 body:data
            }),
            invalidatesTags:['post']
        }),
        deletePost:builder.mutation({
            query:(id)=>({
                 method:"DELETE",
                 url:`/api/v1/post/${id}`,
            }),
            invalidatesTags:['post']
        }),
        getPost:builder.query({
            query:()=>({
                url:'/api/v1/post'
            }),
            providesTags:['post']
           }),
        managepost:builder.query({
            query:(data)=>({
                url:`/api/v1/post/search/?searchQuery=${data}`
            }),
            providesTags:['post']
           })
    })
})

export const {useCreatePostMutation,useGetPostQuery,useDeletePostMutation,useManagepostQuery}=postAPi