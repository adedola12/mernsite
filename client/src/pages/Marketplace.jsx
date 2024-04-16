import React from "react";

export default function Marketplace() {
  return (
    <div className="">
      <div className="">
        <div
          className="relative bg-cover bg-center flex justify-center h-[490px] items-center"
          style={{ backgroundImage: `url("background image/Mp1.jpg")` }}
        >
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="z-10">
            <h1 className="font-semibold text-4xl items-center text-white text-center mb-4">
              Explore Marketplace
            </h1>
            <div className="flex justify-center">
              <form className="flex gap-2 bg-white p-4 rounded-lg shadow-md">
                <input
                  type="text"
                  placeholder="Location"
                  className="border-2 border-gray-300 rounded-lg p-2 mr-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="border-2 border-gray-300 rounded-lg p-2 mr-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Categories"
                  className="border-2 border-gray-300 rounded-lg p-2 mr-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="bg-[#212121] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row p-4 gap-4 ml-[80px]">
        <div className="bg-white rounded-lg shadow-md p-2 w-full md:w-60">
          <p className="font-semibold text-xl p-3 border-b">
            {/* Category Name */}
            Concrete /m3
          </p>
          <div className="p-3">
            <div className="flex">
              <input
                type="checkbox"
                name="Cement"
                id="matName"
                className="h-5 w-5 text-gray-600 rounded-lg"
              />
              <label htmlFor="matName" className="ml-2 text-gray-700">
                {/* Categogy Breakdown From API  */}
                Cement
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="Sharpsand"
                id="sharpsand"
                className="h-5 w-5 text-gray-600 rounded-lg"
              />
              <label htmlFor="sharpsand" className=" text-gray-700">
                Sharpsand
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="Granite"
                id="granite"
                className="h-5 w-5 text-gray-600 rounded-lg"
              />
              <label htmlFor="granite" className=" text-gray-700">
                Granite
              </label>
            </div>
          </div>
        </div>
        <div className="bg-white flex-1 rounded-lg">
          <div className="p-3">
            <h2 className="text-2xl font-semibold mb-4">ADLM Marketplace</h2>
            <div>Market Items</div>
          </div>
        </div>
      </div>
    </div>
  );
}
