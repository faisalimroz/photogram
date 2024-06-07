import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from '../features/AuthSlice/AuthSlice'
import apiSlice from '../features/Api/apiSlice'

export const store = configureStore({
  reducer: {
    auth:AuthSlice,
   [apiSlice.reducerPath]:apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})