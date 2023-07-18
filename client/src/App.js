import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import Register from './Auth/Register/Register'
import Login from './Auth/Login/Login'
import Win from './Page/Win/Win'
import About from './Page/About/About'
import Faq from './Page/Faq/Faq'
import Contact from './Page/Contact/Contact'
import Categories from './Page/Categories/Categories'


function App() {
  return (
    <div>
     <Routes >
     <Route path='/' element={<Layout/>}>
     <Route path='/categories' element={<Categories/>}/>
     <Route path='/win' element={<Win/>}/>
     <Route path='/about' element={<About/>}/>
     <Route path='/faq' element={<Faq/>}/>
     <Route path='/contact' element={<Contact/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/register' element={<Register/>}/>
     </Route>
     </Routes>
    </div>
  )
}

export default App
