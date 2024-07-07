
import React from 'react'
import { ImSpinner9 } from "react-icons/im";


const PageLoader = () => {

  return (
    <div  className="fixed px-2 z-50 inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-md overflow-y-auto min-h-screen h-full w-full" >
    <div className="w-full h-screen flex items-center justify-center">
        <ImSpinner9 className='text-white animate-spin' size={50} />
    </div>
  </div>
  )
}

export default PageLoader