import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/userSlice/authSlice'
import  {apiSlice}  from './slices/userSlice/apiSlice'
import adminAuthReducer from './slices/adminSlice/adminAuthSlice'
import tutorAuthReducer from './slices/tutorSlice/tutorAuthSlice'

const store =configureStore({
    reducer:{
        auth:authReducer,
        adminAuth:adminAuthReducer,
        tutorAuth:tutorAuthReducer,
    [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})


export default store