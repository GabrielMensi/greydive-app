import React, {useState} from 'react'
import { Route, Routes } from 'react-router-dom'
import Form from './components/Form'
import UserDetails from './components/UserDetails'

function App() {

  const [userId, setUserId] = useState('')

  return (
    <Routes>
      <Route path="/" element={<Form  setUserId={setUserId}/>} /> 
      <Route path="/:userId" element={<UserDetails userId={userId}/>} />
    </Routes>
  )
}

export default App

