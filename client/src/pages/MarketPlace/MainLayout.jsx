import React from 'react'
import { Outlet } from 'react-router-dom'
import Header2 from '../../components/Header2'
import Footer from '../../components/Footer'

const MainLayout = () => {
  return (
    <div className='min-h-screen'>
        <Header2  />
        <main className='mt-12 lg:mt-20'>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default MainLayout