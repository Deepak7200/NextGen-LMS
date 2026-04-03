import './App.css'

import { Route,Routes } from 'react-router-dom'

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
