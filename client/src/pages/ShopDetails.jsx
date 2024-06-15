
import React from 'react'
import { Link } from 'react-router-dom'

const ShopDetails = () => {
  return (
    <>        
        <div className="border-b w-full p-5 py-4">
            <h2 className="font-semibold ">Shop Details</h2>
        </div>
      <div className="flex mt-5 gap-3 items-center px-5 ">
        <Link
          to={"/create-product"}
          className="bg-[#00263D] text-white text-center text-bold rounded-lg max-w-auto uppercase p-2 px-5 hover:opacity-80"
        >
          CREATE PRODUCT
        </Link>

        <Link
          to={"/create-listing"}
          className="bg-[#00263D] text-white text-center text-bold rounded-lg max-w-auto uppercase p-2 px-5 hover:opacity-80"
        >
          CREATE LISTING
        </Link>
      </div>
    </>
  )
}

export default ShopDetails