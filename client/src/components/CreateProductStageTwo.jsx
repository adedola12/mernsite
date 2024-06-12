import React from "react";

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
}) => {
  const units = ["nr", "bags", "tonnes", "m", "m2", "m3"];
  const types = ["Material", "Labour"];
  const predefinedSubCategories = {
    Concrete: ["Cement", "Sharp Sand", "Granite"],
    Formwork: ["Hardwood", "Nails"],
    Reinforcement: ["Reinforcement Bar", "Binding Wire"],
    Blockwork: ["Sandcrtete Block", "Brickwall"],
    Finishes: ["Floor", "Wall", "Ceiling"],
    Openings: ["Windows", "Door", "Others"],
    Roofing: ["Roof Covering", "Roof Members", "Roof Accessories"],
    Others: [],
  };

  return (
    <div className="flex flex-col w-full gap-y-5 bg-white rounded-md">
      <div className="border-b w-full">
        <h2 className="text-2xl font-bold p-5 py-4">Create Product </h2>
      </div>

      <div className="w-full md:max-w-2xl mx-auto flex flex-col p-5">
        <div className="w-full flex flex-col gap-y-3">
          <select
            name="unit"
            value={formData.unit}
            className="p-3 rounded-lg flex-1 border"
            onChange={handleChange}
          >
            <option>--Please choose a unit option--</option>
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
            <option>--Please choose an option--</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            name="categories"
            id="category-select"
            value={formData.categories}
            className="p-3 rounded-lg  flex-1 border"
            onChange={handleCategoryChange}
          >
            <option value="">--Please choose an option--</option>
            {Object.keys(predefinedSubCategories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

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
            {formData.imageUrls.length > 0 && (
              <>
                {formData.imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-3 border items-center"
                  >
                    <img
                      src={url}
                      alt="Item Image"
                      className="w-20 h-20 object-contain rounded-lg"
                    />

                    <button>DELETE IMAGE</button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="border-t flex items-end p-5">
        <div className="flex items-center self-end ml-auto gap-x-4 ">
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
        {error && <p className="text-red-900 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default CreateProductStageTwo;
