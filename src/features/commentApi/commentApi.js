import apiSlice from "../Api/apiSlice";

const commentApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
      createComment:builder.mutation({
        query:(data)=>({
           method:"POST",
           url:'/api/v1/comment',
           body:data,
        }),
        invalidatesTags:['comment']
      }),
      getComment:builder.query({
        query:()=>({
          url:'/api/v1/comment'
        }),
        providesTags:['comment']
      })
    })
})

export const {useCreateCommentMutation,useGetCommentQuery}=commentApi