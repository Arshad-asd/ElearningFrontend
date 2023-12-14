import React from 'react'
import {Routes,Route} from 'react-router-dom'
import AdminDashboard from '../admin/AdminDashboard'
import TutorDashboard from '../tutor/TutorDashboard'
import Home from '../user/home/Home'
import Login from '../user/Login'
import Register from '../user/Register'
import AdminLogin from '../admin/AdminLogin'
import TutorRegister from '../tutor/TutorRegister'
import TutorLogin from '../tutor/TutorLogin'
import UserManagement from '../admin/UserManagement'
import Profile from '../user/profile/Profile'
import Plan from '../user/plan/Plan'
import UserLives from '../user/service/Lives'
import Course from '../user/course/Course'
import TutorProfile from '../tutor/profile/Profile'
import TutorManagement from '../admin/TutorManagement'
import PrivateRouteAdmin from '../Utils/PrivateRouteAdmin'
import PrivateRouteTutor from '../Utils/PrivateRouteTutor'
import PrivateRouteUser from '../Utils/PrivateRouteUser'
import Lives from '../tutor/Lives'
import CategoryManagement from '../admin/CategoryManagement'
import SubCategory from '../admin/SubCategory'
import PlanManagement from '../admin/PlanManagement'
import ErrorPage from '../../Components/404Page/404Page'
import FeatureManagement from '../admin/FeatureManagement'
import CourseManagement from '../admin/CourseManagement'
import SuccessPage from '../../Components/Sections/SuccessPage'
import TutorCourseManagement from '../tutor/course/TutorCourseManagement'
import SubscriptionManagement from '../admin/SubscriptionManagement'
import Playlist from '../user/course/PlayList'
import LessonsManagement from '../tutor/course/LessonsManagement'
import Shedules from '../tutor/shedules/Shedules'
import Room from '../user/service/Room'
import TutorRoom from '../tutor/room/TutorRoom'


const Routers = () => {
  return (
    <Routes>

         {/* <------- User Routes -------> */} 

        <Route path='/signup' element={<Register />} />
        <Route path='/login' element={<Login/>} />
        <Route path='' element={<PrivateRouteUser />}>
            <Route path="/" element={<Home />}/>
            <Route path='/profile' element={<Profile />} />
            <Route path='/plans' element={<Plan />} />
            <Route path='/lives' element={<UserLives />} />
            <Route path='/courses' element={<Course />} />
            <Route path='/success' element={<SuccessPage />} />
            <Route  path="/playlist/:courseId" element={<Playlist />} />
            <Route path="/room/:roomId" element={<Room />} />
        </Route>
        {/* <------- Admin Routes -------> */}
  
        <Route path="/admin" element={<AdminLogin/>} />
        <Route path="" element={<PrivateRouteAdmin />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path='/admin/usermanagement' element={<UserManagement />} />
            <Route path='/admin/tutormanagemet' element={<TutorManagement />} />
            <Route path='/admin/category-management' element={<CategoryManagement />} />
            <Route path='/admin/subcategory' element={<SubCategory />} />
            <Route path='/admin/coursemanagement/' element={<CourseManagement />} />
            <Route path='/admin/plan-management/' element={<PlanManagement />} />
            <Route path='/admin/features/' element={<FeatureManagement />} />
            <Route path='/admin/subscription' element={<SubscriptionManagement />} />
        </Route>
        {/* <------- Tutor Routes -------> */}
        <Route path='/tutor/signup' element={<TutorRegister />}/>
        <Route path='/tutor' element={<TutorLogin />} /> 
        <Route path='' element={<PrivateRouteTutor />}>
            <Route path="/tutor/dashboard" element={<TutorDashboard />} />
            <Route path='/tutor/profile' element={<TutorProfile />} />
            <Route path='/tutor/lives' element={<Lives />} />
            <Route path='/tutor/courses' element={<TutorCourseManagement />} />
            <Route path='/tutor/lessons' element={<LessonsManagement />} />
            <Route path='/tutor/shedules' element={<Shedules />} />
            <Route path="/tutor/room/:roomId/:id" element={<TutorRoom />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />

    </Routes>
  )
}

export default Routers
