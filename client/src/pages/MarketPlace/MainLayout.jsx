import React from 'react'
import { Outlet } from 'react-router-dom'
import Header2 from '../../components/Header2'
import Footer from '../../components/Footer'

const MainLayout = () => {
  return (
    <div className='h-full flex flex-col bg-[#ece8e8]'>
        <Header2  />
        <main className='mt-12 lg:mt-20 h-full'>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default MainLayout