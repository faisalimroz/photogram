import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiSlice=createApi({
    reducerPath:'apiSlice',
    tagTypes:['post','comment','like','user'],
    baseQuery:fetchBaseQuery({baseUrl:'https://social-server-blond.vercel.app',}),
    endpoints:(builder)=>({

    })
})

export default apiSlice