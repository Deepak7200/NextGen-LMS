import './App.css'

import { Route,Routes } from 'react-router-dom'

import AboutUs from './Pages/AboutUs'
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
         <Route path="/signup" element={<Signup/>}> Sign Up </Route>
         <Route path="/login" element={<Login/>}> Login </Route>
         <Route path="*" element={<NotFound/>}> No Page Found </Route>
      </Routes>
    </>
  )
}

export default App
