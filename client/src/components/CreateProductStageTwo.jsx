import React, { useState } from "react";
import { CATEGORY_DATA } from "../constants/data";

const CreateProductStageTwo = ({
  previousStep,
  formData,
  setFiles,
  isLoading,
  uploading,
  handleImageSubmit,
  handleChange,
  error,
  handleSubmit,
  handleCategoryChange,
  onhandleSubCategoryChange
}) => {
  const units = ["nr", "bags", "tonnes", "m", "m2", "m3"];
  const types = ["Material", "Labour"];
  
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');


  const onHandleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    handleCategoryChange(event.target.value)
    setSelectedSubCategory('');
  };


  const handleSubCategoryChange = (event) => {
    setSelectedSubCategory(event.target.value);
    onhandleSubCategoryChange(event.target.value);
  };

  const subCategories = selectedCategory ? CATEGORY_DATA[selectedCategory].subCategories : [];

  return (
    <div className="flex flex-col w-full gap-y-5 bg-white rounded-md">
      <div className="border-b w-full ">
            <h1 className="font-bold text-xl p-5 py-4 ">Create Product</h1>
        </div>

      <div className="w-full md:max-w-2xl mx-auto flex flex-col p-5">
        <div className="w-full flex flex-col gap-y-3">
          <select
            name="unit"
            value={formData.unit}
            className="p-3 rounded-lg flex-1 border"
            onChange={handleChange}
          >
            <option>--select a unit--</option>
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>

          <select
            name="type"
            value={formData.type}
            className="p-3 rounded-lg border  flex-1"
            onChange={handleChange}
          >
            <option>--select a type--</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            name="categories"
            id="category-select"
            value={selectedCategory}
            className="p-3 rounded-lg  flex-1 border"
            onChange={onHandleCategoryChange}
          >
            <option value="">--select a category--</option>
            {Object.keys(CATEGORY_DATA).map((category) => (
              <option key={category} value={category}>
                 {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>


          {
            selectedCategory && (
              <select 
              value={selectedSubCategory} 
              onChange={handleSubCategoryChange}
              className="p-3 rounded-lg  flex-1 border"
              >
                <option value="">--select a sub-category--</option>
                {subCategories?.length && subCategories.map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
            )
          }

          <input
            type="number"
            name="regularPrice"
            min="10"
            max="100000000"
            required
            value={formData.regularPrice}
            placeholder="Price"
            onChange={handleChange}
            className="placeholder:text-gray-400 px-4 py-3 border rounded-md"
          />

          <div className="flex flex-col gap-4 w-full">
            <label
              htmlFor="product-images"
              className="cursor-pointer w-full focus-within:border-2 focus-within:border-black text-gray-400 px-2 py-3 border rounded-md flex flex-col justify-center h-[151px]"
            >
              <input
                id="product-images"
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="w-full h-full hidden"
              />
              <div className="flex flex-col items-center justify-center">
                <span>
                  {" "}
                  <span className="text-black/90">Click to upload</span> or drag
                  and drop{" "}
                </span>
                <span>SVG, PNG, JPG, JPEG (max. 800x400px) </span>
              </div>
            </label>

            <button
              type="button"
              disabled={uploading}
              className="p-3 text-blue-600 border rounded uppercase font-semibold border-blue-300 hover:shadow-md disabled:opacity-80"
              onClick={handleImageSubmit}
            >
              {uploading ? "Uploading" : "Upload"}
            </button>
            {formData?.imageUrls?.length > 0 && (
              <>
                {formData.imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-3 border items-center overflow-hidden"
                  >
                    <img
                      src={url}
                      alt="Item Image"
                      className="w-20 h-20 object-cover rounded-md"
                    />

                    <button>DELETE IMAGE</button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="border-t flex flex-col items-end p-5">
        <div className="flex items-center self-center md:self-end md:ml-auto gap-x-4 ">
          <button
            onClick={previousStep}
            className="px-12 py-3 ml-auto inline-block text-black/90 bg-gray-300 hover:bg-gray-200 duration-200 rounded-md "
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            type="button"
            className="px-12 py-3 ml-auto inline-block text-white bg-blue-950 hover:bg-blue-900 duration-200 rounded-md "
          >
            {isLoading ? "Creating..." : "Create Product"}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default CreateProductStageTwo;
