import React from "react";

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="rounded-lg bg-white border p-3"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="p-3 border rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="rounded-lg bg-white p-3 border"
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="ParkingSpot" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-grey-200 rounded-lg "
                />
                <span>Beds</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-grey-200 rounded "
                />
                <span>Baths</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-grey-200 rounded "
                />
                <div className="flex flex-col items-center">
                  <span>Regular Price</span>
                  <span className="text-sm">(N/Month)</span>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-grey-200 rounded "
                />
                <div className="flex flex-col items-center">
                  <span>Discounted Price</span>
                  <span className="text-sm">(N/Month)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex">
            <p className="font-semibold">Images:</p>
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </div>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p3 text-blue-600 border p-3 border-blue-300 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 bg-blue-500 text-white rounded-lg uppercase hover:opacity-80 disabled:opacity-40">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
