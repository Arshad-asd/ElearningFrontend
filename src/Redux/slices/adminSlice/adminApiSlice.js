import { apiSlice } from "./apiSlice";
const ADMIN_URL ='/api/admin'
const baseURL = "http://127.0.0.1:8000";
export const adminApiSlice =apiSlice.injectEndpoints({
  endpoints:(builder)  =>({
    adminLogin:builder.mutation({
        query:(data)=>({
            url:`${ADMIN_URL}/login`,
            method:'POST',
            body:data
        })
    }),
    adminLogout:builder.mutation({
      query:(data)=>({
          url:`${baseURL}/api/logout`,
          method:'POST',
          body:data
      })
  })

  })  
})

export  const {useAdminLoginMutation,useAdminLogoutMutation}=adminApiSlice;