
import React from 'react'

const CreateProductStageOne = () => {
  return (
    <div className='flex flex-col w-full gap-y-5 bg-white rounded-md'>
        
        <div className="border-b w-full">
            <h2 className="text-2xl font-bold p-5">Create Product </h2>
        </div>

            <div className="w-full md:max-w-2xl mx-auto flex flex-col p-5">
                <form className='w-full flex flex-col gap-y-3'>
                    <input type="text" name="product-name" className='placeholder:text-gray-400 px-2 py-3 border rounded-md' placeholder='Product Name' />
                    <input type="text" name="mobile-number" className='placeholder:text-gray-400 px-2 py-3 border rounded-md' placeholder='Mobile Number' />
                    <input type="text" name="about-product" className='placeholder:text-gray-400 px-2 py-3 border rounded-md' placeholder='About Product' />
                    <input type="text" name="seller-address" className='placeholder:text-gray-400 px-2 py-3 border rounded-md' placeholder='Seller Address' />
                    <input type="text" name="state" className='placeholder:text-gray-400 px-2 py-3 border rounded-md' placeholder='State' />
                </form>
            </div>

        <div className="border-t flex items-end p-5">
            <button className='px-12 py-3 ml-auto inline-block text-white bg-blue-950 hover:bg-blue-900 duration-200 rounded-md '>Next</button>
        </div>

    </div>  
  )
}

export default CreateProductStageOne