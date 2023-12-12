import { apiSlice } from "./apiSlice";
import { baseUrl } from "../../../Containers/Utils/urls";
const USERS_URL ='/api'


export const userApiSlice =apiSlice.injectEndpoints({
  endpoints:(builder)  =>({
    login:builder.mutation({
        query:(data)=>({
            url:`${baseUrl}${USERS_URL}/token/`,
            method:'POST',
            body:data
        })
    }),
    signUp:builder.mutation({
      query:(data)=>({
        url:`${USERS_URL}/user/register/`,
        method:'POST',
        body:data
    })
    }),
    forgotPassword:builder.mutation({
      query:(data)=>({
        url:`${USERS_URL}/forgotPassword`,
        method:'PUT',
        body:data
      })
    }),
    verifyOtp:builder.mutation({
      query:(data)=>({
        url:`${USERS_URL}/verifyOtp`,
        method:'POST',
        body:data
      })
    }),
    resetPassword:builder.mutation({
      query:(data)=>({
        url:`${USERS_URL}/resetPassword`,
        method:'POST',
        body:data
      })
    }),
  })

   
  
})

export  const {useLoginMutation,useSignUpMutation,useForgotPasswordMutation,useVerifyOtpMutation,
  useResetPasswordMutation}=userApiSlice;