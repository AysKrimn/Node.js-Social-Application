import './App.css'

import { Routes, Route } from 'react-router-dom'

// layout
import MainLayout from './Layouts/MainLayout'

// pages
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import ProfilePage from './Pages/ProfilePage'

function App() {


  return (
    <>
        
        {/* Routing */}
        <Routes>

              {/* ANAAKIŞ LAYOUTU */}
              <Route element={<MainLayout></MainLayout>}>

                    <Route path='/' element={<HomePage></HomePage>}></Route>
                    <Route path="/profile/:username" element={<ProfilePage></ProfilePage>}></Route>
                    
              </Route>


              <Route path='/login' element={<LoginPage></LoginPage>}></Route>
              <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
        </Routes>

    </>
  )
}

export default App
