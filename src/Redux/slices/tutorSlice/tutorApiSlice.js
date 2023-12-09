import { apiSlice } from "./apiSlice";
const TUTOR_URL ='/api'

export const tutorApiSlice =apiSlice.injectEndpoints({
  endpoints:(builder)  =>({
    tutorLogin:builder.mutation({
        query:(data)=>({
            url:`${TUTOR_URL}/token/`,
            method:'POST',
            body:data
        })
    }),
    tutorRegister:builder.mutation({
      query:(data)=>({
        url:`${TUTOR_URL}/register`,
        method:'POST',
        body:data

      })
    }),
    tutorLogout:builder.mutation({
      query:(data)=>({
        url:`${TUTOR_URL}/logout`,
        method:'POST',
        body:data
      })
    }),
    tutorForgotPassword:builder.mutation({
      query:(data)=>({
        url:`${TUTOR_URL}/forgotPassword`,
        method:'PUT',
        body:data
      })
    }),
    tutorVerifyOtp:builder.mutation({
      query:(data)=>({
        url:`${TUTOR_URL}/verifyOtp`,
        method:'POST',
        body:data
      })
    }),
    tutorResetPassword:builder.mutation({
      query:(data)=>({
        url:`${TUTOR_URL}/resetPassword`,
        method:'POST',
        body:data
      })
    })
  })
})

export  const {useTutorLoginMutation,useTutorRegisterMutation,useTutorLogoutMutation,
useTutorResetPasswordMutation,useTutorVerifyOtpMutation,useTutorForgotPasswordMutation}=tutorApiSlice;