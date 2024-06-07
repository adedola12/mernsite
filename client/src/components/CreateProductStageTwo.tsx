import React from 'react'

const CreateProductStageTwo = () => {
  return (
    <div className='flex flex-col w-full gap-y-5 bg-white rounded-md'>
        
        <div className="border-b w-full">
            <h2 className="text-2xl font-bold p-5 py-4">Create Product </h2>
        </div>

            <div className="w-full md:max-w-2xl mx-auto flex flex-col p-5">
                <form className='w-full flex flex-col gap-y-3'>
                    <select name="" id="" className='placeholder:text-gray-400 px-2 py-3 border rounded-md'>
                        <option value="">Choose Unit</option>
                        <option value="">Choose Unit</option>
                    </select>
                    {/* class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"> */}
                    <select name="" id="" className='placeholder:text-gray-400 text-blue-gray-700 transition-all text-blue-gray-700 px-2 py-3 border rounded-md'>
                        <option value="">Product Type</option>
                        <option value="">Choose Unit</option>
                    </select>
                    <select name="" id="" className='placeholder:text-gray-400 px-2 py-3 border rounded-md'>
                        <option value="" className=''>Category</option>
                        <option value="">Choose Unit</option>
                    </select>

                    <input type="text" name="product-name" className='placeholder:text-gray-400 px-4 py-3 border rounded-md' placeholder='Price' />
                   
                        <label htmlFor="product-images" className='cursor-pointer w-full focus-within:border-2 focus-within:border-black text-gray-400 px-2 py-3 border rounded-md flex flex-col justify-center h-[151px]'>
                            <input id='product-images' type="file" name="mobile-number" className='w-full h-full hidden' placeholder='Mobile Number' />
                            <div className="flex flex-col items-center justify-center">
                                <span> <span className='text-black/90'>Click to upload</span> or drag and drop </span>
                                <span>SVG, PNG, JPG, JPEG (max. 800x400px) </span>
                            </div>
                        </label>
                   
                </form>
            </div>

        <div className="border-t flex items-end p-5">
            <div className="flex items-center self-end ml-auto gap-x-4 ">
                <button className='px-12 py-3 ml-auto inline-block text-black/90 bg-gray-300 hover:bg-gray-200 duration-200 rounded-md '>Next</button>
                <button className='px-12 py-3 ml-auto inline-block text-white bg-blue-950 hover:bg-blue-900 duration-200 rounded-md '>Next</button>
            </div>
        </div>

    </div> 
  )
}

export default CreateProductStageTwo