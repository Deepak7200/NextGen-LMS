import './App.css'

import { Route,Routes } from 'react-router-dom'

import RequireAuth from './Components/Auth/RequireAuth'
import AboutUs from './Pages/AboutUs'
import Contact from './Pages/Contact'
import CourseDescription from './Pages/Course/CourseDescription'
import Courses from './Pages/Course/CourseList'
import CreateCourse from './Pages/Course/CreateCourse'
import Denied from './Pages/Denied'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import NotFound from './Pages/NotFound'
import Signup from './Pages/Signup'


function App() { 

  return (
    <>
      <Routes>
         <Route path="/" element={<HomePage/>}> Home </Route>
         <Route path="/about" element={<AboutUs/>}> About Us </Route>
         <Route path="/courses" element={<Courses/>}> Courses </Route> 
         <Route path="/contact" element={<Contact/>}> Contact </Route> 
         <Route path="/denied" element={<Denied/>}> Denied </Route> 
         <Route path="/course/description" element={<CourseDescription/>}> Course Description </Route> 

         <Route path="/signup" element={<Signup/>}> Sign Up </Route>
         <Route path="/login" element={<Login/>}> Login </Route>

         <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
          <Route path='/course/create' element={<CreateCourse/>}/>
         </Route>

         <Route path="*" element={<NotFound/>}> No Page Found </Route>
      </Routes>
    </>
  )
}

export default App
