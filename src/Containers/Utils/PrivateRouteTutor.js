import React from 'react'
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

function PrivateRouteTutor() {
    const {tutorInfo}=useSelector((state)=>state.tutorAuth)
    
    return tutorInfo? <Outlet/> : <Navigate to='/tutor' replace/>
}

export default PrivateRouteTutor