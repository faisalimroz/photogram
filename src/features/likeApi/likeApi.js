import apiSlice from "../Api/apiSlice";

const likeApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getLikesForPost: builder.query({
            query: () => ({
                url:'/api/v1/like'
            }),
            providesTags:['like']
          }),
          addLikeToPost: builder.mutation({
            query: (data) => ({
              url: '/api/v1/like',
              method: 'POST',
              body:data
            }),
            invalidatesTags:['like']
          }),
          removeLikeFromPost: builder.mutation({
            query: (id) => ({
              url: `/api/v1/like/${id}`,
              method: 'DELETE',
            }),
          }),
      
    })
})

export const {useAddLikeToPostMutation,useGetLikesForPostQuery,useRemoveLikeFromPostMutation}=likeApi