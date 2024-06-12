import React from "react";

const CreateProductStageOne = ({ nextStep, formData, handleChange }) => {
  const NIGERIAN_STATES = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "Federal Capital Territory || FCT",
  ];

  return (

    <div className='flex flex-col w-full gap-y-5 bg-white rounded-md'>
        
        <div className="border-b w-full">
            <h2 className="text-2xl font-bold p-5">Create Product </h2>
        </div>

      <div className="w-full md:max-w-2xl mx-auto flex flex-col p-5">
          <div className='w-full flex flex-col gap-y-3'>
              <input 
              type="text" 
              value={formData.name} 
              onChange={handleChange} 
              name="name"
              maxLength="62"
              minLength="10"
              required
              placeholder='Product Name' 
              className='placeholder:text-gray-400 px-2 py-3 border rounded-md' 
              />
              <input 
              type="tel" 
              value={formData.mobile} 
              onChange={handleChange}
              placeholder='Mobile Number'
              name="mobile"
              required
              className='placeholder:text-gray-400 px-2 py-3 border rounded-md' 
              />
              <input 
              type="text" 
              onChange={handleChange} 
              name="description"
              required
              value={formData.description}
              placeholder='About Product' 
              className='placeholder:text-gray-400 px-2 py-3 border rounded-md' 
              />
              <input 
              type="text" 
              onChange={handleChange} 
              placeholder='Seller Address'
              name="storeAddress"
              required
              value={formData.storeAddress}
              className='placeholder:text-gray-400 px-2 py-3 border rounded-md' 
              />
              <select
              name="location"
              value={formData.location}
              className="rounded-lg p-3 border  flex-1"
              onChange={handleChange}
              >
              <option className="text-gray-400">-select a State-</option>
              {NIGERIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                  {state}
                  </option>
              ))}
              </select>
              
          </div>
      </div>

      <div className="border-t flex items-end p-5">
        <button
          onClick={nextStep}
          className="px-12 py-3 ml-auto inline-block text-white bg-blue-950 hover:bg-blue-900 duration-200 rounded-md "
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default CreateProductStageOne;
