import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import Home from '../Page/Home/Home';

function Layout() {
  const location = useLocation();  

  return (
    <div>
    <Navbar/>
    {location.pathname === "/" && <Home/>} 
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default Layout