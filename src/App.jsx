import './App.css'

import { Routes, Route } from 'react-router-dom'
import HomeLayout from './Layouts/HomeLayout'
import HomePage from './Pages/HomePage'


function App() { 

  return (
    <>
      <Routes>
         <Route path="/" element={<HomePage/>}> Home </Route>
      </Routes>
    </>
  )
}

export default App
