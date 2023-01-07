import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Form from './components/Form'
import UserDetails from './components/UserDetails'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Form />} /> 
      <Route path="/:userId" element={<UserDetails />} />
    </Routes>
  )
}

export default App

